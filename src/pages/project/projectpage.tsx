<<<<<<< HEAD:src/pages/projectpage.tsx
import PersonAddIcon from "../components/assets/personaddicon";
import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";
import { SelectProject } from "../db/schema";
import { BaseHtml } from "./basehtml";
=======
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import { SelectProject } from "../../db/schema";
import { BaseHtml } from "../base/basehtml";
>>>>>>> c5818e445e37f121271913b4c8995ab3e8d58e77:src/pages/project/projectpage.tsx

const ProjectPage = ({ project }: { project: SelectProject }) => {
  return (
    <BaseHtml>
      <div class="flex">
        <SideBar />
        <main class="flex justify-center items-center w-full">
          <div class="flex justify-around items-center flex-col bg-black w-[90%] h-[80%] border-white border-[1px] rounded-lg pb-[2%]">
            <div class="flex  flex-row justify-between w-[90%]">
              <h1 class="lg:text-[2vh]  md:text-5xl font-semibold p-10">
                {project.name}
              </h1>
              <div class="flex flex-row justify-between lg:w-[30%] items-center">
                {/* <button class="bg-white text-black h-[50%] p-[2%] rounded-lg">
                  Looking for Collabotors
                </button> */}
                <PersonAddIcon />
                <button class="flex bg-white rounded-lg text-black h-[50%] lg:px-[15%] items-center">
                  Github
                </button>
                <button class="flex bg-white rounded-lg text-black h-[50%] items-center lg:px-[15%]">
                  Visit
                </button>
              </div>
            </div>
            <div class="flex flex-row justify-between items-center w-[90%]">
              <div class="flex flex-col border-[1px] border-zinc-800 rounded-lg w-[65%] h-[30vh] justify-around items-center">
                <h1 class="text-[2vh] w-[90%] font-bold">Description</h1>
                <p class="w-[90%] text-[2vh]">{project.description}</p>
              </div>
              <div class="flex flex-col border-[1px] border-zinc-800 rounded-lg w-[30%] h-[30vh] justify-around items-center">
                <h1 class="text-[2vh] font-bold">Languages</h1>
                <p class="text-[2vh]">Javascript</p>
                <p class="text-[2vh]">C#</p>
              </div>
            </div>
            <div class="flex justify-between items-center w-[90%]">
              <div class="border-[1px] border-zinc-800 w-[65%] h-[30vh] rounded-lg flex flex-row items-center">
                <div class="flex flex-col justify-center items-center w-[25%] h-full">
                  <div class="lg:w-[30%] lg:h-[20%] rounded-full flex bg-white justify-center items-center text-black">
                    1
                  </div>
                  <p class="hidden">Create</p>
                </div>
                <div class="bg-white lg:w-[10%] mx-[-10%] h-[10px]"></div>
                <div class="flex flex-col justify-center items-center w-[25%] h-full">
                  <div class="lg:w-[30%] lg:h-[20%] rounded-full flex bg-white justify-center items-center text-black">
                    2
                  </div>
                  <p class="hidden">Something else</p>
                </div>
                <div class="bg-white lg:w-[10%] mx-[-10%] h-[10px]"></div>
                <div class="flex flex-col justify-center items-center w-[25%] h-full">
                  <div class="lg:w-[30%] lg:h-[20%] rounded-full flex bg-white justify-center items-center text-black">
                    3
                  </div>
                  <p class="hidden">Another Thing</p>
                </div>
                <div class="bg-white lg:w-[10%] mx-[-10%] h-[10px]"></div>
                <div class="flex flex-col justify-center items-center w-[25%] h-full">
                  <div class="lg:w-[30%] lg:h-[20%] rounded-full flex bg-white justify-center items-center text-black">
                    4
                  </div>
                  <p class="hidden">Deploy</p>
                </div>
              </div>
              <div class="flex flex-col border-[1px] border-zinc-800 rounded-lg w-[30%] h-[30vh] justify-around items-center">
                <h1 class="text-[2vh] font-bold">Collaborators</h1>
                <p class="text-[2vh]">Echo</p>
                <p class="text-[2vh]">Elijah McCoy</p>
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
