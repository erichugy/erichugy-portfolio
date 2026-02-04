export default function About() {
  return (
    <section id="about" className="px-6 py-16 md:py-24 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Me */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading">
              About Me
            </h2>
            <p className="text-lg text-body leading-relaxed">
              I'm a Software Developer with a Computer Science degree from McGill
              University. I'm passionate about building full-stack applications
              that solve real business problems, from AI-powered integrations to
              scalable enterprise systems.
            </p>
            <p className="text-lg text-body leading-relaxed">
              My experience spans ERP system development, distributed machine
              learning research, and data engineering. I've built high-throughput
              order pipelines, automated accounting workflows, and contributed to
              non-profit logistics platforms through Hack4Impact.
            </p>
          </div>

          {/* Right Column - Skills Card */}
          <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
              My Skills
            </h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">💻</span>
                <span>Full-Stack Development (React, Node, TypeScript)</span>
              </li>
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">🗄️</span>
                <span>Database & API Design (PostgreSQL, REST)</span>
              </li>
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">🤖</span>
                <span>Machine Learning (RayLib, PyTorch, Scikit-Learn)</span>
              </li>
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">☁️</span>
                <span>Cloud & DevOps (Docker, AWS, Azure)</span>
              </li>
            </ul>
            <a
              href="/Eric_Huang_Software.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors font-medium w-full block text-center"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
