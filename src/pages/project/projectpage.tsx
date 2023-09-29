import Github from "../../components/assets/github";
import Instagram from "../../components/assets/instagram";
import PersonAddIcon from "../../components/assets/personaddicon";
import Twitter from "../../components/assets/twitter";
import Youtube from "../../components/assets/youtube";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import { SelectProject } from "../../db/schema";
import { BaseHtml } from "../base/basehtml";

const ProjectPage = ({
  project,
  username,
  image,
}: {
  project: SelectProject;
  username?: string;
  image?: string;
}) => {
  return (
    <div
      class="flex"
      hx-patch={`/remove/project/${project.id}`}
      hx-swap="outerHTML"
    >
      <SideBar username={username && username} image={image && image} />
      <div class="flex  flex-col w-full bg-[#fcfcfc] dark:bg-[#111111]">
        <header class="flex w-full bg-zinc-100 dark:bg-black top-0 py-5 md:py-7 justify-between items-center px-6 md:px-10 xl:px-14">
          <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {project.name}
          </h1>
          <div class="flex items-center space-x-3">
            <button class="flex text-sm font-medium border border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white">
              <PersonAddIcon />
            </button>
            <button class="flex text-sm font-medium border border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white">
              <Github />
            </button>
            <button class="bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg text-center px-5 py-[10px]">
              Visit
            </button>
          </div>
        </header>
        <main class="flex flex-col items-center px-6 md:px-10 xl:px-14 h-full">
          <div class=" flex flex-col md:flex-row justify-between w-full">
            <div class="text-center md:text-left pt-10">
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-medium">
                Investments and Economical
              </h1>
              <p class="text-[#444444] dark:text-[#B1B1B1]  pt-3 md:pr-1">
                The new way to monitor and document transactions and investments
              </p>
            </div>
            <div class="flex items-center md:items-end md:items-end mx-auto md:mx-0 pt-6 space-x-4 md:pt-0">
              <button class="flex text-sm font-medium border bg-white dark:bg-black border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white">
                <Instagram />
              </button>
              <button class="flex text-sm font-medium border  bg-white dark:bg-black border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white">
                <Twitter />
              </button>
              <button class="flex text-sm font-medium border bg-white dark:bg-black border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white">
                <Youtube />
              </button>
            </div>
          </div>
          <div class="flex items-center  bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full  mt-10">
            <div class="flex flex-col md:flex-row w-full py-4">
              <img
                alt="Project Image"
                src={project.image}
                class="px-6 pb-4  md:w-1/2"
              />
              <div class="flex flex-col items-left pt-3 space-y-3 px-6">
                <div class="flex flex-col">
                  <p class="text-lg md:text-xl font-medium">Description</p>
                  <p class="text-[#444444] dark:text-[#B1B1B1] line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <div class="flex flex-col">
                  <p class="text-lg md:text-xl font-medium">Languages</p>
                  <div class="text-[#444444] dark:text-[#B1B1B1]">
                    {project.languages?.map((item) => (
                      <p>{item}</p>
                    ))}
                  </div>
                </div>
                <div class="flex flex-col">
                  <p class="text-lg md:text-xl font-medium">Collaborators</p>
                  <div class="text-[#444444] dark:text-[#B1B1B1]">
                    {project.collaborators?.map((item) => (
                      <p class="mr-[2%] lg:text-[1.6vh]">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-lg  mx-auto w-full p-3 mt-10 mb-20 text-center">
            <p class="text-3xl font-bold">Technologies</p>
            <div class="flex flex-row flex-wrap space-x-5 text-[#444444] dark:text-[#B1B1B1] justify-center pt-2">
              <p>Bun</p>
              <p>Elysia</p>
              <p>Turso</p>
              <p>HTMX</p>
              <p>Drizzle</p>
              <p>Tailwind</p>
            </div>
          </div>
          <button
            class="bg-[#ea5851] text-white dark:bg-[#ea5851] dark:text-white font-medium rounded-lg text-center px-5 py-[10px]"
            type="sumbit"
          >
            Delete project
          </button>
        </main>
      </div>
      <Navbar username={username && username} image={image && image} />
    </div>
  );
};

export default ProjectPage;
