import DetailHeader from "../../components/DetailHeader";

export default function ArTryOnScreen({
  title, subtitle, emoji, onBack,
}: { title: string; subtitle: string; emoji: string; onBack: () => void }) {
  return (
    <div className="fade-in" style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      <DetailHeader title={title} onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        <div
          style={{
            height: 380,
            borderRadius: 24,
            background: "linear-gradient(160deg, rgba(139,92,246,0.18), rgba(9,9,26,0.9))",
            border: "1px solid rgba(139,92,246,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ fontSize: 88 }}>{emoji}</div>
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(0,0,0,0.4)",
              borderRadius: 20,
              padding: "4px 10px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f472b6" }} />
            <span style={{ fontSize: 10, color: "#f0eeff", fontWeight: 600, letterSpacing: "0.04em" }}>AR LIVE</span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "rgba(240,238,255,0.6)", lineHeight: 1.6, marginBottom: 20, textAlign: "center" }}>
          {subtitle}
        </div>
        <button
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
            border: "none",
            borderRadius: 16,
            padding: 14,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          この見た目で購入する
        </button>
      </div>
    </div>
  );
}
