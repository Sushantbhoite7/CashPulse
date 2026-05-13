import { useApp } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Send, FileText, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const suggestions = [
  "How has FX exposure changed this week?",
  "What's driving the LATAM variance?",
  "Generate board narrative for Q3",
  "Compare base vs. stress scenario",
];

const sampleResponse =
  "Net FX exposure widened by $14M this week, driven primarily by a 3.2% USD/BRL move overnight [1]. Hedge ratio on BRL fell to 62%, below policy band of 70–85% [2]. Recommended action: layer in $40M of forward contracts within 5 business days to restore policy compliance.";

export function ChatDrawer() {
  const { chatOpen, setChatOpen } = useApp();
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi — I'm CashPulse. Ask me anything about your forecast, exposures, or scenarios." },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState<string | null>(null);

  useEffect(() => {
    if (!streaming) return;
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      if (i >= sampleResponse.length) {
        clearInterval(id);
        setMessages((m) => [...m, { role: "ai", text: sampleResponse }]);
        setStreaming(null);
      } else {
        setStreaming(sampleResponse.slice(0, i));
      }
    }, 20);
    return () => clearInterval(id);
  }, [streaming]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setStreaming("");
  }

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChatOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-50 h-full w-full sm:w-[440px] glass border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="relative inline-block h-2 w-2 rounded-full bg-teal text-teal glow-dot" />
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-teal" /> CashPulse AI
                  </div>
                  <div className="text-[10px] text-muted-foreground">Grounded · Claude · streaming</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-surface-2/60">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} text={m.text} />
              ))}
              {streaming !== null && (
                <>
                  <div className="text-[11px] text-muted-foreground space-y-0.5">
                    <ToolStep label="Querying forecast data" />
                    <ToolStep label="Analyzing SHAP attributions" />
                    <ToolStep label="Generating response" />
                  </div>
                  <Bubble role="ai" text={streaming + "▍"} />
                </>
              )}
            </div>

            <div className="px-5 pt-3 pb-4 border-t border-border space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-2.5 py-1.5 rounded-full border border-border bg-surface/60 hover:bg-surface-2/80 hover:border-teal/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask CashPulse anything…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
                <button type="submit" className="h-7 w-7 grid place-items-center rounded-md bg-gradient-to-r from-teal to-cyan text-primary-foreground">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Bubble({ role, text }: { role: "user" | "ai"; text: string }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-teal/15 border border-teal/30 px-3.5 py-2 text-sm">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-surface/70 border border-border px-3.5 py-2.5 text-sm leading-relaxed">
        {text.split(/(\[\d+\])/).map((part, i) =>
          /\[\d+\]/.test(part) ? (
            <sup key={i} className="ml-0.5 text-teal cursor-pointer hover:underline">{part}</sup>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
    </div>
  );
}

function ToolStep({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <ChevronRight className="h-3 w-3 text-teal" /> {label}…
    </div>
  );
}
