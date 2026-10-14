import { ArrowRight, BookOpen } from "lucide-react";
import { CourseIllustration } from "./CourseIllustration";
import { Link } from "react-router-dom";
import type { Course } from "../types/curriculum";
export function CourseCard({
  course,
  progress,
}: {
  course: Course;
  progress?: number;
}) {
  return (
    <article className="card course-card">
      <CourseIllustration course={course} />
      <div className="course-body">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="lesson-count">
          <BookOpen size={15} /> {course.lessonCount} planned lessons
        </div>
        {progress !== undefined && (
          <div className="progress-wrap">
            <div>
              <span>Demo progress</span>
              <strong>{progress}%</strong>
            </div>
            <progress
              value={progress}
              max={100}
              aria-label={`${course.title} demo progress`}
            />
          </div>
        )}
        <Link className="course-link" to={`/courses/${course.id}`}>
          {progress !== undefined ? "Continue Learning" : "Explore Course"}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
