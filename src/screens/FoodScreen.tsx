import { useState } from "react";

type FoodTab = "diary" | "nutrition" | "supplement";

const MacroBar = ({ label, current, max, color }: { label: string; current: number; max: number; color: string }) => {
  const pct = Math.min(current / max, 1) * 100;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "rgba(240,238,255,0.6)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>
          {current} <span style={{ color: "rgba(240,238,255,0.4)" }}>/ {max}g</span>
        </span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
};

const MealCard = ({
  meal, time, calories, items,
}: { meal: string; time: string; calories: number; items: string[] }) => (
  <div
    style={{
      background: "rgba(24,24,51,0.8)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 10,
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#f0eeff" }}>{meal}</span>
        <span style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", marginLeft: 8 }}>{time}</span>
      </div>
      <span style={{ fontSize: 13, fontFamily: "DM Mono, monospace", color: "#fbbf24", fontWeight: 600 }}>{calories} kcal</span>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map((item, i) => (
        <span key={i} style={{ fontSize: 11, color: "rgba(240,238,255,0.6)", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "3px 8px" }}>
          {item}
        </span>
      ))}
    </div>
  </div>
);

const CalorieRing = ({ consumed, target }: { consumed: number; target: number }) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const prog = Math.min(consumed / target, 1) * circ;
  return (
    <div style={{ position: "relative", width: 120, height: 120 }}>
      <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="60" cy="60" r={r} fill="none"
          stroke="url(#calGrad)" strokeWidth="8"
          strokeDasharray={`${prog} ${circ}`} strokeLinecap="round" />
        <defs>
          <linearGradient id="calGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>{consumed}</div>
        <div style={{ fontSize: 9, color: "rgba(240,238,255,0.45)", letterSpacing: "0.04em" }}>残り kcal</div>
      </div>
    </div>
  );
};

const SupplementCard = ({
  name, effect, timing, taken,
}: { name: string; effect: string; timing: string; taken: boolean }) => (
  <div
    style={{
      background: taken ? "rgba(45,212,191,0.08)" : "rgba(24,24,51,0.8)",
      border: `1px solid ${taken ? "rgba(45,212,191,0.3)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        width: 40, height: 40, borderRadius: 12,
        background: taken ? "rgba(45,212,191,0.2)" : "rgba(139,92,246,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}
    >
      {taken ? "✓" : "○"}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff" }}>{name}</div>
      <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)", marginTop: 2 }}>{effect} · {timing}</div>
    </div>
    <button
      style={{
        background: taken ? "rgba(45,212,191,0.15)" : "linear-gradient(135deg, #8b5cf6, #f472b6)",
        border: "none",
        borderRadius: 10,
        padding: "6px 12px",
        color: taken ? "#2dd4bf" : "#fff",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {taken ? "服用済" : "購入"}
    </button>
  </div>
);

export default function FoodScreen() {
  const [tab, setTab] = useState<FoodTab>("diary");

  const foodTabs: { id: FoodTab; label: string }[] = [
    { id: "diary", label: "食事日記" },
    { id: "nutrition", label: "栄養目標" },
    { id: "supplement", label: "サプリ" },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      {/* Header */}
      <div style={{ padding: "4px 20px 12px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", letterSpacing: "0.08em" }}>NUTRITION</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f0eeff" }}>食事管理</div>
      </div>

      {/* Tab bar */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8 }}>
        {foodTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "7px 14px",
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

      {tab === "diary" && (
        <div className="fade-in">
          {/* Date nav */}
          <div style={{ padding: "0 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, padding: "6px 10px", color: "rgba(240,238,255,0.6)", cursor: "pointer", fontSize: 16 }}>‹</button>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f0eeff" }}>2026年8月20日（水）</span>
            <button style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, padding: "6px 10px", color: "rgba(240,238,255,0.6)", cursor: "pointer", fontSize: 16 }}>›</button>
          </div>

          {/* Summary row */}
          <div
            style={{
              margin: "0 20px 20px",
              background: "rgba(24,24,51,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "20px",
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <CalorieRing consumed={1272} target={1912} />
            <div style={{ flex: 1 }}>
              <MacroBar label="タンパク質" current={98} max={167} color="#f472b6" />
              <MacroBar label="脂質" current={28} max={42} color="#fbbf24" />
              <MacroBar label="炭水化物" current={145} max={215} color="#8b5cf6" />
            </div>
          </div>

          {/* Water */}
          <div style={{ margin: "0 20px 16px" }}>
            <div
              style={{
                background: "rgba(45,212,191,0.08)",
                border: "1px solid rgba(45,212,191,0.2)",
                borderRadius: 14,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>💧</span>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(240,238,255,0.6)" }}>水分摂取量</div>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "DM Mono, monospace", color: "#2dd4bf" }}>1,200 ml</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>目標</div>
                <div style={{ fontSize: 13, color: "rgba(240,238,255,0.6)", fontFamily: "DM Mono, monospace" }}>2,000 ml</div>
              </div>
            </div>
          </div>

          {/* Meals */}
          <div style={{ padding: "0 20px" }}>
            <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
              TODAY'S MEALS
            </div>
            <MealCard meal="朝食" time="07:32" calories={420} items={["ご飯（150g）", "みそ汁", "焼き鮭", "卵焼き"]} />
            <MealCard meal="昼食" time="12:48" calories={580} items={["鶏むねサラダ", "玄米おにぎり", "野菜スープ"]} />
            <MealCard meal="間食" time="15:10" calories={120} items={["プロテインバー"]} />

            <button
              style={{
                width: "100%", background: "rgba(139,92,246,0.1)", border: "1px dashed rgba(139,92,246,0.4)",
                borderRadius: 16, padding: "14px", color: "#a78bfa", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              ＋ 夕食を記録する
            </button>
          </div>
        </div>
      )}

      {tab === "nutrition" && (
        <div className="fade-in" style={{ padding: "0 20px 24px" }}>
          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 16 }}>
            YOUR DAILY TARGET
          </div>
          <div
            style={{
              background: "rgba(24,24,51,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "20px",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <CalorieRing consumed={640} target={1912} />
            </div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "rgba(240,238,255,0.5)" }}>残りカロリー</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>1,272 kcal</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {[
                { label: "タンパク質", value: "167g", color: "#f472b6" },
                { label: "脂質", value: "42g", color: "#fbbf24" },
                { label: "炭水化物", value: "215g", color: "#8b5cf6" },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: m.color, fontWeight: 600, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "rgba(24,24,51,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "16px",
              fontSize: 12,
              color: "rgba(240,238,255,0.6)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            あなたの3Dボディデータに基づいて、最適なカロリーと栄養バランスを算出しています。体脂肪率を維持しながら筋肉量を増やす「リコンプ」プランが適しています。
          </div>

          <button
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
              border: "none",
              borderRadius: 16,
              padding: "14px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            目標を変更する
          </button>
        </div>
      )}

      {tab === "supplement" && (
        <div className="fade-in" style={{ padding: "0 20px 24px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(244,114,182,0.08))",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 16,
              padding: "14px 16px",
              marginBottom: 16,
              fontSize: 12,
              color: "rgba(240,238,255,0.7)",
              lineHeight: 1.6,
            }}
          >
            あなたの体内年齢・血液データに基づいた<br />
            <span style={{ color: "#a78bfa", fontWeight: 700 }}>パーソナライズされたサプリ</span>をご提案します
          </div>

          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
            今日のサプリメント
          </div>
          <SupplementCard name="マルチビタミン" effect="免疫・エネルギー" timing="朝食後" taken={true} />
          <SupplementCard name="オメガ3（EPA/DHA）" effect="心血管・抗炎症" timing="昼食後" taken={true} />
          <SupplementCard name="マグネシウム" effect="睡眠・筋肉回復" timing="就寝前" taken={false} />

          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12, marginTop: 20 }}>
            おすすめサプリ
          </div>
          <SupplementCard name="プロテイン（ホエイ）" effect="筋肉合成" timing="運動後" taken={false} />
          <SupplementCard name="ビタミンD3" effect="骨・免疫" timing="朝食後" taken={false} />

          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12, marginTop: 20 }}>
            医療・処方薬（オンライン診療）
          </div>
          <div
            style={{
              background: "rgba(244,114,182,0.08)",
              border: "1px solid rgba(244,114,182,0.2)",
              borderRadius: 16,
              padding: "16px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 24 }}>🩺</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff" }}>GLP-1 / 美容内服薬</div>
                <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)", marginTop: 2 }}>オンライン医師診察・処方対応</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(244,114,182,0.6)" strokeWidth="2" style={{ marginLeft: "auto" }}>
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
