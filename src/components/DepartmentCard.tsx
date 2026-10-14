import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Department } from "../types/curriculum";
import { DepartmentArtwork } from "./DepartmentArtwork";
import { departmentArtwork } from "../data/artwork";
export function DepartmentCard({
  department,
  index,
}: {
  department: Department;
  index: number;
}) {
  const artwork = departmentArtwork[department.id];
  return (
    <Link
      className="card department enchanted-destination"
      to={`/academy/${department.id}`}
    >
      <div className="destination-picture">
        <DepartmentArtwork departmentId={department.id} />
        <span className="destination-number" aria-hidden="true">
          0{index + 1}
        </span>
        {artwork?.placeholder && (
          <span className="artwork-label">Concept art · placeholder</span>
        )}
      </div>
      <div className="destination-copy">
        <h3>{department.title}</h3>
        <p>{department.subject}</p>
        <span className="department-explore">
          Explore department <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
