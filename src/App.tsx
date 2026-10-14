import { useEffect } from "react";
import { courses, departments } from "./data/curriculum";
import { Routes, Route, useLocation } from "react-router-dom";
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
function RouteFocus() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main-content")?.focus();
    const pageNames: Record<string, string> = {
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
