import { useState } from "react";

const SleepBar = ({ hour, quality }: { hour: string; quality: number }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
    <div style={{ height: 48, width: "60%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div
        style={{
          width: "100%",
          height: `${quality}%`,
          background: quality > 80 ? "linear-gradient(180deg, #8b5cf6, #2dd4bf)" : quality > 60 ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.25)",
          borderRadius: "4px 4px 0 0",
          transition: "height 0.4s ease",
        }}
      />
    </div>
    <span style={{ fontSize: 8, color: "rgba(240,238,255,0.35)" }}>{hour}</span>
  </div>
);

const StatTile = ({
  icon, label, value, unit, color, sub,
}: { icon: string; label: string; value: string; unit: string; color: string; sub?: string }) => (
  <div
    style={{
      background: "rgba(24,24,51,0.8)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 18,
      padding: "16px",
      flex: 1,
    }}
  >
    <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 10, color: "rgba(240,238,255,0.45)", letterSpacing: "0.06em", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "DM Mono, monospace", color }}>
      {value}
      <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(240,238,255,0.4)", marginLeft: 3 }}>{unit}</span>
    </div>
    {sub && <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)", marginTop: 4 }}>{sub}</div>}
  </div>
);

const ExerciseRow = ({
  name, duration, calories, icon,
}: { name: string; duration: string; calories: number; icon: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <div
      style={{
        width: 40, height: 40, borderRadius: 12,
        background: "rgba(139,92,246,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#f0eeff" }}>{name}</div>
      <div style={{ fontSize: 11, color: "rgba(240,238,255,0.45)", marginTop: 2 }}>{duration}</div>
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "DM Mono, monospace", color: "#fbbf24" }}>{calories}</div>
      <div style={{ fontSize: 9, color: "rgba(240,238,255,0.4)" }}>kcal</div>
    </div>
  </div>
);

export default function WellnessScreen() {
  const [weekOffset] = useState(0);

  const sleepData = [
    { hour: "月", quality: 75 },
    { hour: "火", quality: 88 },
    { hour: "水", quality: 62 },
    { hour: "木", quality: 90 },
    { hour: "金", quality: 55 },
    { hour: "土", quality: 95 },
    { hour: "日", quality: 80 },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      {/* Header */}
      <div style={{ padding: "4px 20px 16px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", letterSpacing: "0.08em" }}>HEALTH DATA</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f0eeff" }}>健康データ</div>
      </div>

      {/* Weekly overview */}
      <div style={{ margin: "0 20px 20px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
          今週のサマリー
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <StatTile icon="🔥" label="消費カロリー" value="10,840" unit="kcal" color="#fbbf24" sub="目標の87%" />
          <StatTile icon="🏃" label="総歩数" value="52,140" unit="steps" color="#8b5cf6" sub="目標の74%" />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <StatTile icon="💗" label="平均心拍" value="72" unit="bpm" color="#f472b6" sub="安静時良好" />
          <StatTile icon="🧘" label="平均睡眠" value="7.2" unit="h" color="#2dd4bf" sub="深い睡眠 1.8h" />
        </div>
      </div>

      {/* Sleep quality chart */}
      <div style={{ margin: "0 20px 20px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
          睡眠スコア（週）
        </div>
        <div
          style={{
            background: "rgba(24,24,51,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "20px 16px 12px",
          }}
        >
          <div style={{ display: "flex", gap: 0, alignItems: "flex-end" }}>
            {sleepData.map((d, i) => (
              <SleepBar key={i} hour={d.hour} quality={d.quality} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>週平均睡眠時間</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#2dd4bf" }}>7.2 <span style={{ fontSize: 11, fontWeight: 400 }}>h</span></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>睡眠スコア</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#8b5cf6" }}>78 <span style={{ fontSize: 11, fontWeight: 400 }}>/100</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's exercise */}
      <div style={{ margin: "0 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em" }}>
            今日のアクティビティ
          </div>
          <span style={{ fontSize: 10, color: "#a78bfa" }}>Apple HealthKit連携</span>
        </div>
        <div
          style={{
            background: "rgba(24,24,51,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "4px 16px",
          }}
        >
          <ExerciseRow name="朝のランニング" duration="35分 · 5.2km" calories={298} icon="🏃‍♀️" />
          <ExerciseRow name="ヨガ" duration="20分" calories={84} icon="🧘‍♀️" />
          <ExerciseRow name="ウォーキング" duration="18分 · 1.8km" calories={64} icon="🚶‍♀️" />
        </div>
        <button
          style={{
            marginTop: 10, width: "100%",
            background: "rgba(139,92,246,0.1)", border: "1px dashed rgba(139,92,246,0.4)",
            borderRadius: 14, padding: "12px", color: "#a78bfa", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}
        >
          ＋ アクティビティを追加
        </button>
      </div>

      {/* Body age trend */}
      <div style={{ margin: "0 20px 24px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
          体内年齢の推移
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(45,212,191,0.08))",
            border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: 20,
            padding: "20px",
          }}
        >
          {/* Simple SVG trend line */}
          <svg viewBox="0 0 280 80" width="100%" height="80">
            <defs>
              <linearGradient id="trendFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[20, 40, 60].map((y) => (
              <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}
            {/* Trend path */}
            <path d="M0,65 C30,60 60,55 90,50 C120,45 150,42 180,38 C210,34 240,30 280,27"
              fill="none" stroke="url(#trendGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path d="M0,65 C30,60 60,55 90,50 C120,45 150,42 180,38 C210,34 240,30 280,27 L280,80 L0,80Z"
              fill="url(#trendFill)" />
            {/* Points */}
            {[[0, 65], [70, 52], [140, 42], [210, 35], [280, 27]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill={i === 4 ? "#2dd4bf" : "#8b5cf6"} />
            ))}
          </svg>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>6ヶ月前</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "DM Mono, monospace", color: "#8b5cf6" }}>31歳</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#2dd4bf", fontWeight: 600 }}>▼ 4歳 若返り</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "rgba(240,238,255,0.4)" }}>現在</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "DM Mono, monospace", color: "#2dd4bf" }}>27歳</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
