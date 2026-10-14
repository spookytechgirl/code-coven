import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Hexi } from "./Hexi";
import { hexiTips } from "../data/curriculum";
const encouragement = [
  "Small steps count. You’re doing beautifully.",
  "Curiosity is your most powerful spell.",
  "Every bug you meet is a chance to learn.",
  "Rest is part of the adventure, too.",
];
export function HexiCorner() {
  const [tip, setTip] = useState(0);
  return (
    <article className="card hexi-corner enchanted-hexi-corner">
      <div className="hexi-corner-copy">
        <span className="eyebrow">A WORD FROM YOUR FAMILIAR</span>
        <h2>Hexi’s Corner</h2>
        <p className="tip" aria-live="polite">
          “{hexiTips[tip]}”
        </p>
        <p className="hexi-encouragement">
          {encouragement[tip % encouragement.length]}
        </p>
        <button
          className="text-link"
          onClick={() => setTip((tip + 1) % hexiTips.length)}
        >
          Another little wisdom <ArrowRight size={16} />
        </button>
        <small>Hexi · Chief Bug Inspector · “Bugs fear me!”</small>
      </div>
      <div className="hexi-portrait">
        <span className="portrait-stars" aria-hidden="true">
          ✧ · ✦
        </span>
        <Hexi expression="encouraging" />
        <span className="portrait-label">Mascot placeholder</span>
      </div>
    </article>
  );
}
