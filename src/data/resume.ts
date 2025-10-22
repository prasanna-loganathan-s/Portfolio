// Centralized resume data extracted from the ResumeDisplay component.
// This keeps the component lean and enables reuse (e.g. API routes, sitemap, JSON download, etc.).

// No React component usage here to keep this file usable in non-React contexts (e.g. server).

// Types
export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface ProjectItem {
  name: string;
  technologies: string[];
  achievements: string[];
}

export interface EducationItem {
  institution: string;
  program: string;
  duration: string;
  location: string;
  subjects: string[];
}

export type ExploreLinkIcon = "code" | "user" | "award" | "briefcase";
export interface ExploreLink {
  href: string;
  iconName: ExploreLinkIcon;
  label: string;
  description: string;
}

export interface ResumeData {
  technicalSkillsGroups: SkillGroup[];
  experience: ExperienceItem[];
  featuredProjects: ProjectItem[];
  education: EducationItem[];
  exploreLinks: ExploreLink[];
}

// Data
const technicalSkillsGroups: SkillGroup[] = [
  {
    category: "Languages & Databases",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "Dart",
      "MongoDB",
    ],
  },
  {
    category: "AI/ML",
    skills: [
      "Gemini AI",
      "Prompt Engineering",
      "LangChain",
    ],
  },
  {
    category: "Full Stack Development",
    skills: [
      "ReactJS",
      "NodeJs",
      "NextJs",
    ],
  },
  {
    category: "DevOps",
    skills: [
      "Google Cloud",
      "GitHub Actions",
    ],
  },
  {
    category: "Creative Tools",
    skills: [
      "Adobe Photoshop",
      "Canva",
      "Premiere Pro",
      "CapCut",
      "Figma",
    ],
  },
  {
    category: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Gemini Studio",
      "Figma",
      "Canva",
      "Photoshop",
      "Blender",
      "VS Code",
      "AgentScope",
      "OpenAI Playground",
      "Docker Desktop",
      "n8n",
    ],
  },
];

const experience: ExperienceItem[] = [
  {
    company: "Game Modeling Assets - Freelance",
    role: "3D Modeler & Animator",
    period: "Jan 2024 – Present",
    location: "Remote",
    achievements: [
      "Created and sold 50+ high-quality 3D game assets (characters, props, environments) on platforms like Unity Asset Store and CGTrader, generating $5,000+ in revenue.",
      "Collaborated with indie game developers to design custom 3D models and animations, enhancing their game projects and improving visual appeal.",
      "Utilized Blender and Maya to create optimized 3D assets, ensuring compatibility with popular game engines like Unity and Unreal Engine.",
    ],
  },
];

const featuredProjects: ProjectItem[] = [
  {
    name: "AI Agent video editor and generator",
    technologies: [
      "Python",
      "MCP",
      "LLaMa",
      "Streamlit",
      "Nvidia NIM",
      "Ollama",
      "Azure Open AI",
      "Open AI",
    ],
    achievements: [
      "Developed an AI-powered video editing and generation tool using LLMs (LLaMa, MCP) and Azure OpenAI, enabling users to create and edit videos through natural language prompts, reducing editing time by 40%.",
      "Integrated advanced video processing capabilities with Streamlit for an intuitive user interface, allowing users to generate high-quality videos with minimal effort.",
      "Implemented GPU acceleration using Nvidia NIM, significantly enhancing video rendering speeds and overall performance.",
    ],
  },
  {
    name: "AI-Driven Jira Reporter (ADJR)",
    technologies: [
      "Node JS",
      "Fast API",
      "Nvidia NIM",
      "Ollama",
      "Azure Open AI",
      "Open AI",
      "Jira API",
    ],
    achievements: [
      "Developed & integrated 2 APIs in a Microservice for automating daily scrum report generation from Jira, enhancing team efficiency by 30% through AI-driven insights & automated scheduling with Dockerized deployment.",
    ],
  },
  {
    name: "AI Based Game",
    technologies: [
      "Node JS",
      "Fast API",
      "Nvidia NIM",
      "Ollama",
      "Azure Open AI",
      "Open AI",
      "Jira API",
    ],
    achievements: [
      "Developed an AI-based game using Unity and C#, incorporating procedural content generation and adaptive AI behaviors to create a dynamic gaming experience, resulting in a 25% increase in player engagement.",
      "Implemented machine learning algorithms to enhance NPC decision-making, providing a more immersive and challenging gameplay environment.",
      "Collaborated with a team of designers and developers to integrate AI features seamlessly into the game, ensuring optimal performance across various platforms.",
    ],
  },
];

const education: EducationItem[] = [
  {
    institution: "Anna University",
    program: "B.Tech - artificial intelligence and data science",
    duration: "2023 – 2027",
    location: "Tamilnadu, India",
    subjects: [
      "Database management",
      "Data analysis",
      "AI Agents",
      "Data Structures",
      "Algorithms",
    ],
  },
];

const exploreLinks: ExploreLink[] = [
  {
    href: "/projects",
    iconName: "code",
    label: "Projects",
    description: "View my latest work",
  },
  {
    href: "/about",
    iconName: "user",
    label: "About Me",
    description: "Learn more about me",
  },
  {
    href: "/#skills",
    iconName: "award",
    label: "Skills",
    description: "Technical expertise",
  },
  {
    href: "/about#experience",
    iconName: "briefcase",
    label: "Experience",
    description: "Professional journey",
  },
];

const resumeData: ResumeData = {
  technicalSkillsGroups,
  experience,
  featuredProjects,
  education,
  exploreLinks,
};

export function getResumeData(): ResumeData {
  return resumeData;
}

export default resumeData;
