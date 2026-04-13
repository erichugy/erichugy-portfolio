import type { ReactNode } from "react";

type CollapsibleSectionProps = {
  children: ReactNode;
  collapsed: boolean;
  onToggle: () => void;
  title: string;
};

export function CollapsibleSection({
  children,
  collapsed,
  onToggle,
  title,
}: CollapsibleSectionProps): ReactNode {
  return (
    <section>
      <button
        type="button"
        className="rb-collapse-toggle"
        onClick={onToggle}
        aria-expanded={!collapsed}
      >
        <span className={`rb-chevron${collapsed ? "" : " rb-chevron-open"}`}>
          ▶
        </span>
        <h2>{title}</h2>
      </button>
      <div
        className={`rb-collapse-content${
          collapsed ? " rb-collapse-content-closed" : " rb-collapse-content-open"
        }`}
      >
        <div className="rb-collapse-inner">{children}</div>
      </div>
    </section>
  );
}
