import Navbar from "../components/navbar";
import { Highlights } from "../components/highlights/highlights";

export default function ProjectsPage() {
  return (
    <main className="container-page">
      <Navbar />

      <section className="hero" aria-label="projects">
        <h1 className="hero__title">Projects</h1>
        <p className="hero__desc">A few things I’ve built.</p>
      </section>

      <section className="highlights" aria-label="highlights">
        <Highlights />
      </section>

      <footer className="footer">
        <div className="footer__links">
          <a href="#">↗ rss</a>
          <a href="#">↗ github</a>
          <a href="#">↗ view source</a>
        </div>
      </footer>
    </main>
  );
}
