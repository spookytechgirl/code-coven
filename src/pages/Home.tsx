import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Heart,
  Sparkles,
  Check,
} from "lucide-react";
import { MagicalScenery } from "../components/MagicalScenery";
import { DepartmentGrid } from "../components/DepartmentGrid";
export function Home() {
  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={15} /> THE ACADEMY DOORS ARE OPEN
          </span>
          <h1>
            Code Coven
            <span>
              A Little Magic.
              <br />
              <em>A Lot of Code.</em>
            </span>
          </h1>
          <p>
            A completely free coding academy for curious minds, creative
            thinkers, and future developers.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/dashboard">
              Enter the Coven <ArrowRight size={18} />
            </Link>
            <Link className="button secondary" to="/courses">
              Explore Courses
            </Link>
          </div>
          <div className="hero-promises">
            <span>
              <Check size={15} /> Completely free
            </span>
            <span>
              <Check size={15} /> All skill levels
            </span>
            <span>
              <Check size={15} /> Learn at your pace
            </span>
          </div>
        </div>
        <MagicalScenery />
      </section>
      <section
        className="feature-strip page-width"
        aria-label="Why learn with Code Coven"
      >
        {[
          [
            BookOpen,
            "Learn Real Skills",
            "Practical knowledge, one step at a time.",
          ],
          [
            Code2,
            "Build Amazing Things",
            "Turn your ideas into something real.",
          ],
          [
            Heart,
            "Join a Supportive Community",
            "Find your people. Grow together.",
          ],
          [
            Sparkles,
            "A Magical Experience",
            "A little wonder in every lesson.",
          ],
        ].map(([Icon, title, copy]) => {
          const I = Icon as typeof BookOpen;
          return (
            <article key={String(title)}>
              <I size={23} />
              <h2>{String(title)}</h2>
              <p>{String(copy)}</p>
            </article>
          );
        })}
      </section>
      <section className="page-width academy-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR PATH</span>
            <h2>One academy. Endless possibilities.</h2>
            <p>
              Seven magical places to explore. Where will your curiosity take
              you?
            </p>
          </div>
          <Link className="text-link" to="/academy">
            Explore the academy <ArrowRight size={17} />
          </Link>
        </div>
        <DepartmentGrid />
      </section>
      <section className="invitation page-width">
        <Sparkles size={28} />
        <h2>Your Adventure Begins With a Single Line of Code.</h2>
        <p>You belong here. Bring your curiosity — we’ll bring the magic.</p>
        <Link className="button" to="/dashboard">
          Enter the Coven <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
