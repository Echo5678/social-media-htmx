import Header from "../components/header";

export default function LandingPage() {
  return (
    <main class="px-8">
      <Header />
      <h1 class="text-7xl sm:text-8xl md:text-9xl text-center font-bold mt-12">
        <span class="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Brainstorm.
        </span>
        <span class="block">Collaborate.</span>
        Create.
      </h1>
      <div
        hx-boost="true"
        class="flex items-center justify-center my-6 space-x-6 font-semibold"
      >
        <a
          href="/login"
          preload="mouseover"
          hx-push-url="true"
          class="dark:text-[#1e1e1e] bg-black text-white dark:bg-white py-1.5 px-4 rounded-md hover:dark:bg-zinc-100 hover:bg-zinc-900 active:shadow-inner"
        >
          Start Collaborating
        </a>
        <a
          href="/pricing"
          preload="mouseover"
          hx-push-url="true"
          class="text-[#444444] dark:text-[#B1B1B1] border border-[#444444] dark:border-[#B1B1B1] py-1.5 px-4 rounded-md hover:bg-zinc-100 hover:dark:bg-zinc-900 active:shadow-inner"
        >
          Try for free
        </a>
      </div>
      <p class="text-center text-[#444444] dark:text-[#B1B1B1] mb-8 mt-6">
        Co-Dev allows developers to collaborate on projects in a more social
        environment.
      </p>
      <div class="xl:px-48">
        <h3 class="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-10">
          Start with an idea
        </h3>
        <div class="grid grid-flow-row md:grid-cols-2 space-y-4 mt-4 text-[#444444] dark:text-[#B1B1B1] gap-x-12 md:space-y-0 mb-8">
          <p class="row-span-1 md:col-span-1">
            Every project starts with a problem that needs to be solved. Co-Dev
            is a place for you to share your ideas and find other developers who
            are interested. Find developers who fit your projects needs, don't
            know how to program a backend in Node.js? No problem find a someone
            who can.
          </p>
          <p class="row-span-1 md:col-span-1">
            Co-Dev allows developers who are interested in your idea help bring
            your dream to reality. Easily communicate through Voice Chat or
            Instant Messaging. Assign tasks through the Project Management UI.
          </p>
        </div>
        <div class="grid grid-flow-row md:grid-cols-2 mt-4 space-y-4 gap-x-12  md:space-y-0">
          <div class="row-span-1 md:col-span-1 bg-zinc-900 rounded-md px-2">
            <div class="flex space-x-2 py-3">
              <div class="bg-red-500 w-5 h-5 rounded-full"></div>
              <div class="bg-yellow-500 w-5 h-5 rounded-full"></div>
              <div class="bg-green-500 w-5 h-5 rounded-full"></div>
            </div>
            <div>
              <div class="flex">
                <div class="p-2  rounded-full bg-black w-fit"></div>
                <div class="py-2 px-2">
                  <div class="h-2 bg-white w-14 rounded-lg"></div>
                  <div class="h-2 mt-2 bg-zinc-800 w-20 rounded-lg"></div>
                </div>
              </div>
              <div class="bg-zinc-800 h-10 md:h-20 rounded-md my-2"></div>
            </div>
          </div>
          <div class="row-span-1 md:col-span-1 flex flex-col space-y-2 mt-6">
            <h3 class="text-xl sm:text-2xl md:text-3xl font-semibold">
              Start with an idea
            </h3>
            <p class="text-[#444444] dark:text-[#B1B1B1]">
              Create your dream project with professional developers or help a
              beginner.
            </p>
            <h3 class="text-xl sm:text-2xl md:text-3xl font-semibold">
              Plan your dream project
            </h3>
            <p class="text-[#444444] dark:text-[#B1B1B1]">
              Easily plan, and manage your project.
            </p>
          </div>
        </div>
      </div>
      <div class="xl:px-48 mt-8">
        <h3 class="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-10">
          Bring your dreams to life
        </h3>
        <div class="grid grid-flow-row md:grid-cols-2 space-y-4 mt-4  text-[#444444] dark:text-[#B1B1B1] gap-x-12 md:space-y-0 mb-8">
          <p class="row-span-1 md:col-span-1">
            Collaborate with other developers to bring your dream project to
            life. Create any project of your imagination using any technology
            you'd like and plan out your project using Co-Dev.
          </p>
          <p class="row-span-1 md:col-span-1">
            Assign Tasks to users, manage bugs and product features with the
            easy to use Co-Dev Project Management UI.
          </p>
        </div>
        <div class="grid grid-flow-row md:grid-cols-2 mt-4 space-y-4 gap-x-12  md:space-y-0">
          <div class="row-span-1 md:col-span-1 bg-zinc-900 rounded-md px-2">
            <div class="flex space-x-2 py-3">
              <div class="bg-red-500 w-5 h-5 rounded-full"></div>
              <div class="bg-yellow-500 w-5 h-5 rounded-full"></div>
              <div class="bg-green-500 w-5 h-5 rounded-full"></div>
            </div>
            <div>
              <div class="flex">
                <h1 class="text-2xl text-white mb-3">Project</h1>
              </div>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <div class="bg-zinc-800 rounded-md text-white px-2 py-1">
                  <h3 class="font-medium">Task 1</h3>
                  <p class="text-sm text-[#B1B1B1]">
                    Fix bug in that one file.
                  </p>
                  <p class="text-sm font-medium text-green-500">Simple</p>
                </div>
                <div class="bg-zinc-800 rounded-md p-2">
                  <div class="w-1/2 bg-white h-2 rounded-lg"></div>
                  <div class=" bg-zinc-700 h-1/2 rounded-lg mt-2"></div>
                  <div class="w-1/4 bg-green-400 h-2 rounded-lg mt-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row-span-1 md:col-span-1 flex flex-col space-y-2">
            <h3 class="text-xl sm:text-2xl md:text-3xl font-semibold">
              Communicate
            </h3>
            <p class="text-[#444444] dark:text-[#B1B1B1]">
              Plan out your project using our Project Management UI and decide
              what each developer works on.
            </p>
            <h3 class="text-xl sm:text-2xl md:text-3xl font-semibold">
              Plan your dream project
            </h3>
            <p class="text-[#444444] dark:text-[#B1B1B1]">
              Easily plan, and manage your project.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
