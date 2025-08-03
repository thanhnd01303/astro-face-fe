import React, { useState } from "react";

interface FacialFeature {
  id: string;
  name: string;
  title: string;
  startingAngle: number; // Starting position on the ellipse (0-360 degrees)
  analysis: {
    description: string;
    interpretation: string;
  };
}

interface CosmicSelfProps {
  userPhotoUrl?: string;
}

export function CosmicSelf({ userPhotoUrl }: CosmicSelfProps) {
  const [activeFeature, setActiveFeature] =
    useState("forehead");
  const [isAnimating, setIsAnimating] = useState(false);

  // Use provided photo URL or fallback to default
  const photoUrl =
    userPhotoUrl ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face";

  // Calculate optimal spacing to prevent overlap
  // With ellipse semi-major axis of 120px and button diameter of 48px,
  // we need at least ~30 degrees separation to avoid overlap
  const facialFeatures: FacialFeature[] = [
    {
      id: "forehead",
      name: "Forehead",
      title: "The Forehead (Palace of Career)",
      startingAngle: 0, // Top position
      analysis: {
        description:
          "Your forehead reveals the strength of your intellectual capacity and career potential. A well-proportioned forehead indicates strong analytical thinking and leadership abilities.",
        interpretation:
          "The smooth, broad expanse suggests excellent planning skills and the ability to see the bigger picture. This feature indicates someone who excels in strategic thinking and has natural executive abilities.",
      },
    },
    {
      id: "eyebrows",
      name: "Eyebrows",
      title: "The Eyebrows (Gate of Determination)",
      startingAngle: 72, // 72 degrees separation (360/5 = 72)
      analysis: {
        description:
          "Your eyebrows frame your determination and willpower. Well-shaped brows indicate strong character and the ability to overcome obstacles.",
        interpretation:
          "The arch and thickness reveal your approach to challenges. These brows suggest someone with balanced emotions and the persistence needed to achieve long-term goals.",
      },
    },
    {
      id: "eyes",
      name: "Eyes",
      title: "The Eyes (Windows to the Soul)",
      startingAngle: 144, // 144 degrees
      analysis: {
        description:
          "Your eyes are the most revealing feature, showing your emotional depth, intuition, and ability to connect with others on a profound level.",
        interpretation:
          "The shape and brightness indicate strong empathy and excellent communication skills. These eyes suggest someone who can read people well and form meaningful relationships.",
      },
    },
    {
      id: "nose",
      name: "Nose",
      title: "The Nose (Mountain of Wealth)",
      startingAngle: 216, // 216 degrees
      analysis: {
        description:
          "Your nose represents your relationship with material success and personal power. The bridge and tip reveal your approach to wealth and status.",
        interpretation:
          "The proportions suggest a balanced approach to material matters - neither too focused on wealth nor dismissive of practical concerns. This indicates wisdom in financial decisions.",
      },
    },
    {
      id: "mouth",
      name: "Mouth",
      title: "The Mouth (River of Expression)",
      startingAngle: 288, // 288 degrees
      analysis: {
        description:
          "Your mouth reveals your communication style, emotional expression, and capacity for nurturing relationships with others.",
        interpretation:
          "The shape and fullness indicate someone who speaks with consideration and has the ability to inspire others. This feature suggests natural charisma and persuasive abilities.",
      },
    },
  ];

  const currentFeature =
    facialFeatures.find((f) => f.id === activeFeature) ||
    facialFeatures[0];

  const handleFeatureClick = (featureId: string) => {
    if (featureId === activeFeature || isAnimating) return;

    setIsAnimating(true);
    setActiveFeature(featureId);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // --- BẮT ĐẦU PHẦN SỬA ĐỔI ---
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* 3D Space Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#9370DB]/15 to-transparent rounded-full cosmic-system"></div>

      {/* Orbital System Wrapper - Chứa cả avatar và quỹ đạo */}
      <div className="relative h-80 flex items-center justify-center">
        {/* Central Avatar */}
        <div className="relative z-20">
          <div className="central-star w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--star-glow)]">
            <img
              src={photoUrl}
              alt="Your cosmic self"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Orbital Container - ĐÂY LÀ CONTAINER SẼ QUAY TRÒN */}
        <div
          className="orbital-container absolute top-1/2 left-1/2 w-60 h-60 -translate-x-1/2 -translate-y-1/2"
          style={{ animation: `spin-slow 30s linear infinite` }}
        >
          {/* Lặp qua các đặc điểm để đặt chúng lên quỹ đạo */}
          {facialFeatures.map((feature, index) => {
            const isActive = feature.id === activeFeature;
            return (
              // "Cánh tay" vô hình để định vị từng nút.
              // Chúng ta xoay "cánh tay" này đến vị trí mong muốn.
              <div
                key={feature.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${feature.startingAngle}deg)`,
                }}
              >
                {/* Đặt nút ở trên cùng của "cánh tay" đã xoay */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button
                    onClick={() =>
                      handleFeatureClick(feature.id)
                    }
                    className={`
                      asteroid w-12 h-12 rounded-full flex items-center justify-center
                      text-xs font-medium border-2 cursor-pointer transition-all duration-300
                      ${
                        isActive
                          ? "active text-white border-[var(--star-glow)] scale-125 bg-[var(--star-glow)]"
                          : "bg-[var(--card-color)] text-[#D3D3D3] border-white/30 hover:border-[var(--star-glow)]/50 hover:scale-110"
                      }
                    `}
                    style={{
                      // Hoạt ảnh xoay ngược để giữ cho văn bản luôn thẳng đứng
                      animation: `spin-slow-reverse 30s linear infinite, asteroidFloat ${4 + index * 0.5}s ease-in-out infinite`,
                      animationDelay: `0s, ${index * 0.2}s`,
                      zIndex: isActive ? 25 : 15,
                      boxShadow: isActive
                        ? "0 0 25px var(--star-glow), 0 0 40px var(--star-glow)"
                        : "none",
                    }}
                  >
                    {feature.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Các hiệu ứng nền và SVG khác có thể giữ lại hoặc đơn giản hóa */}
        {/* Ví dụ: một vòng tròn quỹ đạo đơn giản */}
        <div className="absolute top-1/2 left-1/2 w-60 h-60 border border-[rgba(147,112,219,0.3)] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Enhanced Floating Cosmic Particles (Giữ nguyên) */}
        <div className="absolute top-8 right-8 w-1 h-1 bg-[var(--star-glow)] rounded-full twinkle opacity-70" />
        <div
          className="absolute bottom-12 left-6 w-1.5 h-1.5 bg-[var(--cyan)] rounded-full twinkle opacity-50"
          style={{ animationDelay: "1s" }}
        />
        {/* ... các hạt khác */}
      </div>

      {/* Enhanced Content Display Panel (Giữ nguyên) */}
      <div
        className={`glassmorphism rounded-xl p-4 mt-6 border-t-4 relative overflow-hidden ${isAnimating ? "content-fade" : ""}`}
        style={{ borderTopColor: "var(--star-glow)" }}
      >
        {/* ... nội dung bên trong giữ nguyên */}
        <div className="relative z-10">
          <h3 className="text-white font-medium text-lg mb-3 flex items-center">
            <span className="w-2 h-2 bg-[var(--star-glow)] rounded-full mr-2 animate-pulse"></span>
            {currentFeature.title}
          </h3>
          <div className="space-y-3 text-sm">
            <p className="text-white/90 leading-relaxed">
              <strong className="text-[var(--star-glow)]">
                Description:
              </strong>{" "}
              {currentFeature.analysis.description}
            </p>
            <p className="text-white/90 leading-relaxed">
              <strong className="text-[var(--star-glow)]">
                Interpretation:
              </strong>{" "}
              {currentFeature.analysis.interpretation}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Feature Navigation (Giữ nguyên) */}
      <div className="flex justify-center mt-4 space-x-3">
        {/* ... nội dung bên trong giữ nguyên */}
        {facialFeatures.map((feature) => (
          <button
            key={`indicator-${feature.id}`}
            onClick={() => handleFeatureClick(feature.id)}
            className={`relative transition-all duration-300 ${
              feature.id === activeFeature
                ? "transform scale-125"
                : "hover:scale-110"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                feature.id === activeFeature
                  ? "bg-[var(--star-glow)] shadow-[0_0_12px_var(--star-glow)]"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
            {feature.id === activeFeature && (
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--star-glow)] animate-ping opacity-20" />
            )}
          </button>
        ))}
      </div>

      {/* Orbital Status Information (Giữ nguyên) */}
      <div className="text-center mt-3">
        {/* ... nội dung bên trong giữ nguyên */}
      </div>
    </div>
  );
  // --- KẾT THÚC PHẦN SỬA ĐỔI ---
}