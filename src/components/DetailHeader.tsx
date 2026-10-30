export default function DetailHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 20px 16px" }}>
      <button
        onClick={onBack}
        aria-label="戻る"
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f0eeff" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#f0eeff" }}>{title}</div>
    </div>
  );
}
