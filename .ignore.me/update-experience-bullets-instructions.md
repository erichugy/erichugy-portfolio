# Update Experience Bullets

## Objective
Replace the current experience and project bullet points with the improved versions provided by Eric. Keep the existing timeline/card UI intact and update the shared data source so the experience page reflects the new wording everywhere it is rendered.

## Base Branch
`main`

## Monorepo / Project Structure
- Web app lives in `apps/web`
- Shared experience content lives in `apps/web/src/data/about.ts`
- The experience UI reads from `WORK_EXPERIENCES` in that file

## Current State
Relevant source:

`apps/web/src/data/about.ts`
```ts
export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: "Botpress",
    position: "Software Developer Intern",
    duration: "Jan 2026 - Present",
    description:
      "Building integrations and developer tooling for the Botpress conversational AI platform.",
    techStack: ["TypeScript", "Node.js", "Bun", "Zod", "Slack API"],
    highlights: [
      "Built an Odoo ERP integration, creating REST endpoints and exposing ERP entities as dynamic bot knowledge; supported $200K+ in enterprise pipeline.",
      "Extended the Slack integration with cross-channel routing and state correlation, enabling multi-legged conversations with in-thread response reconciliation.",
      "Built an ADK-based Slack bot that auto-logs ~10 integration requests/week, improving traceability and cutting support-channel noise.",
      "Hardened the public Botpress ADK CLI (~400 weekly downloads) and refined agent-skill files for Claude Code/LLM workflows.",
    ],
  },
  {
    company: "LIDD Consultants",
    position: "Software Developer",
    duration: "May 2023 - Dec 2025",
    description:
      "Built custom ERP solutions and automated enterprise workflows for supply chain and logistics clients.",
    techStack: ["JavaScript", "HTML/CSS", "NetSuite", "REST APIs", "SQL"],
    highlights: [
      "Automated 20+ accounting and order-to-cash workflows via custom NetSuite pages and Map/Reduce pipelines, processing 100 orders/min.",
      "Integrated NetSuite with WMS/TMS platforms via REST APIs and data contracts, doubling fulfillment throughput.",
      "Refactored inefficient JOIN operations and implemented query caching, reducing lookup latency by 65% (~800ms).",
      "Cut reporting time by 50% through automated custom NetSuite web pages.",
    ],
  },
  {
    company: "McGill University",
    position: "Researcher",
    duration: "Sep 2024 - Dec 2024",
    description:
      "Researched distributed deep reinforcement learning for path-finding in dynamic environments.",
    techStack: ["Python", "PyTorch", "RLlib", "IMPALA", "A3C"],
    highlights: [
      "Architected a distributed path-finding system using IMPALA and RLlib; proposed a hybrid A*/RL framework for global navigation with local collision avoidance.",
      "Developed a 'Revolving Mini-Batch' training strategy that eliminated catastrophic forgetting and enabled generalization across distinct obstacle layouts.",
    ],
  },
];
```

`apps/web/src/components/WorkExperience.tsx`
```tsx
{[exp.description, ...exp.highlights].map((text, i) => (
  <li key={i} className="flex items-start gap-2 text-sm text-body">
    <span className="text-accent mt-1 flex-shrink-0">&bull;</span>
    <span>{text}</span>
  </li>
))}
```

## Tasks
1. Update `apps/web/src/data/about.ts` to replace the Botpress, LIDD Consultants, McGill University, Hack4Impact McGill - Welcome Collective, and Turing Poker Bot bullets with the new copy.
2. Keep the existing render pattern in `apps/web/src/components/WorkExperience.tsx`; do not change the UI unless needed to support the new copy.
3. Verify the content fits the current schema and does not introduce duplicate or malformed strings.

## Design / Constraints
- Preserve the existing experience card structure and timeline interaction.
- Keep content centralized in `apps/web/src/data/about.ts` so the same data feeds both the experience page and any other consumers.
- Use ASCII punctuation where possible.
- Avoid creating new files or abstractions for this change.

## Naming Decisions
- No new runtime files are needed.
- If any temporary scratch notes are created, keep them under `.ignore.me/` and use descriptive names like `update-experience-bullets-instructions.md`.

## Multi-Agent Setup
- Not required for this small content update.
- If a reviewer is used, they should focus on `apps/web/src/data/about.ts` and confirm the updated bullets render correctly through `apps/web/src/components/WorkExperience.tsx`.
