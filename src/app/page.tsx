import Navbar from "./components/navbar";
import { getAllBlogPosts } from "../lib/blog";

export default function Home() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <main className="container-page">
      <Navbar />

      <section className="hero" aria-label="intro">
        <h1 className="hero__title">Hi, I'm Harshit</h1>
        <p className="hero__desc">
          I&apos;m a developer and writer. I enjoy creating websites with a
          focus on user experience and storytelling. I am also passionate about
          theoretical concepts in computer science, mathematics and physics. I
          write about various topics including programming, technology,
          politics, philosophy and more.
        </p>
      </section>

      <section className="list" aria-label="posts">
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug} className="post-list__item">
              <span className="post-list__date">
                {p.date} · {p.readingTimeMinutes} min read
              </span>
              <a className="post-list__title" href={`/blog/${p.slug}`}>
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <div className="footer__links">
          <a
            href="https://github.com/Harshit-Vavaiya"
            target="_blank"
            rel="noreferrer"
          >
            ↗ github
          </a>
          <a
            href="https://www.linkedin.com/in/harshitvavaiya"
            target="_blank"
            rel="noreferrer"
          >
            ↗ linkedin
          </a>
          <a
            href="https://harshitvavaiya.medium.com/"
            target="_blank"
            rel="noreferrer"
          >
            ↗ medium
          </a>
        </div>
      </footer>
    </main>
  );
}
