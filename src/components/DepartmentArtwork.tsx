import { useId } from "react";
import { departmentArtwork } from "../data/artwork";

/** Lightweight concept scenes, not finished academy illustration assets. */
export function DepartmentArtwork({
  departmentId,
  src,
}: {
  departmentId: string;
  src?: string;
}) {
  const id = useId().replaceAll(":", "");
  const artwork = departmentArtwork[departmentId];
  const image = src ?? artwork?.src;
  if (image)
    return (
      <img className="destination-art" src={image} alt="" loading="lazy" />
    );
  return (
    <svg
      className="destination-art"
      viewBox="0 0 400 240"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x2="0" y2="1">
          <stop stopColor="#302243" />
          <stop offset="1" stopColor="#9670ac" />
        </linearGradient>
        <radialGradient id={`${id}-light`}>
          <stop stopColor="#ffebac" stopOpacity=".6" />
          <stop offset="1" stopColor="#ffe5a1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-sky)`} />
      <circle cx="202" cy="125" r="100" fill={`url(#${id}-light)`} />
      <path d="M0 200Q70 159 145 197T290 192T400 175V240H0Z" fill="#473657" />
      <path d="M0 222Q120 186 225 224T400 209V240H0Z" fill="#665076" />
      <g fill="#e9ddf5">
        <path d="m57 43 3 7 7 3-7 3-3 7-3-7-7-3 7-3zM338 55l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        <circle cx="102" cy="27" r="2" />
        <circle cx="278" cy="31" r="2" />
        <circle cx="301" cy="91" r="2" />
      </g>
      <path d="M321 22a18 18 0 1 0 15 29 16 16 0 0 1-15-29" fill="#f4d59b" />
      <g fill="#392b48" opacity=".7">
        <path d="m25 113 30 85H-5ZM358 108l37 95h-74Z" />
        <path d="m46 141 24 61H22ZM385 138l24 65h-49Z" />
      </g>
      {departmentId === "cottage" && (
        <g>
          <path d="M115 130h166v83H115Z" fill="#c3a7dc" />
          <path d="m92 135 105-93 107 93Z" fill="#64477c" />
          <path
            d="m104 135 94-81 95 81"
            fill="none"
            stroke="#b99bdd"
            strokeWidth="8"
          />
          <path d="M246 58h17v47h-17Z" fill="#9476ad" />
          <path d="M178 211v-46a20 20 0 0 1 40 0v46" fill="#573b69" />
          <g fill="#ffe8af" stroke="#80608e" strokeWidth="5">
            <rect x="133" y="151" width="28" height="32" rx="12" />
            <rect x="237" y="151" width="28" height="32" rx="12" />
          </g>
          <path
            d="M111 144q6-30 31-31m115 14q31-12 29 22"
            fill="none"
            stroke="#9878ac"
            strokeWidth="6"
          />
          <path d="M194 212q-15 16-5 28h56q-23-15-35-28" fill="#c7abd5" />
        </g>
      )}
      {departmentId === "potions" && (
        <g>
          <path d="M111 96q89-113 178 0v116H111Z" fill="#a88dc6" />
          <path d="M128 103q71-83 144 0v104H128Z" fill="#50375f" />
          <path d="M135 182h132v10H135Z" fill="#d9b76e" />
          <g stroke="#d5c0ee" strokeWidth="5" fill="#b99bdd">
            <path d="M160 118v24l-19 29q-4 13 10 13h33q14 0 10-13l-19-29v-24Z" />
            <path d="M225 140v10l-16 23q-3 11 10 11h31q13 0 9-11l-16-23v-10Z" />
          </g>
          <path d="M148 165h40l5 10q1 7-10 7h-31q-10 0-6-8Z" fill="#d5a4ee" />
          <g fill="#eac1d7">
            <circle cx="162" cy="99" r="7" />
            <circle cx="180" cy="84" r="5" />
            <circle cx="158" cy="66" r="3" />
          </g>
          <path d="M129 207h144" stroke="#705281" strokeWidth="12" />
        </g>
      )}
      {departmentId === "workshop" && (
        <g>
          <path d="M99 102h193v110H99Z" fill="#bfa1d5" />
          <path d="m85 106 47-63h135l42 63Z" fill="#76528f" />
          <path
            d="M119 127h62v48h-62Z"
            fill="#ffdfad"
            stroke="#80618e"
            strokeWidth="5"
          />
          <path d="M207 110h62v103h-62Z" fill="#684781" />
          <path d="M109 188h90" stroke="#573068" strokeWidth="12" />
          <path
            d="M124 146q13-10 26 0 12-10 25 0v21q-13-7-25 0-12-7-26 0Z"
            fill="#fff8f1"
            stroke="#b99bdd"
            strokeWidth="3"
          />
          <path
            d="m230 135-9 9 9 9m14-18 9 9-9 9"
            fill="none"
            stroke="#f6d99f"
            strokeWidth="3"
          />
          <path d="M243 171v27" stroke="#eac1d7" strokeWidth="4" />
        </g>
      )}
      {departmentId === "library" && (
        <g>
          <path d="M95 74h210v140H95Z" fill="#9e80b5" />
          <path d="m80 80 120-55 120 55Z" fill="#614275" />
          <rect x="111" y="91" width="178" height="110" fill="#3e2b50" />
          {[121, 176, 231].map((x) => (
            <g key={x}>
              <rect x={x} y="99" width="43" height="92" fill="#4a355b" />
              <path
                d={`M${x} 133h43m-43 31h43`}
                stroke="#c4a7d8"
                strokeWidth="4"
              />
              {[0, 1, 2].map((n) => (
                <g key={n}>
                  <path
                    d={`M${x + 8 + n * 12} 106v23m0 11v19m0 12v17`}
                    stroke={n === 1 ? "#eac1d7" : "#d9b76e"}
                    strokeWidth="7"
                  />
                </g>
              ))}
            </g>
          ))}
          <path
            d="m213 64 15-6 16 6v19l-16-6-15 6Z"
            fill="#fbe5b1"
            stroke="#d9b76e"
            strokeWidth="2"
            transform="rotate(-12 228 70)"
          />
        </g>
      )}
      {departmentId === "observatory" && (
        <g>
          <path d="M134 123h136v90H134Z" fill="#b99bdd" />
          <path
            d="M120 125a83 83 0 0 1 166 0Z"
            fill="#74588f"
            stroke="#c5a5e1"
            strokeWidth="5"
          />
          <path
            d="M202 45v78m-37-65q-27 33-25 65m101-65q27 33 25 65"
            fill="none"
            stroke="#a186ba"
            strokeWidth="3"
          />
          <path d="M163 143h75v58h-75Z" fill="#453053" />
          <path d="m172 169 63-31 7 14-63 30Z" fill="#d9b76e" />
          <path
            d="m206 168-14 35m14-35 15 35"
            stroke="#eac1d7"
            strokeWidth="4"
          />
          <ellipse cx="202" cy="125" rx="84" ry="9" fill="#c5a5e1" />
          <path
            d="m105 77 33-32 42 7"
            fill="none"
            stroke="#e9ddf5"
            opacity=".5"
          />
          <g fill="#e9ddf5">
            <circle cx="105" cy="77" r="3" />
            <circle cx="138" cy="45" r="3" />
            <circle cx="180" cy="52" r="3" />
          </g>
        </g>
      )}
      {departmentId === "tower" && (
        <g>
          <path d="M143 81h119v132H143Z" fill="#a98dc1" />
          <path d="M135 57h27v17h24V57h29v17h24V57h29v34H135Z" fill="#d4bdeb" />
          <path d="M168 109h17v30h-17Zm52 0h17v30h-17Z" fill="#ffe3aa" />
          <path d="M176 209v-44a26 26 0 0 1 52 0v44" fill="#64447d" />
          <path
            d="m202 129 31 11v25q0 25-31 37-31-12-31-37v-25Z"
            fill="#c6b4e9"
            stroke="#f6dfa9"
            strokeWidth="4"
          />
          <path
            d="m187 161 11 11 19-23"
            fill="none"
            stroke="#684084"
            strokeWidth="5"
          />
          <path d="M150 93v119m104-119v119" stroke="#8d6fa4" strokeWidth="4" />
        </g>
      )}
      {departmentId === "sanctum" && (
        <g>
          <path d="M123 126h160v86H123Z" fill="#b99bdd" />
          <path
            d="M100 106h40v106h-40Zm165 0h40v106h-40ZM179 74h47v138h-47Z"
            fill="#c9b0e5"
          />
          <path
            d="m93 109 27-61 27 61Zm166 0 26-61 27 61ZM168 78l34-66 35 66Z"
            fill="#725088"
          />
          <g fill="#ffe6aa">
            <path d="M114 132h12v25h-12Zm165 0h12v25h-12Zm-83-45h13v24h-13Z" />
            <path d="M186 212v-38a17 17 0 0 1 34 0v38Z" />
          </g>
          <path d="m202 12 29 9-29 9Z" fill="#eac1d7" />
          <path d="M94 211h218" stroke="#8b6ba4" strokeWidth="8" />
        </g>
      )}
      <g fill="#eac1d7">
        <circle cx="78" cy="209" r="8" />
        <circle cx="65" cy="215" r="6" />
        <circle cx="324" cy="213" r="8" />
        <circle cx="338" cy="220" r="5" />
      </g>
      <g fill="#d9b76e">
        <path d="m81 143 4 7-4 12-4-12Zm235 11 4 7-4 12-4-12Z" />
      </g>
    </svg>
  );
}
