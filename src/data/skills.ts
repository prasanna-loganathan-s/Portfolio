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
import JavascriptSvg from "@/public/icons/javascript.svg";
import TypescriptSvg from "@/public/icons/typescript.svg";
import NodeSvg from "@/public/icons/nodejs.svg";
import ReactjsSvg from "@/public/icons/reactjs.svg";
import FlutterSvg from "@/public/icons/Flutter.svg";
import TailwindcssSvg from "@/public/icons/tailwindcss.svg";
import PythonSvg from "@/public/icons/python.svg";
import AzureSvg from "@/public/icons/azure.svg";
import MongoDBSvg from "@/public/icons/mongodb.svg";
import GitSvg from "@/public/icons/git.svg";
import PostmanSvg from "@/public/icons/postman.svg";
import BlenderSvg from "@/public/icons/blender.svg";
import MayaSvg from "@/public/icons/maya.svg";
import UnrealEngineSvg from "@/public/icons/unreal-engine.svg";
import UnitySvg from "@/public/icons/unity.svg";
import AutodeskSvg from "@/public/icons/autodesk.svg";
import AdobeSvg from "@/public/icons/adobe.svg";
import AuthSvg from "@/public/icons/auth0.svg";
import DartSvg from "@/public/icons/dart.svg";
import FirebaseSvg from "@/public/icons/firebase.svg";
import FastSvg from "@/public/icons/fastapi.svg";
import MysqlSvg from "@/public/icons/mysql.svg";
import JavaSvg from "@/public/icons/java.svg";
import AzureAiSvg from "@/public/icons/azureai.svg";
import LLaMaSvg from "@/public/icons/llama.svg";
import PromptSvg from "@/public/icons/prompt.svg";
import LangSvg from "@/public/icons/langchain-seeklogo.svg";
import CiCdSvg from "@/public/icons/cicd.svg";
import DockerSvg from "@/public/icons/docker.svg";
import GithubactionsSvg from "@/public/icons/actions.svg";
import MaxSvg from "@/public/icons/3dsmax.svg";
import JenkinsSvg from "@/public/icons/jenkins.svg";
import KubernetesSvg from "@/public/icons/kubernetes.svg";
import ApimSvg from "@/public/icons/api-management.svg";
import ADevOpsSvg from "@/public/icons/devops.svg";
import JiraSvg from "@/public/icons/jira.svg";
import NpmSvg from "@/public/icons/npm.svg";
import SwaggerSvg from "@/public/icons/swagger.svg";
import PiSvg from "@/public/icons/pi.svg";
import ArduinoSvg from "@/public/icons/arduino.svg";

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
