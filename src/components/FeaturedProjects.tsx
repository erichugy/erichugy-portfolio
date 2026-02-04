import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Welcome Collective",
    description:
      "A logistics management web app for a non-profit, optimizing pickup and delivery routes to serve over 100 clients daily.",
    image: "/project-welcome-collective.png",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    link: '',
  },
  {
    title: "123Loadboard - CodeJams",
    description:
      "A recommendation algorithm for truck drivers to optimize deliveries and maximize profit using predictive ML models.",
    image: "/project-loadboard.png",
    tags: ["Python", "Flutter", "Scikit-Learn", "FastAPI"],
    link: '',
  },
  {
    title: "Stroke Prediction AI",
    description:
      "An AI program using TensorFlow and machine learning to predict stroke likelihood from patient health data.",
    image: "/project-stroke-ai.png",
    tags: ["Python", "TensorFlow", "Pandas", "ML"],
    link: '',
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
                <p className="text-body mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-border text-body px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors font-medium inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
