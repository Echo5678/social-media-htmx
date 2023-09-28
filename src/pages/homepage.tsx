import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

export default function HomePage() {
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
          <div
            hx-get="/project-list"
            hx-swap="outerHTML"
            hx-trigger="load"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row"
          >
            <div class="p-5 rounded-lg w-full h-[250px] animate-pulse bg-zinc-300 dark:bg-zinc-700 flex flex-col  space-y-4">
              <div class="flex space-x-3 items-center">
                <div class="bg-[#f9f9f9] dark:bg-[313131] shadow-lg rounded-full h-[20px] w-[20px]"></div>
                <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[10px] w-[35px]"></div>
              </div>
              <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[15px] w-full"></div>
            </div>
            <div class="p-5 rounded-lg w-full h-[250px] animate-pulse bg-zinc-300 dark:bg-zinc-700 flex flex-col  space-y-4">
              <div class="flex space-x-3 items-center">
                <div class="bg-[#f9f9f9] dark:bg-[313131] shadow-lg rounded-full h-[20px] w-[20px]"></div>
                <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[10px] w-[35px]"></div>
              </div>
              <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[15px] w-full"></div>
            </div>
          </div>
        </main>
      </div>

      <Navbar />
    </>
  );
}
