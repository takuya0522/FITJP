import DetailHeader from "../../components/DetailHeader";
import type { FashionProduct } from "./types";

export default function ProductListScreen({
  heading, products, onBack, onSelect,
}: { heading: string; products: FashionProduct[]; onBack: () => void; onSelect: (p: FashionProduct) => void }) {
  return (
    <div className="fade-in" style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      <DetailHeader title={heading} onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", marginBottom: 14 }}>
          {products.length}件のアイテム · ZOZOTOWN連携
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelect(p)}
              style={{
                background: "rgba(24,24,51,0.8)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                👗
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600, marginBottom: 4, letterSpacing: "0.04em" }}>{p.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff", marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f472b6", fontFamily: "DM Mono, monospace" }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
