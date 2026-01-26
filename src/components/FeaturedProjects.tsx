import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "Business Website",
    description: "A professional website designed for a growing company to showcase their services and connect with customers.",
    image: "/inspiration.png", // Placeholder - will use actual project images later
  },
  {
    title: "E-commerce Site",
    description: "A fully functional online store built for a fashion brand with seamless checkout and inventory management.",
    image: "/inspiration.png",
  },
  {
    title: "Portfolio Website",
    description: "A creative and visually appealing portfolio website for a photographer to display their work.",
    image: "/inspiration.png",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="portfolio" className="px-6 py-16 md:py-24 bg-page">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-body max-w-2xl mx-auto">
            Check out some of my recent work.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Project Image */}
              <div className="relative w-full aspect-video bg-border">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-heading mb-2">
                  {project.title}
                </h3>
                <p className="text-body mb-4 leading-relaxed">
                  {project.description}
                </p>
                <button className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors font-medium">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
