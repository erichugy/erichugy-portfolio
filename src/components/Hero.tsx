import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-6 py-16 md:py-24 lg:py-32 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight">
              Hello, I'm{" "}
              <span className="text-accent">Eric Huang</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-heading font-semibold">
              Full Stack Developer
            </h2>

            <p className="text-lg text-body leading-relaxed max-w-lg">
              I'm a full stack developer with a passion for building efficient,
              user-friendly websites and applications. Let's work together to
              bring your vision to life.
            </p>

            <button className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg transition-colors font-medium text-lg">
              View My Work
            </button>
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
