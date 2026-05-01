"use client";

import { useEffect, useRef, useState } from "react";

/* ─── helpers ─────────────────────────────────────────── */
function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/* SHA-256 passphrase → hex hash via Web Crypto (client-only) */
async function sha256hex(passphrase: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(passphrase),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkToken(hash: string) {
  const r = await fetch("/api/admin/check", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token: hash }),
  });
  const j = await r.json();
  return Boolean(j.ok);
}

/* ─── LOGIN ────────────────────────────────────────────── */
function LoginPage({ onLogin }: { onLogin: (t: string) => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!val) return setErr("Passphrase cannot be empty.");
    setBusy(true);
    setErr("");
    // Hash the passphrase client-side; only the hash travels over the wire
    const hash = await sha256hex(val).catch(() => "");
    const ok = await checkToken(hash).catch(() => false);
    setBusy(false);
    if (ok) {
      // Store the hash (not the plaintext passphrase) in localStorage
      localStorage.setItem("ADMIN_TOKEN", hash);
      onLogin(hash);
    } else {
      setErr("Invalid passphrase. Try again.");
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login-card" onSubmit={submit}>
        <div className="adm-login-icon">✍️</div>
        <h1 className="adm-login-title">Admin</h1>
        <p className="adm-login-sub">Enter your passphrase to continue.</p>
        <input
          className="adm-field"
          type="password"
          placeholder="Passphrase"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          autoFocus
        />
        {err && <p className="adm-error">{err}</p>}
        <button className="adm-btn-primary" type="submit" disabled={busy}>
          {busy ? "Checking…" : "Continue →"}
        </button>
      </form>
    </div>
  );
}

/* ─── TOAST ────────────────────────────────────────────── */
function Toast({
  msg,
  type,
  onClose,
}: {
  msg: string;
  type: "ok" | "err";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`adm-toast adm-toast--${type}`} onClick={onClose}>
      {msg}
    </div>
  );
}

/* ─── ROOT ─────────────────────────────────────────────── */
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("ADMIN_TOKEN") ?? "";
    if (!t) return setChecking(false);
    checkToken(t)
      .then((ok) => {
        if (ok) setToken(t);
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <div className="adm-splash">Checking access…</div>;
  if (!token) return <LoginPage onLogin={(t) => setToken(t)} />;
  return (
    <Editor
      token={token}
      onLogout={() => {
        localStorage.removeItem("ADMIN_TOKEN");
        setToken(null);
      }}
    />
  );
}

/* ─── EDITOR ───────────────────────────────────────────── */
function Editor({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [meta, setMeta] = useState({
    slug: "",
    date: todayISO(),
    tags: "blog",
    description: "",
    draft: false,
  });
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  function handleTitleBlur() {
    if (!meta.slug && title) setMeta((m) => ({ ...m, slug: slugify(title) }));
  }

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim())
      return setToast({ msg: "Title is required.", type: "err" });
    if (!body.trim())
      return setToast({ msg: "Body is required.", type: "err" });
    const slug = meta.slug || slugify(title);
    if (!slug)
      return setToast({ msg: "Could not generate a slug.", type: "err" });

    setBusy(true);
    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token,
          slug,
          title,
          date: meta.date,
          tags: meta.tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          description: meta.description,
          draft: meta.draft,
          body,
        }),
      });
      const j = await res.json();
      if (j.ok) {
        setToast({ msg: "Published! 🎉", type: "ok" });
        setTitle("");
        setBody("");
        setMeta({
          slug: "",
          date: todayISO(),
          tags: "blog",
          description: "",
          draft: false,
        });
        if (titleRef.current) titleRef.current.style.height = "auto";
        if (bodyRef.current) bodyRef.current.style.height = "auto";
      } else {
        setToast({ msg: "Error: " + (j.error || "unknown"), type: "err" });
      }
    } catch {
      setToast({ msg: "Network error.", type: "err" });
    } finally {
      setBusy(false);
    }
  }

  const previewSlug = meta.slug || slugify(title) || "…";

  return (
    <div className="adm-root">
      {/* TOP BAR */}
      <header className="adm-topbar">
        <span className="adm-brand">✍️ Writer</span>
        <div className="adm-topbar-actions">
          <button
            type="button"
            className="adm-btn-ghost"
            onClick={() => setPanelOpen((v) => !v)}
          >
            {panelOpen ? "Hide settings ✕" : "Post settings ⚙"}
          </button>
          <button
            form="adm-form"
            type="submit"
            className="adm-btn-primary"
            disabled={busy}
          >
            {busy ? "Publishing…" : meta.draft ? "Save draft" : "Publish"}
          </button>
          <button
            type="button"
            className="adm-btn-ghost adm-btn-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* CANVAS + PANEL */}
      <div className="adm-layout">
        <form id="adm-form" className="adm-canvas" onSubmit={publish}>
          <textarea
            ref={titleRef}
            className="adm-title"
            placeholder="Post title…"
            value={title}
            rows={1}
            onBlur={handleTitleBlur}
            onChange={(e) => {
              setTitle(e.target.value);
              autoResize(e.target);
            }}
          />
          <div className="adm-divider" />
          <textarea
            ref={bodyRef}
            className="adm-body"
            placeholder="Tell your story… (Markdown supported)"
            value={body}
            rows={24}
            onChange={(e) => {
              setBody(e.target.value);
              autoResize(e.target);
            }}
          />
        </form>

        {/* SIDE PANEL */}
        <aside className={`adm-panel${panelOpen ? " adm-panel--open" : ""}`}>
          <h2 className="adm-panel-heading">Post settings</h2>

          <div className="adm-panel-row">
            <label className="adm-panel-label">Slug</label>
            <input
              className="adm-field"
              placeholder="auto-generated"
              value={meta.slug}
              onChange={(e) => setMeta({ ...meta, slug: e.target.value })}
            />
            <span className="adm-panel-hint">/blog/{previewSlug}</span>
          </div>

          <div className="adm-panel-row">
            <label className="adm-panel-label">Date</label>
            <input
              className="adm-field"
              type="date"
              value={meta.date}
              onChange={(e) => setMeta({ ...meta, date: e.target.value })}
            />
          </div>

          <div className="adm-panel-row">
            <label className="adm-panel-label">
              Tags <span className="adm-panel-hint">(comma separated)</span>
            </label>
            <input
              className="adm-field"
              placeholder="blog, tech, …"
              value={meta.tags}
              onChange={(e) => setMeta({ ...meta, tags: e.target.value })}
            />
          </div>

          <div className="adm-panel-row">
            <label className="adm-panel-label">
              Description <span className="adm-panel-hint">(optional)</span>
            </label>
            <textarea
              className="adm-field"
              rows={3}
              placeholder="Auto-extracted if empty."
              value={meta.description}
              onChange={(e) =>
                setMeta({ ...meta, description: e.target.value })
              }
            />
          </div>

          <div className="adm-panel-row adm-panel-row--inline">
            <label htmlFor="adm-draft">Save as draft</label>
            <input
              id="adm-draft"
              type="checkbox"
              checked={meta.draft}
              onChange={(e) => setMeta({ ...meta, draft: e.target.checked })}
            />
          </div>
        </aside>
      </div>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
