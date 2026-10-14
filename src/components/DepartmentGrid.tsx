import { departments } from "../data/curriculum";
import { DepartmentCard } from "./DepartmentCard";
export function DepartmentGrid() {
  return (
    <div className="department-grid">
      {departments.map((department, index) => (
        <DepartmentCard
          key={department.id}
          department={department}
          index={index}
        />
      ))}
    </div>
  );
}
