export type UserMessage = { role: "user"; content: string };
export type AssistantMessage = { role: "assistant"; content: string };
export type ChatMessage = UserMessage | AssistantMessage;

export type ToolCall =
  | { type: "text"; text: string }
  | { type: "tool"; name: "open_contact"; args: {} }
  | { type: "tool"; name: "navigate"; args: { page: "home" | "projects" | "about" | "resume" } }
  | { type: "tool"; name: "scroll_to"; args: { id: string } }
  | { type: "tool"; name: "filter_projects"; args: { tag: string } }
  | { type: "tool"; name: "toggle_theme"; args: { mode: "light" | "dark" | "system" } }
  | { type: "tool"; name: "open_resume"; args: {} }
  | { type: "tool"; name: "copy_email"; args: {} }
  | { type: "tool"; name: "share_project"; args: { name: string } };
