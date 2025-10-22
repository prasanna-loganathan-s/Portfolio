import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimiterApi, getUserId } from "@/utility/rate-limiter";
import { PROJECTS_CARD } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";
import { EXPERIENCE } from "@/data/experience";
import resumeData from "@/data/resume";

// Tool schema (simple)
type ToolCall =
  | { type: "text"; text: string }
  | { type: "tool"; name: "open_contact"; args: {} }
  | { type: "tool"; name: "navigate"; args: { page: "home" | "projects" | "about" | "resume" } }
  | { type: "tool"; name: "scroll_to"; args: { id: string } }
  | { type: "tool"; name: "filter_projects"; args: { tag: string } }
  | { type: "tool"; name: "toggle_theme"; args: { mode: "light" | "dark" | "system" } };

function summarizeContext() {
  const proj = PROJECTS_CARD.map(p => ({
    name: p.name,
    summary: p.description,
    tags: p.technologies ?? [],
  }));

  const skillGroups = SKILLS_DATA.flatMap(group =>
    group.skills.map(s => (typeof s === "string" ? s : s.name ?? ""))
  );

  // ✅ Final fix: only use valid fields (`title`, `organisation`, `period`, `date`)
  const exp = EXPERIENCE.map(e => ({
    role: e.title ?? "",
    company: e.organisation?.name ?? "",
    period: e.period ?? e.date ?? "",
  }));

  const res = { summary: "", highlights: [] as string[] };

  return { proj, skillGroups, exp, res };
}

const SYSTEM = `You are a helpful portfolio assistant for the site owner. Be brief, friendly, and accurate.
You can either reply with text or request a UI action (tool).
When you want an action, output strict JSON only in one of these shapes:
{"type":"tool","name":"open_contact","args":{}}
{"type":"tool","name":"navigate","args":{"page":"home|projects|about|resume"}}
{"type":"tool","name":"scroll_to","args":{"id":"section-id"}}
{"type":"tool","name":"filter_projects","args":{"tag":"react"}}
{"type":"tool","name":"toggle_theme","args":{"mode":"light|dark|system"}}
Otherwise, reply with {"type":"text","text":"..."}.
Never include extra keys. Never include markdown, only JSON.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // 20 requests/minute per IP+UA
  const limiter = rateLimiterApi({ uniqueTokenPerInterval: 100, interval: 60_000, getUserId });
  try {
    await limiter.check(res, req, 20);
  } catch {
    return res.status(429).json({ error: "Too many requests" });
  }

  const { messages } = req.body as { messages: { role: "user" | "assistant"; content: string }[] };
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

  const genAI = new GoogleGenerativeAI(apiKey);

  const pinnedModelId = "gemini-1.5-flash-8b";

  const full = summarizeContext();
  const context = {
    proj: full.proj.slice(0, 6),
    skillGroups: full.skillGroups.slice(0, 12),
    exp: full.exp.slice(0, 5),
    res: full.res,
  };

  const input = [
    { role: "user", content: SYSTEM },
    { role: "user", content: `Context: ${JSON.stringify(context)}` },
    ...messages.map(m => ({ role: m.role, content: m.content })),
    { role: "user", content: "Respond strictly with a single JSON object as specified." },
  ];

  try {
    const model = genAI.getGenerativeModel({ model: pinnedModelId });
    const result = await model.generateContent({
      contents: input.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    });

    const text = result.response.text();
    let parsed: ToolCall | null = null;

    try {
      parsed = JSON.parse(text) as ToolCall;
    } catch {
      parsed = { type: "text", text };
    }

    if (!parsed || (parsed as any).type === undefined) parsed = { type: "text", text };

    return res.status(200).json(parsed);
  } catch (err: any) {
    console.error("assistant error", err?.message);
    return res.status(500).json({ error: "Assistant failed" });
  }
}
