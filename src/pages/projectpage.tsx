import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";
import { SelectProject } from "../db/schema";
import { BaseHtml } from "./base/basehtml";

const ProjectPage = ({ project }: { project: SelectProject }) => {
  return (
    <BaseHtml>
      <div class="flex">
        <SideBar />
        <main>
          <h1 class="text-3xl  md:text-5xl font-semibold p-10">
            {project.name}
          </h1>
        </main>
        <Navbar />
      </div>
    </BaseHtml>
  );
};

export default ProjectPage;
