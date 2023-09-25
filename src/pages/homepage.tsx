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
            <button
              hx-get="/project-list"
              hx-target="#list"
              hx-swap="outerHTML"
              class="font-medium text-lg pb-2 nav-link relative nav-link-active"
            >
              Projects
            </button>
            <button
              hx-get="/blog-list"
              hx-target="#list"
              hx-swap="outerHTML"
              class="font-medium text-lg pb-2 nav-link relative nav-link-active"
            >
              Blogs
            </button>
          </nav>
          <ProjectList projects={project} />
        </main>
      </div>

      <Navbar />
    </>
  );
}
