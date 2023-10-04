import { ImagePlus } from "../../components/assets/imageplus";
import Navbar from "../../components/navbar";

export default function ProjectForm({
  username,
  image,
}: {
  username?: string;
  image?: string;
}) {
  return (
    <div class="flex">
      <Navbar username={username && username} image={image && image} />
      <main class="w-full h-full">
        <form
          class=" md:w-11/12 xl:w-3/4  mx-auto p-6 "
          hx-post="/project"
          hx-encoding="multipart/form-data"
          hx-swap="outerHTML"
          hx-target="#main"
          hx-replace-url="true"
          hx-trigger="submit"
          hx-target-400="#error-message"
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
          </div>
          <div class="flex flex-col  mt-6 md:pt-0">
            <label for="languages" class="font-medium">
              Choose the language(s):
            </label>
            <ul class="grid grid-cols-2 grid-rows-auto pt-2">
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="nocode"
                  id="nocode"
                  class="border-gray-300 dark:border-gray-600 h-5 w-5"
                />
                <label for="nocode">No Code</label>
              </li>
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="c"
                  id="c"
                  class="border-gray-300 dark:border-gray-600 rounded h-5 w-5"
                />
                <label for="c">C</label>
              </li>
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="rust"
                  id="rust"
                  class="border-gray-300 dark:border-gray-600 rounded h-5 w-5"
                />
                <label for="rust">Rust</label>
              </li>
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="go"
                  id="go"
                  class="border-gray-300 dark:border-gray-600 rounded h-5 w-5"
                />
                <label for="go">Go</label>
              </li>
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="javascript"
                  id="javascript"
                  class="border-gray-300 dark:border-gray-600 rounded h-5 w-5"
                />
                <label for="javascript">JavaScript</label>
              </li>
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="python"
                  id="python"
                  class="border-gray-300 dark:border-gray-600 rounded h-5 w-5"
                />
                <label for="python">Python</label>
              </li>
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="haskell"
                  id="haskell"
                  class="border-gray-300 dark:border-gray-600 rounded h-5 w-5"
                />
                <label for="haskell">Java</label>
              </li>
              <li class="space-x-2 font-medium flex items-center">
                <input
                  type="checkbox"
                  name="mojo"
                  id="mojo"
                  class="border-gray-300 dark:border-gray-600 rounded h-5 w-5"
                />
                <label for="mojo">Other</label>
              </li>
            </ul>
          </div>
          <div class="pt-6">
            <label class="font-medium" for="categories">
              Categories
            </label>
            <input
              id="categories"
              type="text"
              name="categories"
              class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500"
            />
            <p class="pt-2 pb-3 text-[#444444] dark:text-[#B1B1B1]">
              What category is your product?
            </p>
          </div>
          <div class="pt-4">
            <label class="font-medium" for="brief-description">
              Brief description
            </label>
            <input
              id="brief-description"
              type="text"
              name="brief-description"
              class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500"
            />
            <p class="pt-2 text-[#444444] dark:text-[#B1B1B1]">
              Shortened description of your project.
            </p>
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
