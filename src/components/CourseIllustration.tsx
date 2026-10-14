import { useId } from "react";
import type { Course } from "../types/curriculum";
import { courseArtwork, departmentArtwork } from "../data/artwork";
import { DepartmentArtwork } from "./DepartmentArtwork";
export function CourseIllustration({ course }: { course: Course }) {
  const id = useId().replaceAll(":", "");
  const artwork =
    courseArtwork[course.id] ?? departmentArtwork[course.departmentId];
  const kind = course.id;
  return (
    <div className={`course-art enchanted-course-art ${course.accent}`}>
      {artwork?.src ? (
        <img
          className="course-illustration"
          src={artwork.src}
          alt=""
          loading="lazy"
        />
      ) : kind === "python-potions" ||
        kind === "web-enchantment" ||
        kind === "ai-fundamentals" ? (
        <svg
          className="course-illustration"
          viewBox="0 0 400 220"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id={`${id}-glow`}>
              <stop stopColor="#b99bdd" stopOpacity=".7" />
              <stop offset="1" stopColor="#b99bdd" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="205" cy="120" r="111" fill={`url(#${id}-glow)`} />
          <g fill="#f5dca3">
            <path d="m87 91 3 8 8 3-8 3-3 8-3-8-8-3 8-3ZM319 87l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
          </g>
          <ellipse
            cx="205"
            cy="189"
            rx="100"
            ry="13"
            fill="#301b42"
            opacity=".15"
          />
          {kind === "python-potions" && (
            <g>
              <path
                d="M132 180q33-17 69 0 33-17 70 0v15q-34-12-70 0-34-12-69 0Z"
                fill="#eac1d7"
                stroke="#785087"
                strokeWidth="3"
              />
              <path
                d="M181 55h42v43l35 57q12 26-18 26h-74q-28 0-16-26l31-57Z"
                fill="#f5edf9"
                fillOpacity=".6"
                stroke="#d8c5ef"
                strokeWidth="5"
              />
              <path
                d="M166 133q39 13 73 0l15 26q7 17-17 17h-68q-23 0-15-17Z"
                fill="#bc82d7"
              />
              <path
                d="M179 54h47"
                stroke="#eac1d7"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <g fill="#eac1d7">
                <circle cx="195" cy="35" r="7" />
                <circle cx="218" cy="18" r="4" />
                <circle cx="180" cy="12" r="3" />
              </g>
              <path d="m188 140 15 6 15-6v15l-15 8-15-8Z" fill="#f9dfa9" />
            </g>
          )}
          {kind === "web-enchantment" && (
            <g>
              <path
                d="M108 116q47-24 94 0 46-24 94 0v64q-45-20-94 0-46-20-94 0Z"
                fill="#eac1d7"
                stroke="#b58dc9"
                strokeWidth="5"
              />
              <path
                d="M120 107q40-19 82 3 39-22 82-3v58q-38-13-82 3-39-16-82-3Z"
                fill="#fff8f1"
              />
              <path
                d="M202 111v62m-66-45 47 2m-47 12 47 2m38-16 47-3m-47 17 47-3"
                stroke="#b99bdd"
                strokeWidth="3"
              />
              <path
                d="m172 52-19 14 19 14m57-28 19 14-19 14m-39 3 18-37"
                fill="none"
                stroke="#f8dfa7"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="m125 83 5-21m151 18-5-21"
                stroke="#b99bdd"
                strokeWidth="3"
              />
            </g>
          )}
          {kind === "ai-fundamentals" && (
            <g>
              <ellipse cx="202" cy="178" rx="65" ry="10" fill="#d9b76e" />
              <path
                d="m202 48 43 48-10 59-33 30-33-30-10-59Z"
                fill="#cbb2e8"
                stroke="#f4ddab"
                strokeWidth="3"
              />
              <path d="m202 48-19 48 19 89 20-89Z" fill="#f0e2ff" />
              <path d="m159 96 24 0m39 0h23" stroke="#9873be" strokeWidth="2" />
              <g fill="none" stroke="#d9b76e" strokeWidth="2">
                <ellipse
                  cx="202"
                  cy="114"
                  rx="100"
                  ry="33"
                  transform="rotate(-20 202 114)"
                />
                <path d="m114 58 38-28 55 0 67 29" />
              </g>
              <g fill="#ffe5ad">
                <circle cx="114" cy="58" r="5" />
                <circle cx="152" cy="30" r="5" />
                <circle cx="207" cy="30" r="4" />
                <circle cx="274" cy="59" r="5" />
                <circle cx="287" cy="138" r="5" />
              </g>
            </g>
          )}
        </svg>
      ) : (
        <DepartmentArtwork departmentId={course.departmentId} />
      )}
      <span className="pill">{course.difficulty}</span>
      {artwork?.placeholder && (
        <span className="artwork-label">Concept art · placeholder</span>
      )}
    </div>
  );
}
