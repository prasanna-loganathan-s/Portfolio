"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useAssistantClient } from "./useAssistantClient";
import { greetMessage } from "./engine";
import { AiOutlineRobot } from "react-icons/ai";
import type { ToolCall } from "./types";
import { FiSend } from "react-icons/fi";

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const { messages, send, loading } = useAssistantClient();
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const executeTool = async (tool: ToolCall) => {
    if (tool.type !== "tool") return;
    try {
      switch (tool.name) {
        case "open_contact":
          window.dispatchEvent(new CustomEvent("open-contact-modal"));
          break;
        case "navigate":
          router.push(tool.args.page === "home" ? "/" : `/${tool.args.page}`);
          break;
        case "scroll_to":
          document.getElementById(tool.args.id)?.scrollIntoView({ behavior: "smooth" });
          break;
        case "filter_projects":
          router.push(`/projects?tag=${encodeURIComponent(tool.args.tag)}`);
          break;
        case "toggle_theme":
          setTheme(tool.args.mode);
          break;
        case "open_resume": {
          const url = "/Prasanna_Loganathan.pdf";
          window.open(url, "_blank", "noopener,noreferrer");
          break;
        }
        case "copy_email": {
          const email = (window as any)?.SITE_EMAIL || "";
          try {
            await navigator.clipboard.writeText(email);
          } catch (err) {
            console.error("Clipboard error", err);
          }
          break;
        }
        case "share_project": {
          const base = window.location.origin;
          const link = `${base}/projects`;
          try {
            await navigator.clipboard.writeText(link);
          } catch (err) {
            console.error("Clipboard error", err);
          }
          break;
        }
      }
    } catch (e) {
      console.error("tool error", e);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    const tool = await send(text);
    setInput("");
    await executeTool(tool);
    setSending(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 w-[min(92vw,440px)] overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white/90 via-white/80 to-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-zinc-900/60">
      <div className="flex items-center justify-between border-b border-zinc-200/60 px-3 py-2 dark:border-zinc-700/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent"><AiOutlineRobot className="h-5 w-5" /></div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-accent">Assistant</p>
            <span className="text-[10px] text-zinc-500">Ask about projects, skills, experience, or contact</span>
          </div>
        </div>
        <button onClick={onClose} className="rounded-md px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">Close</button>
      </div>
      <div className="max-h-[56vh] space-y-3 overflow-y-auto p-3 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-start gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role !== "user" && (
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent"><AiOutlineRobot className="h-3.5 w-3.5" /></div>
            )}
            <span className={`${m.role === "user" ? "bg-accent text-white" : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"} inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2`}> 
              {m.content}
            </span>
            {m.role === "user" && (
              <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-blue-500/20 text-center leading-6">🧑</div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.2s]" />
            <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
            <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.2s]" />
            <span className="text-xs">Thinking…</span>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="border-t border-zinc-200/60 p-2 dark:border-zinc-700/60">
        <div className="mb-2 flex flex-wrap gap-2">
          <button onClick={() => setInput("Show React projects") } className="rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-800">React projects</button>
          <button onClick={() => setInput("Open contact form") } className="rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-800">Contact</button>
          <button onClick={() => setInput("Open resume PDF") } className="rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-800">Resume</button>
          <button onClick={() => setInput("Copy email address") } className="rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-800">Copy email</button>
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            className="max-h-32 min-h-9 flex-1 resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button disabled={sending} type="submit" className="group inline-flex items-center justify-center rounded-md bg-accent px-3 py-2 text-sm text-white shadow-sm transition hover:brightness-95 disabled:opacity-60">
            <FiSend className="mr-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
