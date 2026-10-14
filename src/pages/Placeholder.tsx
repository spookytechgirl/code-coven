import { Link, useLocation } from "react-router-dom";
import { Hexi } from "../components/Hexi";
const copy: Record<string, [string, string]> = {
  "/about": [
    "About Code Coven",
    "Our mission is to provide completely free, accessible programming education for everyone, from absolute beginners to advanced developers. A Little Magic. A Lot of Code.",
  ],
  "/community": [
    "Your people are out there",
    "A welcoming community is coming soon. There are no live discussions or community accounts in this local preview.",
  ],
  "/login": [
    "No account needed",
    "Explore the academy and demo dashboard freely. Authentication is not part of this version.",
  ],
  "/privacy": [
    "Privacy",
    "This local prototype saves only your Daylight/Midnight theme preference in your browser. It has no accounts, analytics, database, or server-side student records. A full privacy policy will accompany future services.",
  ],
  "/accessibility": [
    "An academy for everyone",
    "Use a keyboard to reach every link and button. Visible focus indicators, semantic landmarks, descriptive labels, responsive layouts, and reduced-motion support are included. Both themes are designed for readable contrast.",
  ],
  "/dashboard/potion-lab": [
    "Potion Lab",
    "The coding workspace is coming soon. Explore Python Potions for a preview of the planned course.",
  ],
  "/dashboard/quests": [
    "My Quests",
    "Today’s demo quest: Complete a Python exercise. Demo reward: +50 XP. Exercises and reward tracking are coming soon; this preview does not award XP.",
  ],
  "/dashboard/grimoire": [
    "My Grimoire",
    "Your personal collection of notes and projects is coming soon. No notes are stored in this version.",
  ],
  "/dashboard/achievements": [
    "Achievements",
    "A shelf for your future milestones. Achievements and completion tracking are coming soon.",
  ],
  "/dashboard/hexi": [
    "Ask Hexi",
    "“Bugs fear me!” Your Chief Bug Inspector is here to encourage you. An interactive coding assistant is coming soon; no chat or AI service is connected.",
  ],
  "/dashboard/settings": [
    "Settings",
    "Use the theme button above to switch between Daylight Coven and Midnight Coven. Your theme preference is saved on this browser. Student settings are coming soon.",
  ],
};
export function Placeholder() {
  const { pathname } = useLocation();
  const [title, description] = copy[pathname] ?? [
    "Coming soon",
    "Another corner of the academy is taking shape.",
  ];
  return (
    <section className="page-width interior placeholder-page">
      <span className="eyebrow">CODE COVEN · LOCAL PREVIEW</span>
      <h1>{title}</h1>
      <p className="page-intro">{description}</p>
      <Hexi message="Bring your curiosity. I’ll keep an eye on the bugs." />
      <Link className="button" to="/dashboard">
        Enter the Coven
      </Link>
    </section>
  );
}
export function NotFound() {
  return (
    <section className="page-width interior">
      <h1>This spell hasn’t been written.</h1>
      <p>We couldn’t find that page or course.</p>
      <Link className="button" to="/">
        Back to the academy doors
      </Link>
    </section>
  );
}
