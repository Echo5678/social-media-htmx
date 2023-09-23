import FilterIcon from "../components/assets/filtericon";
import SearchIcon from "../components/assets/searchicon";
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
          <div class="w-full flex space-x-2 items-center mb-4">
            <div class="w-full px-2.5 border border-zinc-300 dark:border-zinc-800 rounded-md flex items-center space-x-2 bg-zinc-200 dark:bg-black">
              <SearchIcon />
              <input
                hx-get="/search-for"
                hx-trigger="keyup changed delay:250ms, search"
                hx-target="#list"
                hx-swap="outerHTML"
                type="search"
                id="search"
                name="search"
                maxlength="100"
                placeholder="Search your favorite topics"
                class="bg-transparent w-full outline-none py-1.5 flex-grow"
              />
            </div>
            <button class="bg-black text-white dark:bg-white dark:text-black py-[5.5px] px-3 rounded-md">
              <FilterIcon />
            </button>
          </div>

          <ProjectList project={projects} />
        </main>
      </div>

      <Navbar />
    </>
  );
}
