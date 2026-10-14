import { Link } from "react-router-dom";
import { ArrowRight, Flame, Star, Trophy, Zap } from "lucide-react";
import { CourseCard } from "../components/CourseCard";
import { HexiCorner } from "../components/HexiCorner";
import { DailyQuestCard } from "../components/DailyQuestCard";
import { courses, demoProgress } from "../data/curriculum";
export function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  return (
    <div className="dashboard-content">
      <div className="welcome">
        <div>
          <span className="eyebrow">A NEW DAY, A NEW SPELL</span>
          <h1>
            Good {greeting}, Apprentice! <span aria-hidden="true">✦</span>
          </h1>
          <p>Ready to make a little magic today?</p>
        </div>
        <span className="demo-label">Demo dashboard</span>
      </div>
      <p className="demo-notice">
        You’re exploring a preview. All levels, XP, streaks, and course progress
        are sample data, not saved learning activity.
      </p>
      <section className="stats" aria-label="Demo student statistics">
        {[
          [Star, "Current Level", "3", "Curious Apprentice"],
          [Zap, "Total XP", "1,250", "A little effort adds up"],
          [Trophy, "Courses Completed", "0", "Your story starts here"],
          [Flame, "Current Streak", "4 days", "Keep the spark alive"],
        ].map(([Icon, label, value, caption]) => {
          const I = Icon as typeof Star;
          return (
            <article className="card stat" key={String(label)}>
              <div>
                <span>{String(label)}</span>
                <I size={19} />
              </div>
              <strong>{String(value)}</strong>
              <small>{String(caption)}</small>
            </article>
          );
        })}
      </section>
      <section>
        <div className="section-heading">
          <div>
            <h2>Continue Your Magic</h2>
            <p>A few small steps today. A whole new world tomorrow.</p>
          </div>
          <Link className="text-link" to="/courses">
            All courses <ArrowRight size={16} />
          </Link>
        </div>
        <div className="course-grid">
          {courses
            .filter((c) => c.id in demoProgress)
            .map((c) => (
              <CourseCard key={c.id} course={c} progress={demoProgress[c.id]} />
            ))}
        </div>
      </section>
      <section className="dashboard-bottom">
        <HexiCorner />
        <DailyQuestCard />
      </section>
    </div>
  );
}
