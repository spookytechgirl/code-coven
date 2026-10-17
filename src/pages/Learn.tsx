import { Link, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { DepartmentArtwork } from "../components/DepartmentArtwork";
import { learningPaths, lessonRoutes } from "../data/lessons/python-output";
import { variableRoutes } from "../data/lessons/python-variables";
import { NotFound } from "./Placeholder";
export function LearningEntry() {
  return (
    <section className="page-width interior learning-entry">
      <span className="eyebrow">
        <Sparkles size={15} /> THE THREE CLASSROOMS ARE OPEN
      </span>
      <h1>One little spell. Three ways to learn.</h1>
      <p className="page-intro">
        Start your Python adventure with <code>print()</code>. Choose the
        experience that fits you. Every path is free, and you can switch
        whenever you like.
      </p>
      <div className="path-grid">
        {learningPaths.map((path) => (
          <article className={`card path-card path-${path.id}`} key={path.id}>
            <div className="path-art">
              <DepartmentArtwork departmentId={path.departmentId} />
            </div>
            <div className="path-copy">
              <span className="eyebrow">{path.description}</span>
              <h2>{path.title}</h2>
              <p className="path-audience">{path.audience}</p>
              <p>{path.experience}</p>
              <Link className="button" to={path.route}>
                Begin Learning <ArrowRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <aside className="lesson-note">
        <BookOpen size={21} />
        <p>
          Two Python lessons: display text with print(), then give values names
          in the Variable Vault. Human activities use a limited text checker.
          The AI classroom provides validated downloadable data and sample
          evaluations, not an agent service.
        </p>
      </aside>
    </section>
  );
}
export function PathOverview() {
  const { audience } = useParams();
  const path = learningPaths.find((p) => p.id === audience);
  if (!path) return <NotFound />;
  return (
    <section className="page-width interior pathway-overview">
      <Link className="text-link" to="/learn">
        ← Switch learning paths
      </Link>
      <span className="eyebrow">YOUR PYTHON ADVENTURE · LESSONS 001–002</span>
      <h1>{path.title}</h1>
      <p className="page-intro">{path.experience}</p>
      {path.id === "kids" ? (
        <div className="band-cards">
          {[
            {
              band: "little",
              name: "Little Apprentices",
              ages: "Ages 6–9",
              copy: "Recognize a spell, predict its message, and finish a guided example.",
            },
            {
              band: "junior",
              name: "Junior Spellcasters",
              ages: "Ages 10–13",
              copy: "Identify the parts of a print statement, change a message, and try a challenge.",
            },
          ].map((b) => (
            <article className="card band-card" key={b.band}>
              <span className="eyebrow">{b.ages}</span>
              <h2>{b.name}</h2>
              <p>{b.copy}</p>
              <Link
                className="button"
                to={`${lessonRoutes.kids}?band=${b.band}`}
              >
                Begin Learning <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <article className="card pilot-summary">
          <span className="eyebrow">PYTHON · OUTPUT WITH PRINT()</span>
          <h2>
            {path.id === "adults"
              ? "Introduction to Python: Your First Program"
              : "Python Output Fundamentals"}
          </h2>
          <p>
            {path.id === "adults"
              ? "Understand print, string literals, and common mistakes. Practice writing a message, then check your answer with immediate feedback."
              : "Inspect the versioned lesson, deterministic examples, and future request/response contract. Download the data for your own authorized tooling."}
          </p>
          <Link className="button" to={lessonRoutes[path.id]}>
            Begin Learning <ArrowRight size={17} />
          </Link>
        </article>
      )}
      <section className="card pilot-summary">
        <span className="eyebrow">LESSON 002 · PYTHON VARIABLES</span>
        <h2>The Variable Vault — Giving Names to Magic!</h2>
        <p>
          Name text and numbers, print their values, and change what a name
          holds. Lesson 001 is a helpful first step; either lesson is open to
          everyone.
        </p>
        <Link className="button" to={variableRoutes[path.id]}>
          Open the Variable Vault <ArrowRight size={17} />
        </Link>
      </section>
      <p className="learning-privacy">
        {path.id === "kids"
          ? "Age bands guide difficulty, not access. Choose either; no age, name, or other personal information is requested. No public profiles, chat, leaderboards, streaks, or rewards are part of this lesson."
          : path.id === "adults"
            ? "No account required. Lesson completion is stored only in your current browser, separate from the demo dashboard."
            : "No registration, execution API, or tool permissions. Passing an example demonstrates task performance, not retained knowledge."}
      </p>
    </section>
  );
}
