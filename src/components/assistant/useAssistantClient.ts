"use client";
import { useState } from "react";
import type { ChatMessage, ToolCall, AssistantMessage, UserMessage } from "./types";
import { localAssistant, greetMessage } from "./engine";

function isToolResponse(response: ToolCall): response is Extract<ToolCall, { type: "tool" }> {
  return response.type === "tool";
}

function getToolResponseLabel(response: Extract<ToolCall, { type: "tool" }>) {
  switch (response.name) {
    case "open_contact":
      return "Opening contact form… 📬";
    case "navigate":
      return `Navigating to ${response.args.page}… 🧭`;
    case "scroll_to":
      return "Scrolling to section… 🧷";
    case "filter_projects":
      return `Filtering projects by ${response.args.tag}… 🏷️`;
    case "toggle_theme":
      return "Switching theme… 🌓";
    case "open_resume":
      return "Opening resume PDF… 📄";
    case "copy_email":
      return "Copying email to clipboard… 📋";
    case "share_project":
      return "Copying project link… 🔗";
    default:
      // Removed the exhaustiveCheck line causing the type error
      return `Action: Unknown`;
  }
}

export function useAssistantClient() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem("assistant_chat_v1");
      if (raw) return JSON.parse(raw) as ChatMessage[];
    }
    const m: AssistantMessage = { role: "assistant", content: greetMessage() };
    return [m];
  });
  const [loading, setLoading] = useState(false);

  const persist = (msgs: ChatMessage[]) => {
    try {
      window.localStorage.setItem("assistant_chat_v1", JSON.stringify(msgs));
    } catch {}
  };

  const send = async (content: string) => {
    const userMsg: UserMessage = { role: "user", content };
    const next: ChatMessage[] = [...messages, userMsg];
    setMessages(next);
    persist(next);
    setLoading(true);

    try {
      // Simulate a short thinking delay for nicer UX
      await new Promise((r) => setTimeout(r, 150));

      // Local deterministic assistant (no API)
      const response = localAssistant(next) as ToolCall;

      if (!response || typeof response !== "object") {
        throw new Error("Invalid response from assistant");
      }

      const responseContent =
        response.type === "text"
          ? response.text
          : isToolResponse(response)
          ? getToolResponseLabel(response)
          : "Unknown response type";

      const assistantMsg: AssistantMessage = {
        role: "assistant",
        content: responseContent,
      };

      setMessages((prev) => {
        const arr: ChatMessage[] = [...prev, assistantMsg];
        persist(arr);
        return arr;
      });

      return response;
    } catch (e: unknown) {
      const errorMsg: AssistantMessage = {
        role: "assistant",
        content: "Sorry, something went wrong.",
      };
      setMessages((prev) => {
        const arr = [...prev, errorMsg];
        persist(arr);
        return arr;
      });
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { messages, send, loading, setMessages };
}
