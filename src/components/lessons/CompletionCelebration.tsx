import { useId } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Hexi } from "../Hexi";
import type { CompletionCelebrationContent } from "../../types/learning";
export function CompletionCelebration({
  content,
  animate = false,
}: {
  content: CompletionCelebrationContent;
  animate?: boolean;
}) {
  const titleId = useId();
  return (
    <section
      className={`card completion-celebration ${animate ? "celebration-enter" : ""}`}
      aria-labelledby={titleId}
    >
      <div className="celebration-stars" aria-hidden="true">
        ✦ <span>✧</span> ✦
      </div>
      <Hexi expression="encouraging" />
      <div className="celebration-copy">
        <h2 id={titleId}>{content.title}</h2>
        <p className="celebration-message">{content.message}</p>
        <p className="celebration-achievement">
          <Star size={20} aria-hidden="true" />
          <strong>{content.achievement}</strong>
        </p>
        <div className="celebration-navigation">
          <a className="button secondary" href={content.reviewHref}>
            {content.reviewLabel}
          </a>
          <Link className="button" to={content.returnTo}>
            {content.returnLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
