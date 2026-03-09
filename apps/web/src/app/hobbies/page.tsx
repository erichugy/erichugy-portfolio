import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { HOBBIES } from "@/data/hobbies";

export const metadata = {
  title: "Hobbies & Interests | Eric Huang",
  description:
    "Beyond code — rock climbing, photography, open source, and AI research.",
};

export default function HobbiesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="px-6 pt-32 pb-20 md:pt-40 md:pb-28 bg-page">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-sm text-muted tracking-wide mb-3">
              {"// beyond_code"}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6">
              Hobbies &amp; Interests
            </h1>
            <p className="text-base md:text-lg text-body leading-relaxed">
              When I&apos;m not writing code, you&apos;ll find me solving
              problems on the climbing wall, chasing golden hour with a camera,
              or diving into the latest AI research.
            </p>
          </div>
        </section>

        {/* Hobbies Grid */}
        <section className="px-6 py-20 md:py-28 bg-page-alt">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-sm text-muted tracking-wide mb-3">
              {"// what_i_enjoy"}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-3">
              Things I Love
            </h2>
            <p className="text-base md:text-lg text-muted max-w-2xl mb-12">
              A mix of physical challenges, creative outlets, and technical
              rabbit holes that keep me curious.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOBBIES.map((hobby) => (
                <div
                  key={hobby.title}
                  className="card-glow bg-card rounded-xl border border-border p-6 shadow-[0_2px_8px_rgba(12,27,33,0.06)] flex flex-col gap-5"
                >
                  {/* Gradient header with icon */}
                  <div
                    className={`w-full h-24 rounded-lg bg-gradient-to-br ${hobby.gradient} flex items-center justify-center`}
                  >
                    <span
                      className="text-5xl leading-none"
                      role="img"
                      aria-label={hobby.title}
                    >
                      {hobby.icon}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold text-heading">
                      {hobby.title}
                    </h3>
                    <p className="text-sm text-body leading-relaxed">
                      {hobby.description}
                    </p>

                    <ul className="flex flex-col gap-2 mt-1">
                      {hobby.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-sm text-muted flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5 shrink-0">
                            &bull;
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Note */}
        <section className="px-6 py-20 md:py-28 bg-page">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-sm text-muted tracking-wide mb-3">
              {"// a_note"}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-6">
              Why It Matters
            </h2>
            <p className="text-base md:text-lg text-body leading-relaxed mb-4">
              I believe the best engineers bring more than technical skills to
              the table. Climbing teaches me patience and creative
              problem-solving. Photography sharpens my eye for detail and
              composition. Tinkering with open source and AI keeps my curiosity
              alive.
            </p>
            <p className="text-base md:text-lg text-body leading-relaxed">
              These interests shape how I approach software — with persistence,
              an appreciation for craft, and a genuine love for learning
              something new every day.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
