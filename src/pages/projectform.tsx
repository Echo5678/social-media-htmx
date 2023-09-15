export default function ProjectForm() {
  return (
    <form class=" md:w-3/4 xl:w-2/3  mx-auto p-6 " hx-post="/project">
      <header>
        <h1 class="font-medium text-3xl">Create a Project</h1>
        <span class="block text-[#444444] dark:text-[#B1B1B1] pt-2 text-sm">
          A Project is a description of your idea and the technologies that will
          be used to create it.
        </span>
      </header>
      <div class="w-[90%] mx-auto h-[1px] bg-zinc-200 dark:bg-zinc-800 mt-3 mb-2"></div>
      <div>
        <label class="font-medium" for="name">
          Project name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1"
        />
        <p class="pt-2 pb-3">
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
          class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full block mt-1.5 p-1"
        />
      </div>
      <div class="w-[90%] mx-auto h-[1px] bg-zinc-200 dark:bg-zinc-800 mt-6 mb-2"></div>
      <div class="flex flex-col md:flex-row md:justify-between  mt-4">
        <div>
          <div>
            <input
              type="radio"
              id="public"
              name="privacy"
              value="public"
              class="hidden"
              checked
            />
            <label for="public" class="flex items-center cursor-pointer">
              <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
              <div class="flex flex-col pl-3">
                <h2 class="text-lg font-semibold">Public</h2>
                <p class="text-[#444444] dark:text-[#B1B1B1]">
                  Anyone can see my amazing project.
                </p>
              </div>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="private"
              name="privacy"
              value="private"
              class="hidden"
            />
            <label for="private" class="flex items-center cursor-pointer">
              <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
              <div class="flex flex-col pl-3">
                <h2 class="text-lg font-semibold">Private</h2>
                <p class="text-[#444444] dark:text-[#B1B1B1]">
                  Only I can see my amazing project
                </p>
              </div>
            </label>
          </div>
        </div>
        <div class="flex flex-col  pt-6 md:pt-0 md:px-6">
          <label for="languages" class="font-medium">
            Choose a Language:
          </label>
          <select
            id="languages"
            class="appearance-none px-2 py-3 bg-transparent outline-none border border-zinc-200 dark:border-zinc-800  block text-[#444444] dark:text-[#B1B1B1]  rounded-md w-full text-center mt-3"
            name="language"
          >
            <option value="No Code">No Code</option>
            <option value="C/C++">C/C++</option>
            <option value="Rust">Rust</option>
            <option value="Go">Go</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Haskell">Haskell</option>
            <option value="Mojo">Mojo</option>
          </select>
        </div>
      </div>
      <div class="w-[90%] mx-auto h-[1px] bg-zinc-200 dark:bg-zinc-800 mt-3 mb-2"></div>
      <div class="justify-end flex">
        <button
          class="bg-black text-white dark:bg-white dark:text-black px-3 py-2 rounded-md  font-semibold mt-2"
          type="submit"
        >
          Create project
        </button>
      </div>
    </form>
  );
}
