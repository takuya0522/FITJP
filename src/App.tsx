import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import BodyScreen from "./screens/BodyScreen";
import FoodScreen from "./screens/FoodScreen";
import WellnessScreen from "./screens/WellnessScreen";
import StyleScreen from "./screens/StyleScreen";

type Tab = "home" | "body" | "food" | "wellness" | "style";

const tabs: { id: Tab; label: string; icon: JSX.Element }[] = [
  {
    id: "home",
    label: "ホーム",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    id: "body",
    label: "ボディ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v6M9 10h6M9 19l3-6 3 6" />
      </svg>
    ),
  },
  {
    id: "food",
    label: "食事",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: "wellness",
    label: "健康",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "style",
    label: "スタイル",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen onNavigateTab={setActiveTab} />;
      case "body": return <BodyScreen />;
      case "food": return <FoodScreen />;
      case "wellness": return <WellnessScreen />;
      case "style": return <StyleScreen />;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #06061a 0%, #0d0d2e 50%, #0a0820 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Phone shell */}
      <div
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100vh)",
          background: "#09091a",
          borderRadius: "min(44px, 5vw)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 120px rgba(139,92,246,0.2), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: "#f0eeff", fontFamily: "DM Mono, monospace" }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="#f0eeff">
              <rect x="0" y="10" width="4" height="8" rx="1" />
              <rect x="5" y="7" width="4" height="11" rx="1" />
              <rect x="10" y="4" width="4" height="14" rx="1" />
              <rect x="15" y="1" width="4" height="17" rx="1" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="#f0eeff">
              <path d="M12 3C7 3 2.5 5.5 0 9.5L12 17 24 9.5C21.5 5.5 17 3 12 3Z" />
            </svg>
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <div style={{ width: 22, height: 12, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 3, padding: 2, display: "flex", gap: 1 }}>
                <div style={{ width: "70%", background: "#a78bfa", borderRadius: 1, height: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }} className="fade-in" key={activeTab}>
          {renderScreen()}
        </div>

        {/* Bottom tab bar */}
        <div
          style={{
            height: 80,
            background: "rgba(9,9,26,0.95)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 8px 16px",
            flexShrink: 0,
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: 12,
                  transition: "all 0.2s",
                  color: isActive ? "#a78bfa" : "#4a4870",
                  position: "relative",
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 32,
                      height: 2,
                      background: "linear-gradient(90deg, #8b5cf6, #f472b6)",
                      borderRadius: "0 0 2px 2px",
                    }}
                  />
                )}
                {tab.icon}
                <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, letterSpacing: "0.02em" }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
