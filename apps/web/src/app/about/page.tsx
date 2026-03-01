import Activities from "@/components/Activities";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VolunteerWork from "@/components/VolunteerWork";
import WorkExperience from "@/components/WorkExperience";
import { EDUCATION, LANGUAGES, TECHNICAL_SKILLS } from "@/lib/about-data";

export const metadata = {
  title: "About Me | Eric Huang",
  description:
    "Learn more about my experience, skills, volunteer work, and activities.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero / Intro */}
        <section className="px-6 py-20 md:py-28 bg-page">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column — Bio */}
              <div className="space-y-5">
                <p className="font-mono text-sm text-muted tracking-wide">
                  {">"} about_me
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading">
                  About Me
                </h1>
                <p className="text-base md:text-lg text-body leading-relaxed">
                  Software engineer with experience in applied AI and enterprise
                  full-stack development. Currently building integrations and
                  developer tooling at Botpress, previously automating enterprise
                  workflows at LIDD Consultants.
                </p>
                <p className="text-base md:text-lg text-body leading-relaxed">
                  McGill CS graduate with a minor in Management (3.85 GPA).
                  I enjoy building tools that make developers more productive
                  and systems that scale.
                </p>
              </div>

              {/* Right Column — Skills Card */}
              <div className="card-glow bg-card rounded-xl border border-border p-6 md:p-8 shadow-[0_2px_8px_rgba(12,27,33,0.06)]">
                <h2 className="text-2xl md:text-3xl font-bold text-heading mb-5">
                  My Skills
                </h2>
                <ul className="space-y-3.5">
                  <li className="flex items-center gap-3 text-body text-base">
                    <span className="text-accent text-xl">💻</span>
                    <span>Full Stack Development</span>
                  </li>
                  <li className="flex items-center gap-3 text-body text-base">
                    <span className="text-accent text-xl">🤖</span>
                    <span>AI & Machine Learning</span>
                  </li>
                  <li className="flex items-center gap-3 text-body text-base">
                    <span className="text-accent text-xl">🔗</span>
                    <span>API & ERP Integrations</span>
                  </li>
                  <li className="flex items-center gap-3 text-body text-base">
                    <span className="text-accent text-xl">⚡</span>
                    <span>Developer Tooling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Languages */}
        <section className="px-6 py-20 md:py-28 bg-page-alt">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-sm text-muted tracking-wide mb-3">
              {"// education"}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-10">
              Education & Skills
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Education Card */}
              <div className="card-glow bg-card rounded-xl border border-border p-6 md:p-8 shadow-[0_2px_8px_rgba(12,27,33,0.06)]">
                <h3 className="text-xl font-bold text-heading mb-1">
                  {EDUCATION.school}
                </h3>
                <p className="text-sm text-accent font-mono mb-1">
                  {EDUCATION.degree}
                </p>
                <p className="text-sm text-muted font-mono mb-4">
                  GPA: {EDUCATION.gpa}
                </p>
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {EDUCATION.coursework.map((course) => (
                      <span
                        key={course}
                        className="bg-page text-muted text-xs px-2 py-1 rounded-md font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                    Clubs & Activities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {EDUCATION.clubs.map((club) => (
                      <span
                        key={club}
                        className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-md font-mono"
                      >
                        {club}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Skills + Languages Card */}
              <div className="space-y-6">
                <div className="card-glow bg-card rounded-xl border border-border p-6 md:p-8 shadow-[0_2px_8px_rgba(12,27,33,0.06)]">
                  <h3 className="text-xl font-bold text-heading mb-4">
                    Technical Skills
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(TECHNICAL_SKILLS).map(([category, skills]) => (
                      <div key={category}>
                        <p className="text-xs uppercase tracking-wider text-muted mb-1.5 font-semibold">
                          {category === "dataML" ? "Data / ML" : category === "devOps" ? "DevOps / Tools" : category}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-page text-body text-xs px-2 py-1 rounded-md font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-glow bg-card rounded-xl border border-border p-6 shadow-[0_2px_8px_rgba(12,27,33,0.06)]">
                  <h3 className="text-lg font-bold text-heading mb-3">
                    Languages
                  </h3>
                  <div className="space-y-2">
                    {LANGUAGES.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <span className="text-body text-sm font-medium">
                          {lang.name}
                        </span>
                        <span className="text-muted text-xs font-mono">
                          {lang.level} — {lang.details}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="/Eric_Huang_Software-can.pdf"
                  download
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-accent-text px-5 py-2.5 rounded-[10px] transition-all hover:shadow-md font-semibold text-sm w-full"
                >
                  📄 Download Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Timeline */}
        <WorkExperience />

        {/* Volunteer Work */}
        <VolunteerWork />

        {/* Activities & Interests */}
        <Activities />
      </main>
      <Footer />
    </>
  );
}
