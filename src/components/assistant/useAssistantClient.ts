"use client";
import { useState } from "react";
import type { ChatMessage, ToolCall } from "./types";
import { localAssistant, greetMessage } from "./engine";

export function useAssistantClient() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem("assistant_chat_v1");
      if (raw) return JSON.parse(raw) as ChatMessage[];
    }
    return [{ role: "assistant", content: greetMessage() }];
  });
  const [loading, setLoading] = useState(false);

  const persist = (msgs: ChatMessage[]) => {
    try { window.localStorage.setItem("assistant_chat_v1", JSON.stringify(msgs)); } catch {}
  };

  const send = async (content: string) => {
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    persist(next);
    setLoading(true);
    try {
      // Simulate a short thinking delay for nicer UX
      await new Promise((r) => setTimeout(r, 150));
      // Local deterministic assistant (no API)
      const data = localAssistant(next) as ToolCall;
      if (data.type === "text") {
        const msgs = [...next, { role: "assistant", content: data.text }];
        setMessages(msgs);
        persist(msgs);
      } else {
        const label =
          data.name === "open_contact" ? "Opening contact form… 📬" :
          data.name === "navigate" ? `Navigating to ${data.args.page}… 🧭` :
          data.name === "scroll_to" ? `Scrolling to section… 🧷` :
          data.name === "filter_projects" ? `Filtering projects by ${data.args.tag}… 🏷️` :
          data.name === "toggle_theme" ? `Switching theme… 🌓` :
          data.name === "open_resume" ? "Opening resume PDF… 📄" :
          data.name === "copy_email" ? "Copying email to clipboard… 📋" :
          data.name === "share_project" ? "Copying project link… 🔗" :
          `Action: ${data.name}`;
        const msgs = [...next, { role: "assistant", content: label }];
        setMessages(msgs);
        persist(msgs);
      }
      return data;
    } catch (e: any) {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong." }]);
      return { type: "text", text: "Sorry, something went wrong." } as ToolCall;
    } finally {
      setLoading(false);
    }
  };

  return { messages, send, loading, setMessages };
}
