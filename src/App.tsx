import { useEffect, lazy, Suspense } from "react";
import { courses, departments } from "./data/curriculum";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import {
  Academy,
  Courses,
  CourseDetail,
  DepartmentPage,
} from "./pages/Explore";
import { Placeholder, NotFound } from "./pages/Placeholder";
const LearningEntry = lazy(() =>
  import("./pages/Learn").then((m) => ({ default: m.LearningEntry })),
);
const PathOverview = lazy(() =>
  import("./pages/Learn").then((m) => ({ default: m.PathOverview })),
);
const HumanLesson = lazy(() =>
  import("./pages/HumanLesson").then((m) => ({ default: m.HumanLesson })),
);
const AiLesson = lazy(() =>
  import("./pages/AiLesson").then((m) => ({ default: m.AiLesson })),
);
const VariableVault = lazy(() =>
  import("./pages/VariableVault").then((m) => ({ default: m.VariableVault })),
);
const AiVariableVault = lazy(() =>
  import("./pages/AiVariableVault").then((m) => ({
    default: m.AiVariableVault,
  })),
);
const ThinkingLesson = lazy(() =>
  import("./pages/ThinkingLesson").then((m) => ({ default: m.ThinkingLesson })),
);
function RouteFocus() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main-content")?.focus();
    const pageNames: Record<string, string> = {
      "/learn": "Choose Your Learning Path",
      "/learn/kids": "Code Coven for Kids",
      "/learn/adults": "Code Coven for Adults",
      "/learn/ai": "Code Coven for AIs",
      "/learn/kids/python/first-spell": "Your First Magical Spell!",
      "/learn/adults/python/first-program":
        "Introduction to Python: Your First Program",
      "/learn/ai/python/output-fundamentals": "Python Output Fundamentals",
      "/learn/kids/python/variable-vault":
        "The Variable Vault — Giving Names to Magic!",
      "/learn/adults/python/variable-vault":
        "The Variable Vault — Giving Names to Magic!",
      "/learn/ai/python/variable-vault":
        "The Variable Vault — Giving Names to Magic!",
      "/learn/kids/fundamentals/thinking-like-a-programmer":
        "Thinking Like a Programmer",
      "/learn/adults/fundamentals/thinking-like-a-programmer":
        "Thinking Like a Programmer",
      "/learn/ai/fundamentals/thinking-like-a-programmer":
        "Thinking Like a Programmer",
      "/dashboard": "Student Dashboard",
      "/courses": "Explore Courses",
      "/academy": "The Academy",
      "/about": "About",
      "/community": "Community",
      "/login": "No Account Needed",
      "/privacy": "Privacy",
      "/accessibility": "Accessibility",
      "/dashboard/spellbook": "The Spellbook",
      "/dashboard/potion-lab": "Potion Lab",
      "/dashboard/quests": "My Quests",
      "/dashboard/grimoire": "My Grimoire",
      "/dashboard/achievements": "Achievements",
      "/dashboard/hexi": "Ask Hexi",
      "/dashboard/settings": "Settings",
    };
    const name =
      pageNames[pathname] ??
      (pathname.startsWith("/courses/")
        ? courses.find((c) => c.id === pathname.split("/")[2])?.title
        : undefined) ??
      (pathname.startsWith("/academy/")
        ? departments.find((d) => d.id === pathname.split("/")[2])?.title
        : undefined) ??
      "Page Not Found";
    document.title =
      pathname === "/"
        ? "Code Coven | A Little Magic. A Lot of Code."
        : `${name} | Code Coven`;
  }, [pathname]);
  return null;
}
export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <RouteFocus />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route
            path="learn"
            element={
              <Suspense
                fallback={
                  <p className="page-width interior" role="status">
                    Opening your classroom…
                  </p>
                }
              >
                <Outlet />
              </Suspense>
            }
          >
            <Route index element={<LearningEntry />} />
            <Route path=":audience" element={<PathOverview />} />
            <Route
              path="kids/fundamentals/thinking-like-a-programmer"
              element={<ThinkingLesson audience="kids" />}
            />
            <Route
              path="adults/fundamentals/thinking-like-a-programmer"
              element={<ThinkingLesson audience="adults" />}
            />
            <Route
              path="ai/fundamentals/thinking-like-a-programmer"
              element={<ThinkingLesson audience="ai" />}
            />
            <Route
              path="kids/python/first-spell"
              element={<HumanLesson audience="kids" />}
            />
            <Route
              path="adults/python/first-program"
              element={<HumanLesson audience="adults" />}
            />
            <Route
              path="kids/python/variable-vault"
              element={<VariableVault audience="kids" />}
            />
            <Route
              path="adults/python/variable-vault"
              element={<VariableVault audience="adults" />}
            />
            <Route
              path="ai/python/variable-vault"
              element={<AiVariableVault />}
            />
            <Route
              path="ai/python/output-fundamentals"
              element={<AiLesson />}
            />
          </Route>
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="academy" element={<Academy />} />
          <Route path="academy/:departmentId" element={<DepartmentPage />} />
          {["about", "community", "login", "privacy", "accessibility"].map(
            (path) => (
              <Route key={path} path={path} element={<Placeholder />} />
            ),
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="spellbook" element={<Courses />} />
          {[
            "potion-lab",
            "quests",
            "grimoire",
            "achievements",
            "hexi",
            "settings",
          ].map((path) => (
            <Route key={path} path={path} element={<Placeholder />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
