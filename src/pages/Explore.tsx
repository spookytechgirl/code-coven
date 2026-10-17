import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ArrowLeft, BookOpen } from "lucide-react";
import { courses, departments } from "../data/curriculum";
import { CourseCard } from "../components/CourseCard";
import { DepartmentGrid } from "../components/DepartmentGrid";
import { NotFound } from "./Placeholder";
export function Academy() {
  return (
    <section className="page-width interior">
      <span className="eyebrow">WELCOME TO THE GROUNDS</span>
      <h1>The Academy</h1>
      <p className="page-intro">
        Seven departments. No locked doors. Follow your curiosity, from your
        very first line to your next big idea.
      </p>
      <DepartmentGrid />
    </section>
  );
}
export function Courses() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const filtered = courses.filter(
    (c) =>
      (department === "all" || c.departmentId === department) &&
      `${c.title} ${c.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <section className="page-width interior">
      <span className="eyebrow">YOUR SPELLBOOK STARTS HERE</span>
      <h1>Explore Courses</h1>
      <p className="page-intro">
        Real skills. A little wonder. Every course is completely free. Lesson
        content is growing — start with the Python print() pilot.
      </p>
      <div className="filters">
        <label htmlFor="course-search">
          <span>Find a course</span>
          <div className="search-input">
            <Search size={18} />
            <input
              id="course-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your next adventure"
              type="search"
            />
          </div>
        </label>
        <label htmlFor="department-filter">
          <span>Department</span>
          <select
            id="department-filter"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="all">All departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">
        {filtered.length} {filtered.length === 1 ? "course" : "courses"} to
        explore
      </p>
      <div className="course-grid">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
      {!filtered.length && (
        <div className="card empty">
          No spells found. Try another search or department.
        </div>
      )}
    </section>
  );
}
export function DepartmentPage() {
  const { departmentId } = useParams();
  const department = departments.find((d) => d.id === departmentId);
  if (!department) return <NotFound />;
  return (
    <section className="page-width interior">
      <Link className="text-link" to="/academy">
        <ArrowLeft size={16} /> Back to the academy
      </Link>
      <span className="eyebrow">{department.subject}</span>
      <h1>{department.title}</h1>
      <p className="page-intro">
        {department.description} This department is open to everyone.
      </p>
      {department.paths.map((path) => (
        <section key={path.id}>
          <h2>{path.title} learning path</h2>
          <div className="course-grid">
            {path.courseIds
              .map((id) => courses.find((c) => c.id === id))
              .filter((c) => c !== undefined)
              .map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
          </div>
        </section>
      ))}
    </section>
  );
}
export function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  if (!course) return <NotFound />;
  const department = departments.find((d) => d.id === course.departmentId);
  return (
    <section className="page-width interior">
      <Link className="text-link" to="/courses">
        <ArrowLeft size={16} /> Back to courses
      </Link>
      <span className="eyebrow">{department?.title}</span>
      <h1>{course.title}</h1>
      <p className="page-intro">{course.description}</p>
      <div className="detail-meta">
        <span className="pill">{course.difficulty}</span>
        <span>
          <BookOpen size={17} /> {course.lessonCount} planned lessons
        </span>
        <span>Completely free</span>
      </div>
      {course.learningEntry ? (
        <article className="card detail-placeholder">
          <h2>Your first Python classroom is open</h2>
          <p>
            Two implemented lessons teach print() and variables through Kids,
            Adults, and AI experiences. The remaining lessons are planned.
            Practice checks text only; no Python interpreter runs.
          </p>
          {course.modules.map((module) => (
            <section key={module.id}>
              <h3>{module.title}</h3>
              <ul>
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>{lesson.title}</li>
                ))}
              </ul>
            </section>
          ))}
          <Link className="button" to={course.learningEntry}>
            Choose your learning path
          </Link>
        </article>
      ) : (
        <article className="card detail-placeholder">
          <h2>The spellbook is being written</h2>
          <p>
            This is a course preview. Modules, lessons, challenges, and the
            learning workspace are coming soon. There are no exercises to
            complete or progress to save in this course yet.
          </p>
          <Link className="button" to="/dashboard">
            Visit your demo dashboard
          </Link>
        </article>
      )}
    </section>
  );
}
