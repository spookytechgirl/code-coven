export interface Challenge {
  id: string;
  title: string;
  instructions: string;
  rewardXP: number;
}
export interface Lesson {
  id: string;
  title: string;
  content: string;
  challenges: Challenge[];
}
export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}
export interface Course {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessonCount: number;
  modules: CourseModule[];
  accent: string;
}
export interface LearningPath {
  id: string;
  title: string;
  courseIds: string[];
}
export interface Department {
  id: string;
  title: string;
  subject: string;
  description: string;
  paths: LearningPath[];
}
