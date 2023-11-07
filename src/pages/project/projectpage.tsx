import Github from "../../components/assets/github";
import Instagram from "../../components/assets/instagram";
import PersonAddIcon from "../../components/assets/personaddicon";
import Twitter from "../../components/assets/twitter";
import Youtube from "../../components/assets/youtube";
import Navbar from "../../components/navbar";
import { SelectProject } from "../../db/schema";

const ProjectPage = ({
  project,
  username,
  project_image,
  image,
}: {
  project: SelectProject;
  username?: string;
  project_image?: string;
  image?: string;
}) => {
  return (
    <div class="flex">
      <Navbar username={username && username} image={image && image} />
      <div class="flex  flex-col w-full bg-[#fcfcfc] dark:bg-[#111111]">
        <header class="flex w-full bg-zinc-100 dark:bg-black top-0 py-5 md:py-7 justify-between items-center px-6 md:px-10 xl:px-14">
          <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {project.name}
          </h1>
          <div class="flex items-center space-x-3">
            {username === project.username && (
              <a
                href={`/project/${project.id}/invite`}
                hx-boost="true"
                hx-push-url="true"
                class="flex text-sm font-medium border border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white"
              >
                <PersonAddIcon />
              </a>
            )}

            {project.github_repo && (
              <a
                target="_blank"
                href={project.github_repo}
                class="flex text-sm font-medium border border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white"
              >
                <Github />
              </a>
            )}

            {project.website_url && (
              <a
                target="_blank"
                href={project.website_url}
                class="bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg text-center px-5 py-[10px]"
              >
                Visit
              </a>
            )}
          </div>
        </header>
        <main class="flex flex-col items-center px-6 md:px-10 xl:px-14 h-full">
          <div class=" flex flex-col md:flex-row justify-between w-full">
            <div class="text-center md:text-left pt-10">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-medium">
                {project?.categories &&
                  project?.categories.map((cat, index) => (
                    <>
                      {index > 0 && <span class="px-2">and</span>}
                      <span>{cat}</span>
                    </>
                  ))}
              </h1>
              <p class="text-[#444444] dark:text-[#B1B1B1]  pt-3 md:pr-1">
                {project.brief_description}
              </p>
            </div>
            <div class="flex items-center md:items-end md:items-end mx-auto md:mx-0 pt-6 space-x-4 md:pt-0">
              {project?.instagram_username && (
                <a
                  href={`https://instagram.com/${project?.instagram_username}`}
                  aria-label="Project Instagram Page"
                  target="_blank"
                  class="flex text-sm font-medium border bg-white dark:bg-black border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white"
                >
                  <Instagram />
                </a>
              )}
              {project?.twitter_username && (
                <a
                  href={`https://twitter.com/${project?.twitter_username}`}
                  aria-label="Project Twitter Page"
                  target="_blank"
                  class="flex text-sm font-medium border  bg-white dark:bg-black border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white"
                >
                  <Twitter />
                </a>
              )}
              {project?.youtube_username && (
                <a
                  href={`https://youtube.com/${project?.youtube_username}`}
                  aria-label="Project Youtube Page"
                  target="_blank"
                  class="flex text-sm font-medium border bg-white dark:bg-black border-zinc-800 rounded-lg px-2 py-1 items-center text-black dark:text-white"
                >
                  <Youtube />
                </a>
              )}
            </div>
          </div>
          <div class="flex items-center  bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full  mt-10">
            <div class="flex flex-col md:flex-row w-full py-4">
              {project?.image && (
                <img
                  alt="Project Image"
                  src={`https://d20yxzu0sm1upk.cloudfront.net/${project.image}`}
                  class="px-6 pb-4  md:w-1/2"
                />
              )}

              <article class="flex flex-col items-left pt-3 space-y-3 px-6">
                <section class="flex flex-col">
                  <h2 class="text-lg md:text-xl font-medium">Description</h2>
                  <p class="text-[#444444] dark:text-[#B1B1B1] line-clamp-3">
                    {project.description}
                  </p>
                </section>
                <section class="flex flex-col">
                  <h2 class="text-lg md:text-xl font-medium">Languages</h2>
                  <ul class="text-[#444444] dark:text-[#B1B1B1] flex space-x-2">
                    {project.languages?.map((item, index) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </section>
              </article>
            </div>
          </div>
          <div class="flex flex-col bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-lg  mx-auto w-full p-3 mt-10 mb-20 text-center">
            <p class="text-3xl font-bold">Technologies</p>
            <div class="flex flex-row flex-wrap space-x-5 text-[#444444] dark:text-[#B1B1B1] justify-center pt-2">
              {project.technologies ? (
                project.technologies.map((tech) => <div>{tech}</div>)
              ) : (
                <div>Yay no libraries!</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectPage;
