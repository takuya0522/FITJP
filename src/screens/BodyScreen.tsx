import { useState } from "react";

type BodyTab = "scan" | "history" | "compare";

const BodyMesh = ({ colorMode }: { colorMode: boolean }) => (
  <svg viewBox="0 0 200 380" width="140" height="266" style={{ display: "block" }}>
    <defs>
      <radialGradient id="torsoHeat" cx="50%" cy="50%">
        <stop offset="0%" stopColor={colorMode ? "#fbbf24" : "#8b5cf6"} stopOpacity="0.9" />
        <stop offset="60%" stopColor={colorMode ? "#f472b6" : "#6d28d9"} stopOpacity="0.5" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="armHeat" cx="50%" cy="50%">
        <stop offset="0%" stopColor={colorMode ? "#2dd4bf" : "#8b5cf6"} stopOpacity="0.7" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={colorMode ? "#fbbf24" : "#8b5cf6"} />
        <stop offset="100%" stopColor={colorMode ? "#f472b6" : "#2dd4bf"} />
      </linearGradient>
    </defs>

    {/* Body outline fill */}
    <ellipse cx="100" cy="44" rx="22" ry="26" fill={colorMode ? "rgba(251,191,36,0.15)" : "rgba(139,92,246,0.15)"} stroke={colorMode ? "#fbbf24" : "#8b5cf6"} strokeWidth="0.8" />
    {/* Torso */}
    <path d="M72 76 Q68 90 66 120 Q64 148 66 170 Q68 188 100 192 Q132 188 134 170 Q136 148 134 120 Q132 90 128 76 Q114 72 100 72 Q86 72 72 76Z"
      fill={colorMode ? "url(#torsoHeat)" : "rgba(139,92,246,0.2)"} stroke={colorMode ? "#fbbf24" : "#8b5cf6"} strokeWidth="0.8" />
    {/* Left arm */}
    <path d="M68 78 Q55 95 50 125 Q48 140 52 155 Q56 162 64 160 Q70 148 72 130 Q74 110 72 90Z"
      fill={colorMode ? "url(#armHeat)" : "rgba(139,92,246,0.15)"} stroke={colorMode ? "#2dd4bf" : "#8b5cf6"} strokeWidth="0.8" />
    {/* Right arm */}
    <path d="M132 78 Q145 95 150 125 Q152 140 148 155 Q144 162 136 160 Q130 148 128 130 Q126 110 128 90Z"
      fill={colorMode ? "url(#armHeat)" : "rgba(139,92,246,0.15)"} stroke={colorMode ? "#2dd4bf" : "#8b5cf6"} strokeWidth="0.8" />
    {/* Legs */}
    <path d="M66 190 Q64 220 62 260 Q60 295 64 320 Q68 336 80 338 Q92 338 96 320 Q98 295 100 265" fill={colorMode ? "rgba(244,114,182,0.2)" : "rgba(109,40,217,0.3)"} stroke={colorMode ? "#f472b6" : "#7c3aed"} strokeWidth="0.8" />
    <path d="M134 190 Q136 220 138 260 Q140 295 136 320 Q132 336 120 338 Q108 338 104 320 Q102 295 100 265" fill={colorMode ? "rgba(244,114,182,0.2)" : "rgba(109,40,217,0.3)"} stroke={colorMode ? "#f472b6" : "#7c3aed"} strokeWidth="0.8" />

    {/* Grid lines */}
    {[...Array(8)].map((_, i) => (
      <line key={`h${i}`} x1="60" y1={80 + i * 32} x2="140" y2={80 + i * 32}
        stroke={colorMode ? "rgba(251,191,36,0.15)" : "rgba(139,92,246,0.2)"} strokeWidth="0.5" />
    ))}
    {[...Array(5)].map((_, i) => (
      <line key={`v${i}`} x1={68 + i * 16} y1="76" x2={68 + i * 16} y2="330"
        stroke={colorMode ? "rgba(251,191,36,0.15)" : "rgba(139,92,246,0.2)"} strokeWidth="0.5" />
    ))}
  </svg>
);

const MeasurementRow = ({
  label, value, unit, change,
}: { label: string; value: string; unit: string; change?: number }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
    <span style={{ fontSize: 13, color: "rgba(240,238,255,0.6)" }}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#f0eeff", fontFamily: "DM Mono, monospace" }}>{value}</span>
      <span style={{ fontSize: 11, color: "rgba(240,238,255,0.4)" }}>{unit}</span>
      {change !== undefined && (
        <span style={{ fontSize: 11, fontWeight: 600, color: change > 0 ? "#f472b6" : "#2dd4bf" }}>
          {change > 0 ? `▲ ${change}` : `▼ ${Math.abs(change)}`}
        </span>
      )}
    </div>
  </div>
);

export default function BodyScreen() {
  const [tab, setTab] = useState<BodyTab>("scan");
  const [colorMode, setColorMode] = useState(false);

  const tabs: { id: BodyTab; label: string }[] = [
    { id: "scan", label: "スキャン" },
    { id: "history", label: "履歴" },
    { id: "compare", label: "比較" },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      {/* Header */}
      <div style={{ padding: "4px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", letterSpacing: "0.08em" }}>BODY DATA</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#f0eeff" }}>ボディ分析</div>
        </div>
        <button
          onClick={() => setColorMode(!colorMode)}
          style={{
            background: colorMode ? "rgba(251,191,36,0.15)" : "rgba(139,92,246,0.15)",
            border: `1px solid ${colorMode ? "rgba(251,191,36,0.4)" : "rgba(139,92,246,0.4)"}`,
            borderRadius: 10,
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: 11,
            color: colorMode ? "#fbbf24" : "#a78bfa",
            fontWeight: 600,
          }}
        >
          {colorMode ? "カラーON" : "カラーOFF"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8 }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "7px 16px",
              borderRadius: 10,
              border: "none",
              background: tab === t.id ? "linear-gradient(135deg, #8b5cf6, #f472b6)" : "rgba(255,255,255,0.06)",
              color: tab === t.id ? "#fff" : "rgba(240,238,255,0.5)",
              fontSize: 12,
              fontWeight: tab === t.id ? 700 : 400,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "scan" && (
        <div className="fade-in">
          {/* 3D Body + stats */}
          <div
            style={{
              margin: "0 20px 16px",
              background: "linear-gradient(180deg, #111128 0%, #09091a 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "20px",
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <BodyMesh colorMode={colorMode} />
            </div>

            {/* Side stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 110 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)", letterSpacing: "0.06em", marginBottom: 4 }}>体重</div>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>58.4</div>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>kg</div>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)", letterSpacing: "0.06em", marginBottom: 4 }}>体脂肪率</div>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f472b6" }}>21.3</div>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>%</div>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)", letterSpacing: "0.06em", marginBottom: 4 }}>BMI</div>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#2dd4bf" }}>21.8</div>
              </div>
            </div>
          </div>

          {/* Date info */}
          <div style={{ padding: "0 20px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "rgba(240,238,255,0.5)" }}>最終スキャン: 2026年8月19日</div>
            <button
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
                border: "none",
                borderRadius: 20,
                padding: "8px 20px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              360° ビュー
            </button>
          </div>

          {/* Measurements */}
          <div style={{ padding: "0 20px 20px" }}>
            <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
              MEASUREMENTS
            </div>
            <div
              style={{
                background: "rgba(24,24,51,0.8)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "4px 16px",
              }}
            >
              <MeasurementRow label="バスト" value="83.2" unit="cm" change={-0.8} />
              <MeasurementRow label="ウエスト" value="66.5" unit="cm" change={-1.2} />
              <MeasurementRow label="ヒップ" value="90.4" unit="cm" change={0.5} />
              <MeasurementRow label="太もも（右）" value="52.1" unit="cm" change={-0.3} />
              <MeasurementRow label="二の腕（右）" value="27.8" unit="cm" change={-0.5} />
              <MeasurementRow label="ふくらはぎ（右）" value="35.4" unit="cm" />
            </div>
          </div>

          {/* Body age */}
          <div style={{ padding: "0 20px 24px" }}>
            <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
              体内年齢
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(45,212,191,0.1))",
                border: "1px solid rgba(139,92,246,0.25)",
                borderRadius: 20,
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div style={{ textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)", marginBottom: 4 }}>実年齢</div>
                <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>32</div>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>歳</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <svg width="32" height="16" viewBox="0 0 40 16">
                  <path d="M0 8 H36 M28 2 L36 8 L28 14" stroke="rgba(240,238,255,0.3)" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div style={{ textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 10, color: "#a78bfa", marginBottom: 4 }}>体内年齢</div>
                <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "DM Mono, monospace", background: "linear-gradient(135deg, #8b5cf6, #2dd4bf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>27</div>
                <div style={{ fontSize: 10, color: "#a78bfa" }}>歳</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "rgba(240,238,255,0.5)", textAlign: "center" }}>
              実年齢より <span style={{ color: "#2dd4bf", fontWeight: 700 }}>5歳若い</span> 体内年齢です 🎉
            </div>
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="fade-in" style={{ padding: "0 20px 24px" }}>
          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 16 }}>
            SCAN HISTORY
          </div>
          {[
            { date: "2026年8月19日", weight: "58.4kg", fat: "21.3%", note: "最新" },
            { date: "2026年7月28日", weight: "59.1kg", fat: "21.9%", note: "" },
            { date: "2026年7月7日", weight: "59.8kg", fat: "22.5%", note: "" },
            { date: "2026年6月14日", weight: "60.2kg", fat: "23.1%", note: "初回スキャン" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(24,24,51,0.8)",
                border: `1px solid ${i === 0 ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 16,
                padding: "16px",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: i === 0 ? "linear-gradient(135deg, #8b5cf6, #f472b6)" : "rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}
              >
                {i === 0 ? "✦" : "◦"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f0eeff" }}>{item.date}</div>
                <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)", marginTop: 2 }}>
                  {item.weight} · 体脂肪 {item.fat}
                </div>
              </div>
              {item.note && (
                <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600, background: "rgba(139,92,246,0.15)", padding: "4px 8px", borderRadius: 6 }}>
                  {item.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "compare" && (
        <div className="fade-in" style={{ padding: "0 20px 24px" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, background: "rgba(24,24,51,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#a78bfa", marginBottom: 6, fontWeight: 600 }}>START</div>
              <BodyMesh colorMode={false} />
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>60.2 kg</div>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>2026年6月14日</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
              <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.1)" }} />
              <div style={{ fontSize: 12, color: "rgba(240,238,255,0.3)" }}>VS</div>
              <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.1)" }} />
            </div>
            <div style={{ flex: 1, background: "rgba(24,24,51,0.8)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 16, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#f472b6", marginBottom: 6, fontWeight: 600 }}>NOW</div>
              <BodyMesh colorMode={true} />
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>58.4 kg</div>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>2026年8月19日</div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, rgba(45,212,191,0.1), rgba(139,92,246,0.1))",
              border: "1px solid rgba(45,212,191,0.2)",
              borderRadius: 16,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12, color: "rgba(240,238,255,0.5)", marginBottom: 8 }}>2ヶ月間の変化</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#2dd4bf" }}>▼ 1.8 kg</div>
            <div style={{ fontSize: 12, color: "rgba(240,238,255,0.5)", marginTop: 4 }}>体脂肪率 ▼ 1.8% · ウエスト ▼ 2.4cm</div>
          </div>
        </div>
      )}
    </div>
  );
}
