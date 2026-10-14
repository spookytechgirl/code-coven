import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
export function Brand() {
  return (
    <Link to="/" className="brand">
      <span className="brand-mark">
        <Sparkles size={23} />
      </span>
      Code Coven<span className="brand-dot">✦</span>
    </Link>
  );
}
export function PublicLayout() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="public-header">
        <Brand />
        <button
          className="mobile-menu"
          aria-expanded={open}
          aria-controls="public-nav"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="public-nav"
          className={open ? "public-nav open" : "public-nav"}
          aria-label="Main navigation"
        >
          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/courses", "Courses"],
            ["/academy", "The Academy"],
            ["/community", "Community"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            Log In
          </Link>
          <ThemeToggle />
          <Link
            className="button small"
            to="/dashboard"
            onClick={() => setOpen(false)}
          >
            Enter the Coven <ArrowRight size={15} />
          </Link>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="public-footer">
        <div>
          <Brand />
          <p>Free to learn. Free to grow. Free forever.</p>
          <small>© {new Date().getFullYear()} Code Coven</small>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/academy">The Academy</Link>
          <Link to="/community">Community</Link>
          <Link to="/accessibility">Accessibility</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
      </footer>
    </>
  );
}
