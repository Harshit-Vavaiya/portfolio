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
        <h2 className="hero__title">Tools and Technologies</h2>
        <p className="hero__desc">
          ReactJS, TypeScript, Next.js, Tailwind CSS, Python, Node.js, Express,
          MongoDB, Git, Docker, Kubernetes, UI/UX, Three.js, GSAP, Visual
          Design, System Design.
        </p>
        <div className="h-[20px] my-10"></div>
        <h1 className="hero__title">Projects</h1>
        <p className="hero__desc">A few things I&apos;ve built.</p>
      </section>

      <section className="highlights" aria-label="highlights">
        <Highlights />
      </section>

      <Footer />
    </main>
  );
}
