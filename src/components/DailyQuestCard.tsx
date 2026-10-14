import { Link } from "react-router-dom";
import { Flag, Zap } from "lucide-react";
export function DailyQuestCard() {
  return (
    <article className="card quest enchanted-quest">
      <span className="eyebrow">
        <Flag size={15} /> TODAY’S QUEST
      </span>
      <div className="quest-seal" aria-hidden="true">
        ✦
      </div>
      <h2>A potion a day</h2>
      <p>Complete a Python exercise.</p>
      <span className="reward">
        <Zap size={15} /> +50 XP · demo reward
      </span>
      <p className="quest-demo-note">
        Preview quest — no exercise or XP tracking yet.
      </p>
      <Link className="text-link" to="/dashboard/quests">
        View quest preview <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
