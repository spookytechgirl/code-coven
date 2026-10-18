import { algorithmRoutes } from "../data/lessons/algorithm-recipe";
import { shieldRoutes } from "../data/lessons/cyber-shield";
import { htmlRoutes } from "../data/lessons/web-html";
import { thinkingRoutes } from "../data/lessons/programming-thinking";
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
        content is growing — explore Programming Fundamentals, Python Potions,
        Web Enchantment and Cybersecurity Charms.
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
      {course.id === "programming-foundations" ? (
        <article id="classrooms" className="card detail-placeholder">
          <h2>Thinking Like a Programmer</h2>
          <p>
            One complete introductory lesson: clear instructions, sequencing,
            small steps, and debugging. Choose an experience; all are open to
            everyone. The other 11 catalog lessons are planned.
          </p>
          <div className="lesson-downloads">
            <Link className="button" to={`${thinkingRoutes.kids}?band=little`}>
              Little Apprentices
            </Link>
            <Link className="button" to={`${thinkingRoutes.kids}?band=junior`}>
              Junior Spellcasters
            </Link>
            <Link className="button" to={thinkingRoutes.adults}>
              Adult learners
            </Link>
            <Link className="button" to={thinkingRoutes.ai}>
              AI learning pathway
            </Link>
          </div>
          <p>
            Fixed-step checking only; no submitted code executes. Progress is
            local to this browser.
          </p>
        </article>
      ) : course.id === "web-enchantment" ? (
        <article id="classrooms" className="card detail-placeholder">
          <h2>The Anatomy of a Magical Web Page</h2>
          <p>
            One complete introductory lesson: websites, HTML elements, headings,
            paragraphs, document structure and simple repairs. Choose an
            experience. The other 23 catalog lessons are planned.
          </p>
          <div className="lesson-downloads">
            <Link className="button" to={`${htmlRoutes.kids}?band=little`}>
              Little Apprentices
            </Link>
            <Link className="button" to={`${htmlRoutes.kids}?band=junior`}>
              Junior Spellcasters
            </Link>
            <Link className="button" to={htmlRoutes.adults}>
              Adult learners
            </Link>
            <Link className="button" to={htmlRoutes.ai}>
              AI learning pathway
            </Link>
          </div>
          <p>
            Bounded HTML checking and a fixed safe text model; no submitted
            markup is executed or inserted into the academy.
          </p>
        </article>
      ) : course.id === "cybersecurity-charms" ? (
        <article id="classrooms" className="card detail-placeholder">
          <h2>The Guardian’s First Shield</h2>
          <p>
            One complete introduction to staying safer online: suspicious
            messages, strong unique passwords, MFA, privacy and defensive
            responses. The other 14 catalog lessons are planned.
          </p>
          <div className="lesson-downloads">
            <Link className="button" to={`${shieldRoutes.kids}?band=little`}>
              Little Apprentices
            </Link>
            <Link className="button" to={`${shieldRoutes.kids}?band=junior`}>
              Junior Spellcasters
            </Link>
            <Link className="button" to={shieldRoutes.adults}>
              Adult learners
            </Link>
            <Link className="button" to={shieldRoutes.ai}>
              AI learning pathway
            </Link>
          </div>
          <p>
            Fictional scenarios and fixed choices only. No real passwords,
            accounts, link visits or attacks.
          </p>
        </article>
      ) : course.id === "algorithm-alchemy" ? (
        <article id="classrooms" className="card detail-placeholder">
          <h2>The Alchemist’s Recipe</h2>
          <p>
            One complete introductory lesson: algorithms, decisions, patterns,
            bounded loops and removing unnecessary steps. Builds on Programming
            Fundamentals. The other 19 catalog lessons are planned.
          </p>
          <div className="lesson-downloads">
            <Link className="button" to={`${algorithmRoutes.kids}?band=little`}>
              Little Apprentices
            </Link>
            <Link className="button" to={`${algorithmRoutes.kids}?band=junior`}>
              Junior Spellcasters
            </Link>
            <Link className="button" to={algorithmRoutes.adults}>
              Adult learners
            </Link>
            <Link className="button" to={algorithmRoutes.ai}>
              AI learning pathway
            </Link>
          </div>
          <p>
            Fixed educational simulations only. No code runs and no real potion
            ingredients are needed.
          </p>
        </article>
      ) : course.learningEntry ? (
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
