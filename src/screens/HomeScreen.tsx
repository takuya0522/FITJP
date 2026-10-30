import { useState } from "react";
import ArticleScreen from "./home/ArticleScreen";
import ChatScreen from "./home/ChatScreen";

type Tab = "home" | "body" | "food" | "wellness" | "style";

type DetailView = { kind: "glp1-article" } | { kind: "aging-article" } | { kind: "coach-chat" };

const MetricRing = ({
  value, max, label, unit, color, size = 72,
}: { value: number; max: number; label: string; unit: string; color: string; size?: number }) => {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const progress = (value / max) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${progress} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ marginTop: -size / 2 - 6, textAlign: "center", position: "relative", top: -size / 2 + 4 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#f0eeff", fontFamily: "DM Mono, monospace" }}>{value}</div>
        <div style={{ fontSize: 9, color: "rgba(240,238,255,0.45)", letterSpacing: "0.05em" }}>{unit}</div>
      </div>
      <div style={{ fontSize: 10, color, fontWeight: 600, letterSpacing: "0.04em", marginTop: -size / 2 + 4 }}>{label}</div>
    </div>
  );
};

const ActionCard = ({ title, subtitle, onClick }: { title: string; subtitle: string; onClick: () => void }) => (
  <div
    onClick={onClick}
    style={{
      minWidth: 160,
      background: "rgba(139,92,246,0.12)",
      border: "1px solid rgba(139,92,246,0.25)",
      borderRadius: 16,
      padding: "14px 16px",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>TO DO</div>
    <div style={{ fontSize: 14, fontWeight: 700, color: "#f0eeff", lineHeight: 1.4 }}>{title}</div>
    <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)", marginTop: 4 }}>{subtitle}</div>
  </div>
);

const NewsCard = ({ tag, title, img, onClick }: { tag: string; title: string; img: string; onClick: () => void }) => (
  <div onClick={onClick} style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
    <div
      style={{
        width: 60, height: 60, borderRadius: 12,
        background: img,
        flexShrink: 0,
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4 }}>{tag}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#f0eeff", lineHeight: 1.4 }}>{title}</div>
    </div>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,255,0.3)" strokeWidth="2">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  </div>
);

export default function HomeScreen({ onNavigateTab }: { onNavigateTab: (tab: Tab) => void }) {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 11) return "おはようございます";
    if (h < 17) return "こんにちは";
    return "こんばんは";
  });
  const [detail, setDetail] = useState<DetailView | null>(null);

  if (detail?.kind === "glp1-article") {
    return (
      <ArticleScreen
        eyebrow="NEW"
        title="GLP-1でのダイエットサポートを開始"
        heroGradient="linear-gradient(135deg, #2dd4bf 0%, #8b5cf6 100%)"
        heroEmoji="💉"
        lead="GLP-1受容体作動薬を活用したオンライン診療メニューが始まりました。医師の診察のもと、食欲コントロールと体重管理を無理なくサポートします。"
        sections={[
          { heading: "GLP-1とは", body: "食後の血糖上昇を穏やかにし、満腹感を持続させるホルモンの働きを補う治療法です。国内外の臨床データで体重管理への効果が報告されています。" },
          { heading: "サポート内容", body: "オンライン問診・医師診察・お薬の配送までを完結。食事タブの記録データを共有することで、より的確な用量調整のアドバイスが受けられます。" },
        ]}
        ctaLabel="食事タブでサポートを始める"
        onCta={() => onNavigateTab("food")}
        onBack={() => setDetail(null)}
      />
    );
  }

  if (detail?.kind === "aging-article") {
    return (
      <ArticleScreen
        eyebrow="TIPS"
        title="体内年齢を下げる生活習慣 5選"
        heroGradient="linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)"
        heroEmoji="🌿"
        lead="体内年齢は日々の小さな習慣の積み重ねで変わります。今日から取り入れやすい5つの習慣をご紹介します。"
        listItems={[
          "起床後にコップ1杯の水を飲み、代謝のスイッチを入れる",
          "1日8,000歩を目安に、こまめに歩く時間をつくる",
          "タンパク質を毎食の主菜に取り入れる",
          "就寝1時間前はスマホを置き、深い睡眠を確保する",
          "週2回、軽い筋力トレーニングを取り入れる",
        ]}
        ctaLabel="健康タブで体内年齢を確認する"
        onCta={() => onNavigateTab("wellness")}
        onBack={() => setDetail(null)}
      />
    );
  }

  if (detail?.kind === "coach-chat") {
    return <ChatScreen onBack={() => setDetail(null)} />;
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      {/* Header */}
      <div style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: "#fff",
            }}
          >
            山
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(240,238,255,0.45)", marginBottom: 1 }}>{greeting}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f0eeff" }}>山口 琢也さん</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,238,255,0.6)", padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero gradient band */}
      <div
        style={{
          margin: "0 20px 20px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(244,114,182,0.15) 50%, rgba(45,212,191,0.1) 100%)",
          border: "1px solid rgba(139,92,246,0.2)",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: -40, right: -40, width: 140, height: 140,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
        />
        <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>
          IRODORU by ZOZO
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f0eeff", fontFamily: "Noto Serif JP, serif", lineHeight: 1.4, marginBottom: 8 }}>
          知る、変わる、輝く。
        </div>
        <div style={{ fontSize: 12, color: "rgba(240,238,255,0.6)", lineHeight: 1.6 }}>
          テクノロジーがあなただけの<br />美と健康を照らします
        </div>

        {/* Today's score */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
              borderRadius: 12, padding: "8px 14px",
              fontSize: 12, fontWeight: 700, color: "#fff",
            }}
          >
            ウェルネス スコア
          </div>
          <div>
            <span style={{ fontSize: 28, fontWeight: 800, fontFamily: "DM Mono, monospace", color: "#f0eeff" }}>82</span>
            <span style={{ fontSize: 12, color: "rgba(240,238,255,0.5)", marginLeft: 4 }}>/100</span>
          </div>
          <div style={{ marginLeft: 4, fontSize: 11, color: "#a78bfa" }}>▲ 先週比 +5</div>
        </div>
      </div>

      {/* Today's metrics */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 14 }}>
          TODAY'S METRICS
        </div>
        <div
          style={{
            background: "rgba(24,24,51,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <MetricRing value={1640} max={1912} label="カロリー" unit="kcal" color="#f472b6" />
          <MetricRing value={8200} max={10000} label="歩数" unit="steps" color="#8b5cf6" />
          <MetricRing value={7} max={8} label="睡眠" unit="時間" color="#2dd4bf" />
        </div>
      </div>

      {/* Action cards */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 14 }}>
          TODAY'S ACTIONS
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
          <ActionCard title="ボディスキャンを記録" subtitle="前回から21日経過" onClick={() => onNavigateTab("body")} />
          <ActionCard title="食事を入力する" subtitle="昼食がまだ未記録" onClick={() => onNavigateTab("food")} />
          <ActionCard title="体内年齢を確認" subtitle="新しいデータあり" onClick={() => onNavigateTab("wellness")} />
        </div>
      </div>

      {/* Insights */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 14 }}>
          INSIGHTS HUB
        </div>
        <div
          style={{
            background: "rgba(24,24,51,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <NewsCard
            tag="FEATURE"
            title="骨格診断で似合うファッションを発見"
            img="linear-gradient(135deg, #8b5cf6 0%, #f472b6 100%)"
            onClick={() => onNavigateTab("style")}
          />
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
          <NewsCard
            tag="NEW"
            title="GLP-1でのダイエットサポートを開始"
            img="linear-gradient(135deg, #2dd4bf 0%, #8b5cf6 100%)"
            onClick={() => setDetail({ kind: "glp1-article" })}
          />
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
          <NewsCard
            tag="TIPS"
            title="体内年齢を下げる生活習慣 5選"
            img="linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)"
            onClick={() => setDetail({ kind: "aging-article" })}
          />
        </div>
      </div>

      {/* Coach banner */}
      <div style={{ padding: "0 20px 32px" }}>
        <div
          onClick={() => setDetail({ kind: "coach-chat" })}
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(244,114,182,0.1))",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #2dd4bf)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff", marginBottom: 3 }}>AIコーチに相談する</div>
            <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)" }}>あなた専属のウェルネスアドバイザー</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,255,0.4)" strokeWidth="2">
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
