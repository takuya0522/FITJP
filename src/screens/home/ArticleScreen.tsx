import DetailHeader from "../../components/DetailHeader";

export type ArticleSection = { heading: string; body: string };

export default function ArticleScreen({
  eyebrow,
  title,
  heroGradient,
  heroEmoji,
  lead,
  sections,
  listItems,
  ctaLabel,
  onCta,
  onBack,
}: {
  eyebrow: string;
  title: string;
  heroGradient: string;
  heroEmoji: string;
  lead: string;
  sections?: ArticleSection[];
  listItems?: string[];
  ctaLabel?: string;
  onCta?: () => void;
  onBack: () => void;
}) {
  return (
    <div className="fade-in" style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      <DetailHeader title="インサイト" onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        <div
          style={{
            height: 140,
            borderRadius: 20,
            background: heroGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 52,
            marginBottom: 18,
          }}
        >
          {heroEmoji}
        </div>

        <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>{eyebrow}</div>
        <div style={{ fontSize: 19, fontWeight: 700, color: "#f0eeff", lineHeight: 1.4, marginBottom: 10 }}>{title}</div>
        <div style={{ fontSize: 13, color: "rgba(240,238,255,0.65)", lineHeight: 1.7, marginBottom: 20 }}>{lead}</div>

        {sections?.map((s, i) => (
          <div
            key={i}
            style={{
              background: "rgba(24,24,51,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff", marginBottom: 8 }}>{s.heading}</div>
            <div style={{ fontSize: 13, color: "rgba(240,238,255,0.65)", lineHeight: 1.6 }}>{s.body}</div>
          </div>
        ))}

        {listItems && (
          <div
            style={{
              background: "rgba(24,24,51,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
            }}
          >
            {listItems.map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "10px 0",
                  borderBottom: i < listItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 13, color: "rgba(240,238,255,0.75)", lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
          </div>
        )}

        {ctaLabel && (
          <button
            onClick={onCta}
            style={{
              marginTop: 8,
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
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
