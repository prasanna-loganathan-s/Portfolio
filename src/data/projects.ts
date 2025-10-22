import { type ProjectCardProps } from "@/components/projects/project-card";
import { type ProjectShowcaseListItem } from "@/components/projects/project-showcase-list";

export const PROJECT_SHOWCASE: ProjectShowcaseListItem[] = [
  {
    index: 0,
    title: "Personal Portfolio Website",
    href: "/projects",
    tags: [
      "ReactJS",
      "Nextjs",
      "Styled Components",
      "Scss",
      "GraphQL",
      "Microservices",
      "Payment Gateway",
    ],
    image: {
      LIGHT: "/images/projects/portfolio1.png",
      DARK: "/images/projects/portfolio1.png",
    },
  },
  {
    index: 1,
    title: "AI agent (chatbot)",
    href: "/projects",
    tags: [
      "Python",
      "LangChain",
      "CrewAI",
      "Bedrock AI",
      "n8n",
    ],
    image: {
      LIGHT: "/images/projects/ai_agent_1.png",
      DARK: "/images/projects/ai_agent_1.png",
    },
  },
  {
    index: 2,
    title: "3D Modeling",
    href: "/projects",
    tags: ["Blender", "Maya", "3D Modeling", "Animation"],
    image: {
      LIGHT: "/images/projects/game_window_3.png",
      DARK: "/images/projects/game_window_3.png",
    },
  },
];

export const PROJECTS_CARD: ProjectCardProps[] = [
  {
    name: "Personal Portfolio Website",
    favicon: "💼",
    imageUrl: [
      "/images/projects/portfolio1.png",
      "/images/projects/portfolio2.png",
      "/images/projects/portfolio3.png",
    ],
    description:
      "A personal portfolio website is a digital platform that showcases an individual's skills, experiences, projects, and achievements. It serves as an online resume and a way to present oneself professionally to potential employers, clients, or collaborators.",
    sourceCodeHref: "", 
    liveWebsiteHref: "",
    category: "Web Development",
    technologies: [
      "React",
      "Next.js",
      "Styled Components",
      "SCSS",
      "GraphQL",
      "Microservices",
    ],
  },
  {
    name: "3D environments building",
    favicon: "💻",
    imageUrl: ["/images/projects/game_window_3.png", "/images/projects/game_window_1.png", "/images/projects/game_window_2.png"],
    description:
      "3D World Building is a project that focuses on creating immersive 3D environments for various applications, including gaming and virtual reality.",
    sourceCodeHref: "",
    liveWebsiteHref: "",
    category: "3D Modeling",
    technologies: ["Blender", "Unity", "Maya", "Unreal Engine"],
  },
  {
    name: "AI agent (chatbot)",
    favicon: "🤖",
    imageUrl: ["/images/projects/ai_agent_1.png"],
    description: "An AI agent (chatbot) is a software application that uses artificial intelligence to simulate human-like conversations and interactions with users.",
    sourceCodeHref: "",
    liveWebsiteHref: "",
    category: "AI Agent",
    technologies: ["Python", "LangChain", "CrewAI", "Bedrock AI", "n8n"],
  },
  {
    name: "2D Game Project",
    favicon: "🎮",
    imageUrl: ["/images/projects/game_1.png", "/images/projects/game_2.png", "/images/projects/game_3.png"],
    description:
      "A 2D game project is a creative endeavor that involves designing and developing a video game with two-dimensional graphics and gameplay mechanics.",
    sourceCodeHref: "",
    liveWebsiteHref: "",
    category: "Game Development",
    technologies: ["Unity", "C#", "Blender", "Photoshop"],
  },
];

export const BLOGS_CARD: ProjectCardProps[] = [
  {
    name: "Understand Debouncing and Throttling in javascript with examples",
    favicon: "📝",
    imageUrl: ["/images/projects/debounce.png"],
    description:
      "In this article, we will discuss and understand debouncing and throttling in javascript, which are very useful when it comes to the performance of a website.",
    sourceCodeHref: "",
    liveWebsiteHref: "",
    category: "Blog",
    technologies: ["JavaScript", "Performance", "Web Development"],
  },
  {
    name: "How to create your own custom Hooks in React (extensive guide)",
    favicon: "✍",
    imageUrl: ["/images/projects/hooks.png"],
    description:
      "Hooks are reusable functions. When you have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook. Custom Hooks start with 'use'. Example...",
    sourceCodeHref: "",
    liveWebsiteHref: "",
    category: "Blog",
    technologies: ["React", "Hooks", "JavaScript"],
  },
  {
    name: "10 Important productivity tools to make developer life easier 👨‍💻👨‍💻",
    favicon: "📝",
    imageUrl: ["/images/projects/tools.png"],
    description:
      "Developing is not only about getting your device and start coding directly for all day long. Right tools & guidance is all we need. If you're a developer these tools will definitely make your life hassle free. Let's dive in !!",
    sourceCodeHref: "",
    liveWebsiteHref: "",
    category: "Blog",
    technologies: ["Productivity", "Developer Tools", "Workflow"],
  },
  {
    name: "map, filter, reduce functions in JavaScript made easy 🔥",
    favicon: "✍",
    imageUrl: ["/images/projects/filter.png"],
    description: `Let's understand some important functions of them, that are "map", "filter" and "reduce". You definitely have heard about them. You probably know about them. But are they still confusing to you? Let's make them beautifully more clearer to you via beautiful examples.`,
    sourceCodeHref: "",
    liveWebsiteHref: "",
    category: "Blog",
    technologies: ["JavaScript", "Array Methods", "Functional Programming"],
  },
];
