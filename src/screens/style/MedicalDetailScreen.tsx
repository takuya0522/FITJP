import DetailHeader from "../../components/DetailHeader";
import type { MedicalItem } from "./types";

export default function MedicalDetailScreen({ item, onBack }: { item: MedicalItem; onBack: () => void }) {
  return (
    <div className="fade-in" style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      <DetailHeader title="オンライン診療" onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 20,
            padding: 18,
            marginBottom: 18,
          }}
        >
          <div style={{ fontSize: 34 }}>{item.icon}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f0eeff" }}>{item.name}</div>
            <div style={{ fontSize: 11, color: "#a78bfa", marginTop: 2 }}>{item.sub}</div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, marginBottom: 10, letterSpacing: "0.06em" }}>
          概要
        </div>
        <div
          style={{
            background: "rgba(24,24,51,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 13, color: "rgba(240,238,255,0.7)", lineHeight: 1.6, marginBottom: 14 }}>{item.description}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "rgba(240,238,255,0.5)",
              padding: "8px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span>診療形式</span>
            <span style={{ color: "#f0eeff" }}>オンライン診療（ビデオ通話）</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "rgba(240,238,255,0.5)",
              padding: "8px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span>お薬代目安</span>
            <span style={{ color: "#f472b6", fontFamily: "DM Mono, monospace", fontWeight: 700 }}>{item.price}</span>
          </div>
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
          診療を予約する
        </button>
      </div>
    </div>
  );
}
