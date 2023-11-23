import { SelectProject } from "../db/schema";

import ProjectItem from "./project-item";

export default function ProjectList({
  projects,
  type,
}: {
  projects: SelectProject[];
  type?: string;
}) {
  return (
    <ul
      id="list"
      class={
        type === "single"
          ? "grid grid-cols-1 gap-4 grid-flow-row"
          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row"
      }
    >
      {projects.map((item, index) => (
        <ProjectItem
          item={item}
          skipAmount={10}
          skip={index === projects.length - 1}
        />
      ))}
    </ul>
  );
}
