import Navbar from "../components/navbar";
import { getAllBlogPosts } from "../../lib/blog";
import Footer from "../components/footer";

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="container-page">
      <Navbar />

      <section className="hero" aria-label="blog">
        <h1 className="hero__title">Blog</h1>
        <p className="hero__desc">Short notes and longer posts.</p>
      </section>

      <section className="list" aria-label="posts">
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug} className="post-list__item">
              <span className="post-list__date">
                {p.date} · {p.readingTimeMinutes} min read
              </span>
              {p.tags.filter((t) => t !== "blog").length ? (
                <div className="post-list__tags">
                  {p.tags
                    .filter((t) => t !== "blog")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              ) : null}
              <div className="post-list__content">
                <a className="post-list__title" href={`/blog/${p.slug}`}>
                  {p.title}
                </a>
                {p.description ? (
                  <div className="post-list__desc">{p.description}</div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
