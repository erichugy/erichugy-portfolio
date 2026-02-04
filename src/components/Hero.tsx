import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="px-6 py-8 md:py-12 lg:py-16 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight">
              Hello, I'm{" "}
              <span className="text-accent">Eric Huang</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-heading font-semibold">
              Software Developer
            </h2>

            <p className="text-lg text-body leading-relaxed max-w-lg">
              Welcome! I build full-stack apps, AI integrations, and scalable
              backend systems. Let's create something great together.
            </p>

            <a
              href="https://github.com/erichugy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg transition-colors font-medium text-lg inline-block"
            >
              View My Work
            </a>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              {/* Placeholder for illustration - using logo as placeholder for now */}
              <div className="relative aspect-square flex items-center justify-center">
                <Image
                  src="/me.png"
                  alt="Portfolio illustration"
                  width={250}
                  height={250}
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
