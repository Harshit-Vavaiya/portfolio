"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import logoWhite from "/public/images/logo_white.png";
import logoBlack from "/public/images/logo_black.png";

type Theme = "dark" | "light";

const THEME_KEY = "theme";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // init theme from localStorage or system preference
    const saved =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(THEME_KEY) as Theme | null)
        : null;

    const systemPrefersLight =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    const initial: Theme = saved ?? (systemPrefersLight ? "light" : "dark");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, next);
    }
    applyTheme(next);
  };

  const icon = useMemo(() => (theme === "dark" ? "🌙" : "☀️"), [theme]);
  const logo = theme === "light" ? logoBlack : logoWhite;

  return (
    <header className="top-nav">
      {/* Left spacer keeps the middle column truly centered */}
      <div className="top-nav__spacer" aria-hidden="true" />

      <div className="top-nav__center">
        <a href="/" className="top-nav__logo" aria-label="Home">
          <Image
            src={logo}
            alt="logo"
            priority
            className="top-nav__logo-image"
          />
        </a>

        <div className="top-nav__divider" aria-hidden="true" />

        <nav className="top-nav__links" aria-label="primary">
          <a href="/" className="top-nav__link">
            home
          </a>
          <a href="/blog" className="top-nav__link">
            blog
          </a>
          <a href="/projects" className="top-nav__link">
            projects
          </a>
        </nav>
      </div>

      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle theme"
        onClick={toggle}
      >
        {icon}
      </button>
    </header>
  );
}
