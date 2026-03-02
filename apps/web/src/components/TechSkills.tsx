"use client";

import { TECHNICAL_SKILLS } from "@/lib/about-data";
import { IconType } from "react-icons";
import {
  SiBun,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import { TbChartLine } from "react-icons/tb";
import { VscAzureDevops } from "react-icons/vsc";

const SKILL_ICONS: Record<string, IconType> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  Bash: SiGnubash,
  "HTML/CSS": SiHtml5,
  "Node.js": SiNodedotjs,
  Bun: SiBun,
  Zod: SiZod,
  Express: SiExpress,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  React: SiReact,
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Pandas: SiPandas,
  Matplotlib: TbChartLine,
  "Scikit-Learn": SiScikitlearn,
  PyTorch: SiPytorch,
  Docker: SiDocker,
  "Azure DevOps": VscAzureDevops,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Jira: SiJira,
  "Unix/Linux": SiLinux,
  PostgreSQL: SiPostgresql,
};

const ALL_SKILLS = Object.values(TECHNICAL_SKILLS).flat();

export default function TechSkills() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {ALL_SKILLS.map((skill) => {
        const Icon = SKILL_ICONS[skill];
        return (
          <div
            key={skill}
            className="bg-card rounded-xl border border-border p-4 flex flex-col items-center gap-2 text-center card-glow shadow-[0_2px_8px_rgba(12,27,33,0.06)]"
          >
            <span className="text-body w-8 h-8 flex items-center justify-center" aria-hidden="true">
              {Icon ? <Icon size={28} /> : <span className="text-lg font-mono font-bold">{skill[0]}</span>}
            </span>
            <span className="text-xs font-mono text-body">{skill}</span>
          </div>
        );
      })}
    </div>
  );
}
