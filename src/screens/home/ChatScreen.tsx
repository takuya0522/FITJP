import { useEffect, useRef, useState } from "react";
import DetailHeader from "../../components/DetailHeader";

type ChatMessage = { id: number; role: "assistant" | "user"; text: string };

const QUICK_REPLIES = ["今日の食事について相談したい", "睡眠の質を上げたい", "モチベーションが上がらない"];

const ERROR_RESPONSE =
  "すみません、うまく応答できませんでした。しばらくしてからもう一度お試しください。";

export default function ChatScreen({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      text: "こんにちは、琢也さん。今日の調子はいかがですか？食事・運動・睡眠など、気になることがあればいつでも聞いてください。",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const nextId = useRef(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    const history = [...messages, { id: -1, role: "user" as const, text: trimmed }];
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: trimmed }]);
    setInput("");
    setThinking(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const replyText = res.ok && data.reply ? data.reply : (data.error ?? ERROR_RESPONSE);
      setMessages((m) => [...m, { id: nextId.current++, role: "assistant", text: replyText }]);
    } catch {
      setMessages((m) => [...m, { id: nextId.current++, role: "assistant", text: ERROR_RESPONSE }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="fade-in" style={{ height: "100%", display: "flex", flexDirection: "column", background: "#09091a" }}>
      <DetailHeader title="AIコーチ" onBack={onBack} />

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
              marginBottom: 14,
              flexDirection: m.role === "user" ? "row-reverse" : "row",
            }}
          >
            {m.role === "assistant" && (
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #2dd4bf)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                }}
              >
                🤖
              </div>
            )}
            <div
              style={{
                maxWidth: "78%",
                padding: "10px 14px",
                borderRadius: 16,
                fontSize: 13,
                lineHeight: 1.6,
                background: m.role === "user" ? "linear-gradient(135deg, #8b5cf6, #f472b6)" : "rgba(24,24,51,0.85)",
                border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                color: m.role === "user" ? "#fff" : "#f0eeff",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 14 }}>
            <div
              style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #2dd4bf)",
                flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
              }}
            >
              🤖
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 16,
                background: "rgba(24,24,51,0.85)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(240,238,255,0.5)",
                fontSize: 13,
              }}
            >
              入力中…
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4, marginBottom: 14 }}>
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  borderRadius: 20,
                  padding: "8px 14px",
                  color: "#a78bfa",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          padding: "10px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send(input);
          }}
          placeholder="メッセージを入力"
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "10px 16px",
            color: "#f0eeff",
            fontSize: 13,
            outline: "none",
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || thinking}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: input.trim() && !thinking ? "pointer" : "default",
            opacity: input.trim() && !thinking ? 1 : 0.4,
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22,2 15,22 11,13 2,9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
