import Navbar from "../components/navbar";
import SearchBar from "../components/searchbar";

export default function HomePage({
  username,
  image,
}: {
  username?: string;
  image?: string;
}) {
  return (
    <>
      <div class="flex">
        <Navbar username={username && username} image={image && image} />
        <main id="page" class="w-full px-6">
          <h1 class="text-xl font-bold py-3">Home</h1>
          <SearchBar />
          <nav
            id="tabs"
            hx-target="#list"
            role="tablist"
            _="on htmx:afterOnLoad set @aria-selected of <[aria-selected=true]/> to false tell the target take .selected-home-tab set @aria-selected to true"
            class="text-[#444444] dark:text-[#B1B1B1] font-medium flex space-x-6 items-center justify-between pt-2 px-[25%] mb-6"
          >
            <button
              role="tab"
              aria-controls="tab-content"
              aria-selected="true"
              hx-get="/project-list"
              hx-swap="outerHTML"
              class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer selected-home-tab"
            >
              Projects
            </button>
            <button
              role="tab"
              aria-controls="tab-content"
              aria-selected="false"
              hx-get="/blog-list"
              hx-swap="outerHTML"
              class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer"
            >
              Media
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
    </>
  );
}
