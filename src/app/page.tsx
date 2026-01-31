import Navbar from "./components/navbar";

const posts = [
  {
    date: "April 9, 2024",
    title: "Embracing Vim: The Unsung Hero of Code Editors",
  },
  {
    date: "April 8, 2024",
    title: "Spaces vs. Tabs: The Indentation Debate Continues",
  },
  {
    date: "April 7, 2024",
    title: "The Power of Static Typing in Programming",
  },
];

export default function Home() {
  return (
    <main className="container-page">
      <Navbar />

      <section className="hero" aria-label="intro">
        <h1 className="hero__title">Harshit Vavaiya</h1>
        <p className="hero__desc">
          I&apos;m a Vim enthusiast and tab advocate, finding unmatched
          efficiency in Vim&apos;s keystroke commands and tabs&apos; flexibility
          for personal viewing preferences. This extends to my support for
          static typing, where its early error detection ensures cleaner code,
          and my preference for dark mode, which eases long coding sessions by
          reducing eye strain.
        </p>
      </section>

      <section className="list" aria-label="posts">
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.title} className="post-list__item">
              <span className="post-list__date">{p.date}</span>
              <a className="post-list__title" href="#">
                {p.title}
              </a>
            </li>
          ))}
        </ul>
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
