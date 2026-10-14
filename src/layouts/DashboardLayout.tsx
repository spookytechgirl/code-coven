import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Flag,
  NotebookPen,
  Trophy,
  Cat,
  Settings,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Brand } from "./PublicLayout";
import { ThemeToggle } from "../components/ThemeToggle";
const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/dashboard/spellbook", "The Spellbook", BookOpen],
  ["/dashboard/potion-lab", "Potion Lab", FlaskConical],
  ["/dashboard/quests", "My Quests", Flag],
  ["/dashboard/grimoire", "My Grimoire", NotebookPen],
  ["/dashboard/achievements", "Achievements", Trophy],
  ["/dashboard/hexi", "Ask Hexi", Cat],
  ["/dashboard/settings", "Settings", Settings],
] as const;
export function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="dashboard-shell">
      <button
        className="dashboard-menu mobile-menu"
        aria-expanded={open}
        aria-controls="dashboard-sidebar"
        onClick={() => setOpen(!open)}
        aria-label="Toggle dashboard navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
      <aside id="dashboard-sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <Brand />
        <span className="sidebar-label">YOUR LITTLE CORNER OF MAGIC</span>
        <nav aria-label="Student navigation">
          {items.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end onClick={() => setOpen(false)}>
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          <Sparkles size={20} />
          <strong>
            A little practice.
            <br />A lot of possibility.
          </strong>
          <p>Your next great idea is waiting.</p>
        </div>
        <div className="profile">
          <span className="apprentice-avatar" aria-hidden="true">
            <Sparkles size={21} />
          </span>
          <div>
            <strong>Apprentice</strong>
            <small>Demo student · Level 3</small>
          </div>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <span>THE STUDENT COMMON ROOM</span>
          <ThemeToggle />
        </header>
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="dashboard-footer">
          Free to learn. Free to grow. Free forever.{" "}
          <span>Code Coven · v0.3.0</span>
        </footer>
      </div>
    </div>
  );
}
