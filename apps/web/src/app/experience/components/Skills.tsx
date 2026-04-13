import SkillsBubbleCanvas from "./SkillsBubbleCanvas";
import TechSkills from "./TechSkills";

export default function Skills() {
  return (
    <section className="px-6 py-20 md:py-28 bg-page-alt">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-sm text-muted tracking-wide mb-3">
          {"// skills"}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-10">
          Skills
        </h2>
        <div className="hidden md:block">
          <SkillsBubbleCanvas />
        </div>
        <div className="md:hidden">
          <TechSkills />
        </div>
      </div>
    </section>
  );
}
