import Link from "next/link";

import TechPill from "@/components/TechPill";
import type { Project } from "@/data/projects";
import { isExternalHref } from "@/utils/url";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card-glow flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_2px_8px_rgba(12,27,33,0.06)]">
      <div
        className={`flex h-40 items-center justify-center text-5xl ${project.imageBackgroundClassName}`}
        aria-hidden="true"
      >
        {project.emoji ? (
          <span className="select-none opacity-80 drop-shadow-md">
            {project.emoji}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-heading">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-body">
          {project.longDescription}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={project.primaryCtaHref}
            className="inline-flex items-center justify-center rounded-[10px] bg-accent px-5 py-2 text-sm font-semibold text-accent-text transition-all hover:bg-accent-hover hover:shadow-md"
            {...(isExternalHref(project.primaryCtaHref)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {project.primaryCtaLabel}
          </Link>

          {project.secondaryCtaLabel && project.secondaryCtaHref ? (
            <Link
              href={project.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-[10px] border border-border bg-page px-5 py-2 text-sm font-medium text-heading transition-all hover:bg-card hover:shadow-sm"
              {...(isExternalHref(project.secondaryCtaHref)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {project.secondaryCtaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
