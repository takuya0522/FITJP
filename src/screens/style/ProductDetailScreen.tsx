import DetailHeader from "../../components/DetailHeader";

export default function ProductDetailScreen({
  title,
  tag,
  price,
  description,
  colors,
  emoji = "👗",
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  onBack,
}: {
  title: string;
  tag: string;
  price: string;
  description: string;
  colors: [string, string];
  emoji?: string;
  primaryLabel: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  onBack: () => void;
}) {
  return (
    <div className="fade-in" style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      <DetailHeader title="アイテム詳細" onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        <div
          style={{
            height: 220,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            marginBottom: 18,
          }}
        >
          {emoji}
        </div>
        <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, marginBottom: 6, letterSpacing: "0.04em" }}>{tag}</div>
        <div style={{ fontSize: 19, fontWeight: 700, color: "#f0eeff", marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f472b6", fontFamily: "DM Mono, monospace", marginBottom: 16 }}>{price}</div>

        <div
          style={{
            background: "rgba(24,24,51,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, marginBottom: 10, letterSpacing: "0.06em" }}>
            あなたに似合う理由
          </div>
          <div style={{ fontSize: 13, color: "rgba(240,238,255,0.7)", lineHeight: 1.6 }}>{description}</div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {secondaryLabel && (
            <button
              onClick={onSecondary}
              style={{
                flex: 1,
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.35)",
                borderRadius: 14,
                padding: 14,
                color: "#a78bfa",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {secondaryLabel}
            </button>
          )}
          <button
            onClick={onPrimary}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
              border: "none",
              borderRadius: 14,
              padding: 14,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
