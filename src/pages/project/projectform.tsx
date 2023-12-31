import { ImagePlus } from "../../components/assets/imageplus";
import Navbar from "../../components/navbar";

export default function ProjectForm({
  username,
  image,
}: {
  username?: string;
  image?: string;
}) {
  const languages = [
    "C",
    "Python",
    "rust",
    "Javascript",
    "Java",
    "Go",
    "No code",
    "Other",
    "Haskell",
    "Node",
    "Mojo",
    "Haskell",
    "Lisp",
  ];

  const categories = [
    "Technology",
    "Gaming",
    "Photography",
    "Educational",
    "Informative",
    "Business",
    "Startup",
  ];
  return (
    <div class="flex">
      <Navbar username={username && username} image={image && image} />
      <main class="w-full h-full pb-28">
        <form
          class=" md:w-11/12 xl:w-3/4  mx-auto p-6 "
          hx-post="/project"
          hx-encoding="multipart/form-data"
          hx-swap="outerHTML"
          hx-target="#main"
          hx-replace-url="true"
          hx-trigger="submit"
          hx-target-400="#error-message"
          autocomplete="off"
        >
          <div id="error-message"></div>
          <header>
            <h1 class="font-medium text-3xl">Create a Project</h1>
            <span class="block text-[#444444] dark:text-[#B1B1B1] pt-2 text-sm">
              A Project is a description of your idea and the categories that
              will be used to create it.
            </span>
          </header>
          <div class="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 mt-3 mb-2"></div>
          <div class="pt-2">
            <label class="font-medium" for="name">
              Project name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500"
            />
            <p class="pt-1 pb-4 text-[#444444] dark:text-[#B1B1B1]">
              Good Project names are simple and creative. Keep it simple.
            </p>
            <label class="font-medium" for="description">
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              maxlength="1000"
              class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full block mt-1.5 p-1 focus:border-blue-500"
            />
            <p class="pt-1 pb-3 text-[#444444] dark:text-[#B1B1B1]">
              Give a good description of the problem your project is trying to
              solve.
            </p>
            <label class="font-medium" for="brief-description">
              Brief description
            </label>
            <input
              id="brief-description"
              type="text"
              name="brief_description"
              class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500"
            />
            <p class="pt-2 text-[#444444] dark:text-[#B1B1B1]">
              Shortened description of your project.
            </p>
          </div>
          <div class="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 mt-3 mb-2"></div>
          <div class="flex flex-col  mt-6 md:pt-0">
            <label for="languages" class="font-medium">
              Choose the language(s):
            </label>
            <ul
              id="languages"
              class="grid grid-cols-2 grid-rows-auto pt-2 gap-y-4 h-[175px] custom-scrollbar overflow-y-scroll"
            >
              {languages.map((item) => (
                <li class="space-x-2 font-medium flex items-center">
                  <input
                    type="checkbox"
                    name="languages"
                    value={item}
                    id={item}
                    class="opacity-0 absolute h-8 w-8"
                  />
                  <div class="bg-transparent border-2 rounded-md border-black dark:border-white w-[27.5px] h-[27.5px] flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                    <svg
                      class="fill-current hidden text-black dark:text-white pointer-events-none h-[22.5px] w-[22.5px]"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="currentColor">
                        <g fill="currentColor">
                          <path d="m20.076 6.207c.566.552 .566 1.444 0 1.996l-9.404 9.176c-.282.275-.652.414-1.023.414-.37 0-.741-.139-1.023-.414l-4.702-4.588c-.566-.552-.566-1.444 0-1.996.566-.552 1.48-.552 2.046 0l3.679 3.59 8.381-8.178c.566-.552 1.48-.552 2.046 0z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <label for={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div class="pt-2">
            <label class="font-medium" for="technologies">
              Technologies
            </label>
            <input
              id="technologies"
              type="text"
              name="technologies"
              class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500"
            />
            <p class="pt-2 text-[#444444] dark:text-[#B1B1B1]">
              Provide list of any Frameworks or third party libraries being
              used.
            </p>
          </div>
          <div class="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 mt-3 mb-2"></div>
          <div class="pt-6">
            <label class="font-medium" for="categories">
              Categories
            </label>
            <ul
              id="categories"
              class="grid grid-cols-2 grid-rows-auto pt-2 gap-y-4 h-[175px] custom-scrollbar overflow-y-scroll"
            >
              {categories.map((item) => (
                <li class="space-x-2 font-medium flex items-center">
                  <input
                    type="checkbox"
                    name="categories"
                    value={item}
                    id={item}
                    class="opacity-0 absolute h-8 w-8"
                  />
                  <div class="bg-transparent border-2 rounded-md border-black dark:border-white w-[27.5px] h-[27.5px] flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                    <svg
                      class="fill-current hidden text-black dark:text-white pointer-events-none h-[22.5px] w-[22.5px]"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="currentColor">
                        <g fill="currentColor">
                          <path d="m20.076 6.207c.566.552 .566 1.444 0 1.996l-9.404 9.176c-.282.275-.652.414-1.023.414-.37 0-.741-.139-1.023-.414l-4.702-4.588c-.566-.552-.566-1.444 0-1.996.566-.552 1.48-.552 2.046 0l3.679 3.59 8.381-8.178c.566-.552 1.48-.552 2.046 0z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <label for={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div class="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 mt-3 mb-2"></div>
          <div class="flex justify-between">
            <div>
              <label class="text-blue-500 hover:cursor-pointer" for="image">
                <ImagePlus />
              </label>
              <input
                id="image"
                type="file"
                accept="image/png image/jpeg image/jpg"
                name="image"
                alt="Project Thumbnail"
                class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500 hidden"
              />
            </div>

            <div class="flex">
              <button
                class="bg-black text-white dark:bg-white dark:text-black px-3 py-2 rounded-md  font-semibold mt-2"
                type="submit"
              >
                Create project
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
