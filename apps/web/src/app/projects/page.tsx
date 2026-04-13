import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import WorkInProgress from "@/components/WorkInProgress";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-page">
        <WorkInProgress />
      </main>
      <Footer />
    </>
  );
}
