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
              I&apos;m a passionate full stack developer with experience creating custom
              websites and applications. I specialize in responsive design,
              front-end development, and building sites that are both beautiful
              and functional.
            </p>
            <p className="text-lg text-body leading-relaxed">
              With a strong foundation in computer science and a keen eye for
              detail, I bring ideas to life through clean code and thoughtful
              user experiences.
            </p>
          </div>

          {/* Right Column - Skills Card */}
          <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
              My Skills
            </h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">🎨</span>
                <span>Web Design</span>
              </li>
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">💻</span>
                <span>Front-End Development</span>
              </li>
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">📱</span>
                <span>Responsive Design</span>
              </li>
              <li className="flex items-center gap-3 text-body text-lg">
                <span className="text-accent text-2xl">⚡</span>
                <span>Performance Optimization</span>
              </li>
            </ul>
            <button className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors font-medium w-full">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
