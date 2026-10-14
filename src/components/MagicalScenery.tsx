import { Hexi } from "./Hexi";
import studyConcept from "../assets/academy-study-concept.svg";
export function MagicalScenery({
  artwork = studyConcept,
  placeholder = true,
}: {
  artwork?: string;
  placeholder?: boolean;
}) {
  return (
    <figure className="academy-scene">
      <div className="academy-scene-frame">
        <img className="academy-study" src={artwork} alt="" />
        <span className="scene-inscription">The familiar’s study</span>
        <Hexi className="study-hexi" />
        <div className="study-caption">
          <span aria-hidden="true">✦</span>
          <div>
            Meet Hexi<small>Chief Bug Inspector · “Bugs fear me!”</small>
          </div>
        </div>
      </div>
      {placeholder && (
        <figcaption className="scene-artwork-note">
          Study concept · placeholder illustration. Official Hexi artwork
          pending.
        </figcaption>
      )}
    </figure>
  );
}
