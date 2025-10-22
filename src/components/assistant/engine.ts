import { PROJECTS_CARD } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";
import { EXPERIENCE } from "@/data/experience";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import resumeData, { getResumeData } from "@/data/resume";
import type { ToolCall } from "./types";

type Message = { role: "user" | "assistant"; content: string };

const SECTION_IDS = ["home", "projects", "about", "skills", "experience", "resume", "contact"] as const;

type SectionId = typeof SECTION_IDS[number];

function toSimple(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function detectNavigate(text: string): ToolCall | null {
  const t = toSimple(text);
  if (/\b(home|start|landing)\b/.test(t)) return { type: "tool", name: "navigate", args: { page: "home" } } as const;
  if (/\b(project|projects|work)\b/.test(t)) return { type: "tool", name: "navigate", args: { page: "projects" } } as const;
  if (/\b(about|bio)\b/.test(t)) return { type: "tool", name: "navigate", args: { page: "about" } } as const;
  if (/\b(resume|cv)\b/.test(t)) return { type: "tool", name: "navigate", args: { page: "resume" } } as const;
  return null;
}

function detectContact(text: string): ToolCall | null {
  const t = toSimple(text);
  if (/\b(contact|email|reach|hire|message|talk)\b/.test(t)) {
    return { type: "tool", name: "open_contact", args: {} } as const;
  }
  return null;
}

function detectTheme(text: string): ToolCall | null {
  const t = toSimple(text);
  if (/\b(dark mode|dark theme)\b/.test(t)) return { type: "tool", name: "toggle_theme", args: { mode: "dark" } } as const;
  if (/\b(light mode|light theme)\b/.test(t)) return { type: "tool", name: "toggle_theme", args: { mode: "light" } } as const;
  if (/\b(system theme|system mode|auto)\b/.test(t)) return { type: "tool", name: "toggle_theme", args: { mode: "system" } } as const;
  return null;
}

function detectScroll(text: string): ToolCall | null {
  const t = toSimple(text);
  for (const id of SECTION_IDS) {
    if (new RegExp(`\\b${id}\\b`).test(t) && /\b(scroll|go to|jump|show|open)\b/.test(t)) {
      return { type: "tool", name: "scroll_to", args: { id } } as const;
    }
  }
  return null;
}

function detectFilterProjects(text: string): ToolCall | null {
  const t = toSimple(text);
  // capture tag words after 'filter' or 'show ... projects'
  const tagMatch = t.match(/(?:filter|show)\s+(?:me\s+)?([a-z0-9+.#-]+)\s+(?:projects|work)/);
  if (tagMatch?.[1]) {
    return { type: "tool", name: "filter_projects", args: { tag: tagMatch[1] } } as const;
  }
  // common tech keywords
  const common = [
    "react","next","typescript","node","python","ai","ml","tailwind","docker","kubernetes","firebase","supabase","graphql"
  ];
  for (const c of common) {
    if (new RegExp(`\\b${c}\\b`).test(t) && /\b(projects|work)\b/.test(t)) {
      return { type: "tool", name: "filter_projects", args: { tag: c } } as const;
    }
  }
  return null;
}

function answerProjects(text: string): string | null {
  const t = toSimple(text);
  // Ask about specific project by name keyword
  const candidates = PROJECTS_CARD.map(p => ({
    name: p.name.toLowerCase(),
    desc: p.description ?? "",
    tech: (p.technologies ?? []).map(x => x.toLowerCase()),
  }));
  const direct = candidates.find(c => t.includes(c.name.split(" ")[0]));
  if (direct) {
    return `"${direct.name}" — ${direct.desc}`;
  }
  if (/\b(projects|portfolio|work)\b/.test(t)) {
    const top = PROJECTS_CARD.slice(0, 3).map(p => `• ${p.name} — ${(p.description||"").slice(0, 120)}...`).join("\n");
    return `Here are a few highlighted projects:\n${top}\nYou can ask to filter by tech, e.g., 'show React projects'.`;
  }
  return null;
}

function answerSkills(text: string): string | null {
  const t = toSimple(text);
  if (!/(skill|stack|tech|technology)/.test(t)) return null;
  const flat = SKILLS_DATA.flatMap(g => g.skills.map(s => (typeof s === "string" ? s : s.name)));
  const sample = flat.slice(0, 15).join(", ");
  return `Key skills include: ${sample}. Ask for projects using a specific tech, e.g., 'show React projects'.`;
}

function detectOpenResume(text: string): ToolCall | null {
  const t = toSimple(text);
  if (/(open|show|view)\s+(resume|cv|pdf)/.test(t)) {
    return { type: "tool", name: "open_resume", args: {} } as const;
  }
  return null;
}

function detectCopyEmail(text: string): ToolCall | null {
  const t = toSimple(text);
  if (/(copy|what is|show)\s+(your\s+)?email/.test(t) || /email\s+(address|id)/.test(t)) {
    return { type: "tool", name: "copy_email", args: {} } as const;
  }
  return null;
}

function detectShareProject(text: string): ToolCall | null {
  const t = toSimple(text);
  if (!/(share|link|send)/.test(t)) return null;
  const names = PROJECTS_CARD.map(p => p.name.toLowerCase());
  const match = names.find(n => t.includes(n.split(" ")[0]));
  if (match) {
    return { type: "tool", name: "share_project", args: { name: match } } as const;
  }
  return null;
}

function answerIdentity(text: string): string | null {
  const t = toSimple(text);
  if (/(full\s+name|your\s+name|what\s+is\s+(the\s+)?name)/.test(t)) {
    const name = siteMetadata?.author || siteMetadata?.headerTitle || siteMetadata?.title || "";
    return `Full name: ${name}.`;
  }
  return null;
}

function getExperienceYears(): { years: number; since: number } {
  const currentYear = new Date().getFullYear();
  // Try to infer earliest start year from EXPERIENCE dates like "2024 - 2025" or "2025 - Present"
  const years = EXPERIENCE
    .map((e) => {
      const m = (e.date || "").match(/(\d{4})\s*-\s*(\d{4}|present)/i);
      if (!m) return null;
      const start = parseInt(m[1], 10);
      const end = /present/i.test(m[2]) ? currentYear : parseInt(m[2], 10);
      if (!start || !end || end < start) return null;
      return { start, end };
    })
    .filter(Boolean) as { start: number; end: number }[];

  if (years.length === 0) return { years: 0, since: currentYear };
  const earliest = Math.min(...years.map((r) => r.start));
  const total = Math.max(...years.map((r) => r.end)) - earliest + 1;
  return { years: total, since: earliest };
}

function answerExperienceYears(text: string): string | null {
  const t = toSimple(text);
  if (/(how\s+many\s+(years\s+)?experience|years\s+of\s+experience|experience\s+years?)/.test(t)) {
    const { years, since } = getExperienceYears();
    const roles = EXPERIENCE.map((e) => e.title).slice(0, 3).join(", ");
    return `Approximately ${years} year${years !== 1 ? "s" : ""} of experience (since ${since}). Recent roles include: ${roles}.`;
  }
  return null;
}

function answerProjectsCount(text: string): string | null {
  const t = toSimple(text);
  if (/(how\s+many\s+projects|project\s+count|number\s+of\s+projects)/.test(t)) {
    const total = PROJECTS_CARD.length;
    const byCat = PROJECTS_CARD.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const parts = Object.entries(byCat).map(([k, v]) => `${v} ${k}`).join(", ");
    return `Total projects: ${total}. By category: ${parts}.`;
  }
  return null;
}

function answerSkillsCounts(text: string): string | null {
  const t = toSimple(text);
  if (/(how\s+many\s+skills|skills\s+count|number\s+of\s+skills)/.test(t)) {
    const sections = SKILLS_DATA.map(s => ({ name: s.sectionName, count: s.skills.length }));
    const total = sections.reduce((a, b) => a + b.count, 0);
    const parts = sections.map(s => `${s.count} in ${s.name}`).join(", ");
    return `Total skills listed: ${total}. Breakdown: ${parts}.`;
  }
  // list skills in a section
  const sec = SKILLS_DATA.find(s => t.includes(s.sectionName.toLowerCase()));
  if (sec && /(list|show)\s+skills/.test(t)) {
    const names = sec.skills.map(s => typeof s === 'string' ? s : s.name).join(", ");
    return `${sec.sectionName}: ${names}.`;
  }
  return null;
}

function answerContactInfo(text: string): string | null {
  const t = toSimple(text);
  if (/(contact|email|linkedin|github|social)/.test(t)) {
    const email = siteMetadata?.email ? `Email: ${siteMetadata.email}` : "";
    const gh = siteMetadata?.github ? `GitHub: ${siteMetadata.github}` : "";
    const li = siteMetadata?.linkedin ? `LinkedIn: ${siteMetadata.linkedin}` : "";
    const site = siteMetadata?.siteUrl ? `Website: ${siteMetadata.siteUrl}` : "";
    return [email, gh, li, site].filter(Boolean).join(" | ") || null;
  }
  return null;
}

function answerCurrentRole(text: string): string | null {
  const t = toSimple(text);
  if (/(current\s+role|what\s+do\s+you\s+do|position|title)/.test(t)) {
    const role = siteMetadata?.description || "Engineer";
    const latest = EXPERIENCE[EXPERIENCE.length - 1];
    if (latest) {
      return `Current role: ${latest.title} (${latest.date}). Title summary: ${role}.`;
    }
    return `Title: ${role}.`;
  }
  return null;
}

function answerResumeLink(text: string): string | null {
  const t = toSimple(text);
  if (/(resume|cv)\s+(link|pdf|url)/.test(t)) {
    const url = `${siteMetadata.siteUrl}/Prasanna_Loganathan.pdf`;
    return `You can view the resume at: ${url}`;
  }
  return null;
}

function answerExperience(text: string): string | null {
  const t = toSimple(text);
  if (!/(experience|work|company|role|job)/.test(t)) return null;
  const items = EXPERIENCE.slice(0, 3).map(e => `${e.title} @ ${e.organisation?.name ?? e.company ?? ""}`);
  return `Recent experience: ${items.join("; ")}. Ask for more details or open the resume.`;
}

export function greetMessage() {
  const r = getResumeData();
  const topSkills = r.technicalSkillsGroups[0]?.skills.slice(0, 3).join(", ") || "modern web and AI tools";
  const intro = `Hi there 👋 I’m your portfolio assistant. I can help you explore projects, skills, and experience; open the contact form; switch themes; or navigate around. I work with ${topSkills} and more. What would you like to do first? ✨`;
  return intro;
}

export function localAssistant(messages: Message[]): ToolCall {
  const lastUser = messages.slice().reverse().find(m => m.role === "user");
  const text = lastUser?.content ?? "";

  // Greetings / small talk
  if (/^(hi|hello|hey|yo|hola|hai|haii|hey there)[!.\s]*$/i.test(text)) {
    return { type: "text", text: greetMessage() };
  }

  // Try tool intents first
  const tool =
    detectContact(text) ||
    detectTheme(text) ||
    detectNavigate(text) ||
    detectScroll(text) ||
    detectFilterProjects(text) ||
    detectOpenResume(text) ||
    detectCopyEmail(text) ||
    detectShareProject(text);
  if (tool) return tool;

  // Then concise answers from local data
  const id = answerIdentity(text);
  if (id) return { type: "text", text: id };
  const yrs = answerExperienceYears(text);
  if (yrs) return { type: "text", text: yrs };
  const pCount = answerProjectsCount(text);
  if (pCount) return { type: "text", text: pCount };
  const sCount = answerSkillsCounts(text);
  if (sCount) return { type: "text", text: sCount };
  const contact = answerContactInfo(text);
  if (contact) return { type: "text", text: contact };
  const currentRole = answerCurrentRole(text);
  if (currentRole) return { type: "text", text: currentRole };
  const resumeLink = answerResumeLink(text);
  if (resumeLink) return { type: "text", text: resumeLink };
  const p = answerProjects(text);
  if (p) return { type: "text", text: p };
  const s = answerSkills(text);
  if (s) return { type: "text", text: s };
  const ex = answerExperience(text);
  if (ex) return { type: "text", text: ex };

  // Default help message
  return {
    type: "text",
    text:
      "I can help you explore this portfolio: open the contact form, switch theme, navigate to pages, scroll to sections, or filter projects by tech (e.g., 'show React projects'). Would you like to see recent projects, open the resume, or contact? 🙂",
  };
}
