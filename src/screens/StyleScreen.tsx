import { useState } from "react";
import ProductListScreen from "./style/ProductListScreen";
import ProductDetailScreen from "./style/ProductDetailScreen";
import ArTryOnScreen from "./style/ArTryOnScreen";
import MedicalDetailScreen from "./style/MedicalDetailScreen";
import type { CosmeticProduct, FashionProduct, MedicalItem } from "./style/types";

type StyleTab = "skeleton" | "fashion" | "cosmetics";

type DetailView =
  | { kind: "list"; heading: string; products: FashionProduct[] }
  | { kind: "fashion-detail"; product: FashionProduct }
  | { kind: "cosmetic-detail"; product: CosmeticProduct }
  | { kind: "ar"; title: string; subtitle: string; emoji: string }
  | { kind: "medical"; item: MedicalItem };

const fashionItems: FashionProduct[] = [
  {
    id: "flare-skirt",
    title: "ブルーフレアスカート",
    tag: "骨格ウェーブ × サマー",
    colors: ["#8b5cf6", "#f472b6"],
    cta: "試着する",
    price: "¥8,900",
    description: "ウエストマークのあるフレアシルエットが、ウェーブ型の柔らかな曲線を美しく見せます。ブルーベースのサマーカラーで肌色にもよく馴染みます。",
  },
  {
    id: "chiffon-blouse",
    title: "シフォンブラウス",
    tag: "ウェーブ推奨素材",
    colors: ["#f472b6", "#fbcfe8"],
    cta: "バーチャル試着",
    price: "¥6,400",
    description: "柔らかく繊細なシフォン素材はウェーブ型と相性抜群。フェミニンな透け感が上品な印象を与えます。",
  },
  {
    id: "a-line-dress",
    title: "Aラインワンピース",
    tag: "骨格ベストマッチ",
    colors: ["#a78bfa", "#2dd4bf"],
    cta: "試着する",
    price: "¥11,800",
    description: "ウエストから広がるAラインが、骨格ウェーブの曲線を活かしながら華奢見えを叶えます。",
  },
  {
    id: "lavender-knit",
    title: "ラベンダーニット",
    tag: "サマーカラー",
    colors: ["#c084fc", "#8b5cf6"],
    cta: "バーチャル試着",
    price: "¥7,200",
    description: "パーソナルカラー診断のサマータイプに合わせたラベンダーカラー。肌をワントーン明るく見せます。",
  },
];

const moreZozotownItems: FashionProduct[] = [
  {
    id: "knit-cardigan",
    title: "ニットカーディガン",
    tag: "骨格ウェーブ",
    colors: ["#f9a8d4", "#c4b5fd"],
    cta: "試着する",
    price: "¥9,500",
    description: "柔らかい編み地とゆとりのあるシルエットで、ウェーブ型の華奢さを引き立てます。",
  },
  {
    id: "pleats-skirt",
    title: "プリーツスカート",
    tag: "サマーカラー",
    colors: ["#67e8f9", "#a78bfa"],
    cta: "バーチャル試着",
    price: "¥7,800",
    description: "軽やかなプリーツの揺れ感がフェミニンな印象をプラス。ブルーベースの肌色に馴染むカラー展開です。",
  },
];

const cosmeticItems: CosmeticProduct[] = [
  {
    id: "rose-pink-lip",
    name: "ローズピンク リップ",
    type: "リップカラー · ブルーベース",
    emoji: "💄",
    action: "AR試す",
    price: "¥2,800",
    description: "サマータイプのブルーベース肌に映えるローズピンク。血色感をプラスしながら上品な仕上がりに。",
  },
  {
    id: "lavender-eyeshadow",
    name: "ラベンダーアイシャドウ",
    type: "アイシャドウ · くすみ系",
    emoji: "👁️",
    action: "AR試す",
    price: "¥3,400",
    description: "くすみラベンダーが目元に柔らかな陰影を作り、涼しげで洗練された印象に仕上げます。",
  },
  {
    id: "pink-beige-cheek",
    name: "ピンクベージュ チーク",
    type: "チーク · ブルーベース",
    emoji: "🌸",
    action: "AR試す",
    price: "¥2,600",
    description: "自然な血色感を演出するピンクベージュ。サマータイプの肌色と相性の良い定番カラーです。",
  },
  {
    id: "spf50-uv",
    name: "SPF50+ UVケア",
    type: "日焼け止め · 美白",
    emoji: "☀️",
    action: "購入する",
    price: "¥3,200",
    description: "美白有効成分配合の高SPF処方。毎日のスキンケアの仕上げに使える軽い付け心地です。",
  },
];

const medicalItems: MedicalItem[] = [
  {
    id: "whitening-pill",
    icon: "💊",
    name: "美白内服薬（トランシーノ等）",
    sub: "処方対応",
    description: "メラニン生成を抑えるビタミンC・トラネキサム酸配合の内服薬です。オンライン診療で医師の診察を受けた上で処方されます。",
    price: "¥3,500〜/月",
  },
  {
    id: "aga-care",
    icon: "🧴",
    name: "AGAケア（男性）",
    sub: "医師診察あり",
    description: "男性型脱毛症（AGA）の進行を抑える内服・外用薬です。専門医によるオンライン診察の上、症状に合わせて処方されます。",
    price: "¥6,000〜/月",
  },
  {
    id: "acne-care",
    icon: "✨",
    name: "ニキビ・肌荒れ改善薬",
    sub: "処方対応",
    description: "炎症を抑える外用薬と整腸作用のある内服薬を組み合わせて処方。肌の状態に応じてオンラインで継続フォローが受けられます。",
    price: "¥2,800〜/月",
  },
];

const SkeletonType = ({
  type, label, selected, color,
}: { type: string; label: string; selected: boolean; color: string }) => (
  <div
    style={{
      flex: 1,
      background: selected ? `${color}20` : "rgba(24,24,51,0.6)",
      border: `1px solid ${selected ? color : "rgba(255,255,255,0.07)"}`,
      borderRadius: 16,
      padding: "14px 10px",
      textAlign: "center",
      cursor: "pointer",
    }}
  >
    <div style={{ fontSize: 28, marginBottom: 6 }}>{type}</div>
    <div style={{ fontSize: 11, fontWeight: selected ? 700 : 400, color: selected ? color : "rgba(240,238,255,0.5)" }}>
      {label}
    </div>
  </div>
);

const FashionItem = ({
  product, onOpen, onCta,
}: { product: FashionProduct; onOpen: () => void; onCta: () => void }) => (
  <div
    onClick={onOpen}
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
        height: 110,
        background: `linear-gradient(135deg, ${product.colors[0]}, ${product.colors[1]})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
      }}
    >
      👗
    </div>
    <div style={{ padding: "12px" }}>
      <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600, marginBottom: 4, letterSpacing: "0.04em" }}>{product.tag}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff", marginBottom: 8 }}>{product.title}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCta();
        }}
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
          border: "none",
          borderRadius: 10,
          padding: "8px",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {product.cta}
      </button>
    </div>
  </div>
);

const CosmeticCard = ({
  product, onOpen, onAction,
}: { product: CosmeticProduct; onOpen: () => void; onAction: () => void }) => (
  <div
    onClick={onOpen}
    style={{
      background: "rgba(24,24,51,0.8)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      padding: "14px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10,
      cursor: "pointer",
    }}
  >
    <div
      style={{
        width: 48, height: 48, borderRadius: 14,
        background: "linear-gradient(135deg, rgba(244,114,182,0.2), rgba(139,92,246,0.2))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, flexShrink: 0,
      }}
    >
      {product.emoji}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff" }}>{product.name}</div>
      <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)", marginTop: 2 }}>{product.type}</div>
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      style={{
        background: "rgba(244,114,182,0.15)",
        border: "1px solid rgba(244,114,182,0.3)",
        borderRadius: 10,
        padding: "6px 12px",
        color: "#f472b6",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {product.action}
    </button>
  </div>
);

export default function StyleScreen() {
  const [tab, setTab] = useState<StyleTab>("skeleton");
  const [selectedSkeleton, setSelectedSkeleton] = useState(1);
  const [stack, setStack] = useState<DetailView[]>([]);

  const current = stack[stack.length - 1] ?? null;
  const push = (view: DetailView) => setStack((s) => [...s, view]);
  const pop = () => setStack((s) => s.slice(0, -1));

  const openFashionCta = (product: FashionProduct) => {
    if (product.cta === "バーチャル試着") {
      push({ kind: "ar", title: `バーチャル試着 · ${product.title}`, subtitle: `${product.title}を仮想試着して、似合い具合をその場で確認できます。`, emoji: "👗" });
    } else {
      push({ kind: "fashion-detail", product });
    }
  };

  const openCosmeticAction = (product: CosmeticProduct) => {
    if (product.action === "AR試す") {
      push({ kind: "ar", title: `AR試す · ${product.name}`, subtitle: `${product.name}を顔に重ねて、バーチャルで発色を確認できます。`, emoji: product.emoji });
    } else {
      push({ kind: "cosmetic-detail", product });
    }
  };

  if (current) {
    switch (current.kind) {
      case "list":
        return (
          <ProductListScreen
            heading={current.heading}
            products={current.products}
            onBack={pop}
            onSelect={(product) => push({ kind: "fashion-detail", product })}
          />
        );
      case "fashion-detail":
        return (
          <ProductDetailScreen
            title={current.product.title}
            tag={current.product.tag}
            price={current.product.price}
            description={current.product.description ?? "骨格診断・パーソナルカラー診断の結果に基づくおすすめアイテムです。"}
            colors={current.product.colors}
            emoji="👗"
            primaryLabel="ZOZOTOWNで購入"
            secondaryLabel="バーチャル試着する"
            onSecondary={() =>
              push({ kind: "ar", title: `バーチャル試着 · ${current.product.title}`, subtitle: `${current.product.title}を仮想試着して、似合い具合をその場で確認できます。`, emoji: "👗" })
            }
            onBack={pop}
          />
        );
      case "cosmetic-detail":
        return (
          <ProductDetailScreen
            title={current.product.name}
            tag={current.product.type}
            price={current.product.price}
            description={current.product.description ?? "パーソナルカラー診断の結果に基づくおすすめコスメです。"}
            colors={["#f472b6", "#8b5cf6"]}
            emoji={current.product.emoji}
            primaryLabel="ZOZOTOWNで購入"
            secondaryLabel="AR試す"
            onSecondary={() =>
              push({ kind: "ar", title: `AR試す · ${current.product.name}`, subtitle: `${current.product.name}を顔に重ねて、バーチャルで発色を確認できます。`, emoji: current.product.emoji })
            }
            onBack={pop}
          />
        );
      case "ar":
        return <ArTryOnScreen title={current.title} subtitle={current.subtitle} emoji={current.emoji} onBack={pop} />;
      case "medical":
        return <MedicalDetailScreen item={current.item} onBack={pop} />;
    }
  }

  const tabs: { id: StyleTab; label: string }[] = [
    { id: "skeleton", label: "骨格診断" },
    { id: "fashion", label: "ファッション" },
    { id: "cosmetics", label: "コスメ" },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#09091a" }}>
      {/* Header */}
      <div style={{ padding: "4px 20px 12px" }}>
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", letterSpacing: "0.08em" }}>STYLE & BEAUTY</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f0eeff" }}>スタイル診断</div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8 }}>
        {tabs.map((t) => (
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

      {tab === "skeleton" && (
        <div className="fade-in" style={{ padding: "0 20px 24px" }}>
          {/* Result banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(244,114,182,0.15))",
              border: "1px solid rgba(139,92,246,0.35)",
              borderRadius: 20,
              padding: "20px",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>
              あなたの骨格タイプ
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                fontFamily: "Noto Serif JP, serif",
                background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 6,
              }}
            >
              ウェーブ型
            </div>
            <div style={{ fontSize: 12, color: "rgba(240,238,255,0.6)", lineHeight: 1.6 }}>
              柔らかく女性らしい曲線が特徴。<br />
              フェミニンでゆとりあるスタイルが最も映えます。
            </div>
          </div>

          {/* Type selection */}
          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
            骨格タイプ
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[
              { icon: "⬜", label: "ストレート", color: "#fbbf24" },
              { icon: "〜", label: "ウェーブ", color: "#f472b6" },
              { icon: "▱", label: "ナチュラル", color: "#2dd4bf" },
            ].map((s, i) => (
              <div key={i} onClick={() => setSelectedSkeleton(i)} style={{ flex: 1 }}>
                <SkeletonType type={s.icon} label={s.label} selected={selectedSkeleton === i} color={s.color} />
              </div>
            ))}
          </div>

          {/* Fit tips */}
          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
            似合うポイント
          </div>
          <div
            style={{
              background: "rgba(24,24,51,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "16px",
            }}
          >
            {[
              { icon: "✓", text: "ウエストマークのあるシルエット", color: "#2dd4bf" },
              { icon: "✓", text: "フレアスカート・Aラインワンピース", color: "#2dd4bf" },
              { icon: "✓", text: "柔らかく繊細な素材（シフォン・レース）", color: "#2dd4bf" },
              { icon: "✗", text: "オーバーサイズ・ゴツいストリート系", color: "#f472b6" },
              { icon: "✗", text: "厚みのある硬い素材", color: "#f472b6" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 13, color: item.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: "rgba(240,238,255,0.7)", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* ZOZO link */}
          <button
            onClick={() => push({ kind: "list", heading: "似合うアイテムを探す", products: fashionItems })}
            style={{
              marginTop: 16,
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
            ZOZOTOWNで似合うアイテムを探す
          </button>
        </div>
      )}

      {tab === "fashion" && (
        <div className="fade-in" style={{ padding: "0 20px 24px" }}>
          {/* Personal color */}
          <div
            style={{
              background: "rgba(24,24,51,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "16px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", gap: 4 }}>
              {["#f472b6", "#e879f9", "#a78bfa", "#fbcfe8"].map((c) => (
                <div key={c} style={{ width: 20, height: 20, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, color: "rgba(240,238,255,0.45)", marginBottom: 2 }}>パーソナルカラー</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f0eeff" }}>サマータイプ（ブルーベース）</div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
            あなたへのおすすめ
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {fashionItems.map((product) => (
              <FashionItem
                key={product.id}
                product={product}
                onOpen={() => push({ kind: "fashion-detail", product })}
                onCta={() => openFashionCta(product)}
              />
            ))}
          </div>

          <button
            onClick={() => push({ kind: "list", heading: "ZOZOTOWNのおすすめ", products: [...fashionItems, ...moreZozotownItems] })}
            style={{
              width: "100%",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.35)",
              borderRadius: 14,
              padding: "13px",
              color: "#a78bfa",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ZOZOTOWNでもっと見る →
          </button>
        </div>
      )}

      {tab === "cosmetics" && (
        <div className="fade-in" style={{ padding: "0 20px 24px" }}>
          {/* AR makeup banner */}
          <div
            onClick={() =>
              push({
                kind: "ar",
                title: "ARメイク",
                subtitle: "顔型・パーソナルカラーに合わせたバーチャルメイクアップをリアルタイムで確認できます。",
                emoji: "🪞",
              })
            }
            style={{
              background: "linear-gradient(135deg, rgba(244,114,182,0.15), rgba(139,92,246,0.1))",
              border: "1px solid rgba(244,114,182,0.25)",
              borderRadius: 20,
              padding: "16px 20px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 32 }}>🪞</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eeff" }}>ARメイクを試す</div>
              <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)", marginTop: 2 }}>顔型・パーソナルカラーに合わせた<br />バーチャルメイクアップ</div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(244,114,182,0.6)" strokeWidth="2" style={{ marginLeft: "auto" }}>
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </div>

          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
            あなたへのコスメ提案（サマータイプ）
          </div>

          {cosmeticItems.map((product) => (
            <CosmeticCard
              key={product.id}
              product={product}
              onOpen={() => push({ kind: "cosmetic-detail", product })}
              onAction={() => openCosmeticAction(product)}
            />
          ))}

          <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12, marginTop: 20 }}>
            医療美容（オンライン診療）
          </div>
          <div
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.25)",
              borderRadius: 16,
              padding: "16px",
            }}
          >
            {medicalItems.map((item, i) => (
              <div
                key={item.id}
                onClick={() => push({ kind: "medical", item })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: i < medicalItems.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f0eeff" }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#a78bfa" }}>{item.sub}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,255,0.3)" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
