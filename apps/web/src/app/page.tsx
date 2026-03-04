import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MobileNavigation from "@/components/MobileNavigation";

export default function Page() {
  return (
    <>
      <Navbar />
      <MobileNavigation />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
