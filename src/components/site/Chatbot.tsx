import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Bot, Send, X } from "lucide-react";
import { getChatbotResponse, quickReplies } from "@/lib/chatbot-responses";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE =
  "Hi! I'm the Xylance Technologies assistant. Ask me anything about our services, pricing, or how to get in touch.";

type ChatbotProps = {
  open: boolean;
  onClose: () => void;
};

export function Chatbot({ open, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const reply = getChatbotResponse(trimmed);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: "assistant", content: reply },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed bottom-24 right-6 z-50 flex w-[min(100vw-3rem,380px)] flex-col overflow-hidden rounded-2xl border border-border glass-strong shadow-glow-purple animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
      role="dialog"
      aria-label="AI assistant chat"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-gradient-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Xylance Assistant</div>
            <div className="text-xs opacity-80">Usually replies instantly</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg p-1.5 hover:bg-primary-foreground/15 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex max-h-80 min-h-64 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                message.role === "user"
                  ? "rounded-br-md bg-gradient-primary text-primary-foreground"
                  : "rounded-bl-md bg-muted text-foreground",
              )}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
              <span className="inline-flex gap-1">
                <span className="animate-bounce [animation-delay:0ms]">•</span>
                <span className="animate-bounce [animation-delay:150ms]">•</span>
                <span className="animate-bounce [animation-delay:300ms]">•</span>
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => sendMessage(reply)}
              disabled={isTyping}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:opacity-50"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isTyping}
          className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
