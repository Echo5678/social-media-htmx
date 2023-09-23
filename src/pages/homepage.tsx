import Navbar from "../components/navbar";
import ProjectList from "../components/projectlist";
import SideBar from "../components/sidebar";
import { SelectProject } from "../db/schema";

export default function HomePage({ project }: { project: SelectProject[] }) {
  return (
    <>
      <div class="flex">
        <SideBar />
        <main id="page" class="w-full px-6">
          <h1 class="text-xl font-bold py-3">Home</h1>
          <nav class="pb-3 flex space-x-6">
            <a
              href="/home/projects"
              class="font-medium text-lg pb-2 nav-link relative nav-link-active"
            >
              Projects
            </a>
            <a
              href="/home/projects"
              class=" text-lg border-white pb-2 nav-link  relative"
            >
              Blogs
            </a>
          </nav>
          <ProjectList project={project} />
        </main>
      </div>

      <Navbar />
    </>
  );
}
