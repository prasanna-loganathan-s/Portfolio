import {
  SiExpress,
  SiNextdotjs,
  SiGithub,
  SiOpenai,
  SiSpringboot,
  SiPhp,
  SiVercel,
} from "react-icons/si";
import { type SkillsShowcaseProps } from "@/components/skills/skills-showcase";
import JavascriptSvg from "@/assets/icons/javascript.svg";
import TypescriptSvg from "@/assets/icons/typescript.svg";
import NodeSvg from "@/assets/icons/nodejs.svg";
import ReactjsSvg from "@/assets/icons/reactjs.svg";
import FlutterSvg from "@/assets/icons/Flutter.svg";
import TailwindcssSvg from "@/assets/icons/tailwindcss.svg";
import PythonSvg from "@/assets/icons/python.svg";
import MongoDBSvg from "@/assets/icons/mongodb.svg";
import GitSvg from "@/assets/icons/git.svg";
import PostmanSvg from "@/assets/icons/postman.svg";
import BlenderSvg from "@/assets/icons/blender.svg";
import MayaSvg from "@/assets/icons/maya.svg";
import UnrealEngineSvg from "@/assets/icons/unreal-engine.svg";
import UnitySvg from "@/assets/icons/unity.svg";
import AutodeskSvg from "@/assets/icons/autodesk.svg";
import AdobeSvg from "@/assets/icons/adobe.svg";
import AuthSvg from "@/assets/icons/auth0.svg";
import DartSvg from "@/assets/icons/dart.svg";
import FirebaseSvg from "@/assets/icons/firebase.svg";
import FastSvg from "@/assets/icons/fastapi.svg";
import MysqlSvg from "@/assets/icons/mysql.svg";
import JavaSvg from "@/assets/icons/java.svg";
import AzureAiSvg from "@/assets/icons/azureai.svg";
import LLaMaSvg from "@/assets/icons/llama.svg";
import PromptSvg from "@/assets/icons/prompt.svg";
import LangSvg from "@/assets/icons/langchain-seeklogo.svg";
import DockerSvg from "@/assets/icons/docker.svg";
import GithubactionsSvg from "@/assets/icons/actions.svg";
import MaxSvg from "@/assets/icons/3dsmax.svg";
import JenkinsSvg from "@/assets/icons/jenkins.svg";
import KubernetesSvg from "@/assets/icons/kubernetes.svg";
import ApimSvg from "@/assets/icons/api-management.svg";
import ADevOpsSvg from "@/assets/icons/devops.svg";
import JiraSvg from "@/assets/icons/jira.svg";}},{
import NpmSvg from "@/assets/icons/npm.svg";
import SwaggerSvg from "@/assets/icons/swagger.svg";
import PiSvg from "@/assets/icons/pi.svg";
import ArduinoSvg from "@/assets/icons/arduino.svg";

export const SKILLS_DATA: SkillsShowcaseProps["skills"] = [
  {
    sectionName: "Fullstack & Databases",
    skills: [
      {
        name: "React",
        icon: ReactjsSvg,
      },
      {
        name: "Nextjs",
        icon: SiNextdotjs,
      },
      {
        name: "Nodejs",
        icon: NodeSvg,
      },
      {
        name: "FastAPI",
        icon: FastSvg,
      },
      {
        name: "MongoDB",
        icon: MongoDBSvg,
      },
      {
        name: "MySql",
        icon: MysqlSvg,
      },
    ],
  },
  {
    sectionName: "AI/ML",
    skills: [
      {
        name: "OpenAI",
        icon: SiOpenai,
      },
      {
        name: "LLaMa AI",
        icon: LLaMaSvg,
      },
      {
        name: "Prompt Engineering",
        icon: PromptSvg,
      },
      {
        name: "LangChain",
        icon: LangSvg,
      },
    ],
  },
  {
    sectionName: "DevOps",
    skills: [
      {
        name: "Docker",
        icon: DockerSvg,
      },
      {
        name: "GitHub Actions",
        icon: GithubactionsSvg,
      },
      {
        name: "API Gateway",
        icon: ApimSvg,
      },
    ],
  },
  {
    sectionName: "Tools & Cloud Platforms",
    skills: [
      {
        name: "Git",
        icon: GitSvg,
      },
      {
        name: "Github",
        icon: SiGithub,
      },
      {
        name: "Jira",
        icon: JiraSvg,
      },
      {
        name: "Postman",
        icon: PostmanSvg,
      },
      {
        name: "Blender",
        icon: BlenderSvg,
      },
      {
        name: "Maya",
        icon: MayaSvg,
      },
      {
        name: "Unreal Engine",
        icon: UnrealEngineSvg,
      },
      {
        name: "Unity",
        icon: UnitySvg,
      },
      {
        name: "Adobe",
        icon: AdobeSvg,
      },
      {
        name: "3ds Max",
        icon: MaxSvg,
      },
    ],
  },
  {
    sectionName: "Languages",
    skills: [
      {
        name: "Javascript",
        icon: JavascriptSvg,
      },
      {
        name: "Java",
        icon: JavaSvg,
      },
      {
        name: "Python",
        icon: PythonSvg,
      },
    ],
  },
];
