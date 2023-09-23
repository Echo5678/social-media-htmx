import Navbar from "../components/navbar";
import ProjectList from "../components/projectlist";
import SideBar from "../components/sidebar";

import { SelectProject } from "../db/schema";

export default function SearchPage({
  projects,
}: {
  projects: SelectProject[];
}) {
  return (
    <>
      <div class="flex">
        <SideBar />
        <main id="page" class="w-full px-6">
          <h1 class="text-xl font-bold py-3">Search</h1>
          <div class="pb-6 w-full">
            <input
              hx-get="/search-for"
              hx-trigger="keyup changed delay:500ms, search"
              hx-target="#list"
              hx-swap="outerHTML"
              type="search"
              id="search"
              name="search"
              maxlength="100"
              placeholder="Search your favorite topics"
              class="bg-transparent w-full py-1.5 px-2.5 outline-none border border-zinc-300 dark:border-zinc-800 rounded-md"
            />
          </div>

          <ProjectList project={projects} />
        </main>
      </div>

      <Navbar />
    </>
  );
}
