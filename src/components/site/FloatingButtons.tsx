import { useState } from "react";
import { MessageCircle, Bot } from "lucide-react";
import { Chatbot } from "@/components/site/Chatbot";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/918667825086"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="h-12 w-12 inline-flex items-center justify-center rounded-full bg-[oklch(0.7_0.18_150)] text-white shadow-glow hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          aria-label={chatOpen ? "Close AI assistant" : "Open AI assistant"}
          aria-expanded={chatOpen}
          className={cn(
            "h-12 w-12 inline-flex items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow-purple hover:scale-110 transition-transform",
            chatOpen && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          )}
        >
          <Bot className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
