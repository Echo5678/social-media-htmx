import PersonAddIcon from "../../components/assets/personaddicon";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import { SelectProject } from "../../db/schema";
import { BaseHtml } from "../base/basehtml";

const ProjectPage = ({ project }: { project: SelectProject }) => {
  return (
    <BaseHtml>
      <div class="flex">
        <SideBar />
        <main class="flex  flex-col w-full bg-[#111111] h-[113vh] md:h-[100vh] overflow-y-scroll lg:overflow-hidden">
          <header class="flex w-[100%] bg-black top-0 h-[15vh] items-center">
            <div class="flex  flex-row justify-between items-center mx-auto w-[80%] md:w-[80%]">
              <h1 class="md:text-[4vh]  text-[1.8vh] font-semibold ">
                {project.name}
              </h1>
              <div class="flex flex-row justify-between w-[55%] md:w-[45%] xl:w-[40%] lg:w-[50%] items-center">
                {/* <button class="bg-white text-black h-[50%] p-[2%] rounded-lg">
                  Looking for Collabotors
                </button> */}
                <button class="flex hidden sm:block lg:bg-[#0a0a0a] lg:border-[1.5px] border-zinc-800 rounded-lg sm:h-[50%] lg:px-[5%] lg:py-[3%] items-center">
                  <PersonAddIcon />
                </button>

                <button class="flex text-[1.2vh] bg-[#0a0a0a] lg:text-[1.3vh] md:text-[1.3vh] font-bold border-[1.5px] border-zinc-800 rounded-lg text-white h-[50%] px-[10%] py-[5%] items-center">
                  Git Repository
                </button>
                <button class="flex bg-white text-[1.2vh] font-bold lg:text-[1.3vh] md:text-[1.3vh] rounded-lg text-black h-[50%] items-center px-[5%] py-[5%] lg:px-[10%] lg:py-[5%]">
                  Visit
                </button>
              </div>
            </div>
          </header>
          <div class=" flex flex-col justify-around items-center lg:h-full">
            <div class=" flex flex-col lg:flex-row items-center justify-between w-[90%] lg:w-[70%] h-[20vh] lg:h-[20%]">
              <div class="flex flex-col items-center text-center md:text-left justify-around h-[80%]">
                <h1 class="text-[2.5vh] md:text-[2.8vh] lg:text-[4vh]">
                  Investments and Economical
                </h1>
                <p class=" text-[#2f3336] text-[1.6vh] md:text-[2vh]">
                  The new way to monitor and document transactions and
                  investments
                </p>
              </div>
              <div class="flex flex-row w-[80%] lg:w-[30%] justify-between items-center">
                <button class="flex bg-[#0a0a0a] text-[1.5vh] font-bold border-[1.5px] border-zinc-800 rounded-lg text-white h-[50%] px-[5%] py-[5%] lg:py-[5%] items-center">
                  Instagram
                </button>
                <button class="flex bg-[#0a0a0a] text-[1.5vh] font-bold border-[1.5px] border-zinc-800 rounded-lg text-white h-[50%] px-[5%] py-[5%] lg:py-[5%] items-center">
                  Twitter
                </button>
                <button class="flex bg-[#0a0a0a] text-[1.5vh] font-bold border-[1.5px] border-zinc-800 rounded-lg text-white h-[50%] px-[5%] py-[5%] lg:py-[5%] items-center">
                  Youtube
                </button>
              </div>
            </div>
            <div class="flex justify-around items-center lg:w-[80%] md:w-[80%] lg:h-[50%] h-[55vh] bg-[#0a0a0a] border-[1px] border-zinc-800 rounded-lg  mx-auto">
              <div class="flex flex-row flex-col lg:flex-row lg:w-full">
                <img
                  alt="Project Image"
                  src={project.image}
                  class="w-[60%] mx-auto md:mx-none lg:w-[50%]"
                />
                <div class="flex flex-col justify-around items-left">
                  <div class="flex flex-col text-center lg:text-left justify-around">
                    <p class="text-[#2f3336] lg:text-[2vh] font-bold">
                      Description
                    </p>
                    <p class="w-[90%] text-[1.5vh] xl:text-[1.8vh] mx-auto md:mx-[0]">
                      {project.description}
                    </p>
                  </div>
                  <div class="flex flex-row w-full lg:w-[90%] lg:h-[50%] justify-between items-center">
                    <div class="flex flex-row mt-[5%] md:mt-none lg:flex-col w-full lg:w-[30%] justify-around lg:h-full">
                      <div class="flex flex-col justify-around">
                        <p class="text-[#2f3336] lg:text-[2vh] font-bold">
                          Languages
                        </p>
                        <div class="flex flex-col w-[90%] items-center md:text-left">
                          {project.languages?.map((item) => (
                            <p class="mr-[2%] lg:text-[1.6vh]">{item}</p>
                          ))}
                        </div>
                      </div>
                      <div class="flex flex-col justify-around">
                        <p class="text-[#2f3336] lg:text-[2vh] font-bold">
                          Collaborators
                        </p>
                        <div class="flex flex-col items-center lg:items-left lg:w-[90%]">
                          {project.collaborators?.map((item) => (
                            <p class="mr-[2%] lg:text-[1.6vh]">{item}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col hidden xl:flex justify-center lg:w-[70%] items-center h-full border-zinc-800 border-[2px] rounded-lg lg:pt-[5%]">
                      <p class="flex bg-white font-bold rounded-lg text-black lg:h-[25%] items-center lg:px-[10%] lg:py-[2%]">
                        Status
                      </p>
                      <div class="flex flex-row justify-center lg:h-full lg:w-full items-center">
                        <div class="flex flex-col flex-1 justify-center items-center lg:h-[60%]">
                          <div class="flex justify-center items-center border-zinc-800 border-[2px] bg-[#111111] flex-1 lg:h-[50%] lg:w-[55%] rounded-full">
                            1
                          </div>
                          <p class="font-bold">Design</p>
                        </div>
                        <div class="flex flex-col flex-1 justify-center items-center lg:h-[60%]">
                          <div class="flex justify-center items-center border-zinc-800 border-[2px] bg-[#111111] flex-1 lg:h-[50%] lg:w-[55%] rounded-full">
                            2
                          </div>
                          <p class="font-bold">Develop</p>
                        </div>
                        <div class="flex flex-col flex-1 justify-center items-center lg:h-[60%] ">
                          <div class="flex justify-center items-center border-zinc-800 border-[2px] bg-[#111111] flex-1 lg:h-[50%] lg:w-[55%] rounded-full">
                            3
                          </div>
                          <p class="font-bold">Deploy</p>
                        </div>
                        <div class="flex flex-col flex-1 justify-center items-center lg:h-[60%]">
                          <div class="flex justify-center items-center border-zinc-800 border-[2px] bg-[#111111] flex-1 lg:h-[50%] lg:w-[55%] rounded-full">
                            4
                          </div>
                          <p class="font-bold">Maintain</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row justify-around items-center mt-[5%] lg:mt-[0] w-full lg:w-[80%] h-[10vh] lg:h-[10%] bg-[#0a0a0a] border-[1px] border-zinc-800 rounded-lg  mx-auto">
              <p class="text-[#2f3336] lg:text-[2vh] font-bold">Technologies</p>
              <div class="flex flex-row flex-wrap justify-between w-[90%] md:w-[50%]">
                <p class="font-bold">Bun</p>
                <p class="font-bold">Elysia</p>
                <p class="font-bold">Turso</p>
                <p class="font-bold">HTMX</p>
                <p class="font-bold">Drizzle</p>
                <p class="font-bold">Tailwind</p>
              </div>
            </div>
          </div>
        </main>
        <Navbar />
      </div>
    </BaseHtml>
  );
};

export default ProjectPage;
