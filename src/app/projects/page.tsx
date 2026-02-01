import Navbar from "../components/navbar";
import { Highlights } from "../components/highlights/highlights";
import Footer from "../components/footer";

export default function ProjectsPage() {
  return (
    <main className="container-page">
      <Navbar />

      <section
        className="hero text-center flex flex-col items-center"
        aria-label="projects"
      >
        <h1 className="hero__title">Projects</h1>
        <p className="hero__desc">
          A few things I&apos;ve built. My main skills include web development,
          UI/UX design, cloud architecture, writing, and more.🥷
        </p>
      </section>

      <section className="highlights" aria-label="highlights">
        <Highlights />
      </section>

      <Footer />
    </main>
  );
}
