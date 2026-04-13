import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

import ContactCTA from "./_home/ContactCTA";
import ExperiencePreview from "./_home/ExperiencePreview";
import FeaturedProjects from "./_home/FeaturedProjects";
import Hero from "./_home/Hero";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExperiencePreview />
        <FeaturedProjects />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
