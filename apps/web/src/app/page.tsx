import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

import ContactCTA from "./home/ContactCTA";
import ExperiencePreview from "./home/ExperiencePreview";
import FeaturedProjects from "./home/FeaturedProjects";
import Hero from "./home/Hero";

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
