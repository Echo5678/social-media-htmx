import Calendar from "../components/assets/calendar";
import SettingsIcon from "../components/assets/settings";

export default function ProfilePage() {
  return (
    <main class="w-full md:w-3/4 xl:w-1/2 mx-auto">
      <div class="relative">
        <img
          src="https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          alt="Profile Banner Image"
          width="750"
          height="200"
          class="w-full h-[20vw] sm:h-[15vw] lg:h-[12.5vw] xl:h-[7.5vw] bg-black dark:bg-white"
        ></img>
        <img
          src="https://yt3.ggpht.com/dR6qqf39NiziFmXdMlYnRhVsrM2Qb0b9eQPNhoMICKvZ40Zdxb5zXkqKxX84k_yv7jXojhI1PQ=s108-c-k-c0x00ffffff-no-rj"
          width="75"
          height="75"
          class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 absolute -bottom-7 left-5 rounded-full"
          alt="Profile Picture"
        />
        <div class="absolute left-28 bottom-2">
          <h1 class="text-2xl  md:text-3xl font-semibold [text-shadow:_2px_3px_3px_rgb(0_0_0_/_40%)]">
            Echo Evader
          </h1>
          <h2 class="text-sm [text-shadow:_1px_2px_2px_rgb(0_0_0_/_40%)]">
            @echo
          </h2>
        </div>
      </div>
      <article class="text-sm text-[#444444] dark:text-[#B1B1B1] border-x border-[#444444] dark:border-[#222222] pt-6 xl:pt-8  pl-2.5 items-center">
        <section class="pr-2 py-1 w-full xl:w-[75%]">
          I'm a 16 year old Software Developer from Washington. I like Fried
          chicken and Eggs. I've worked on a couple projects a simple NextJS
          e-commerce website with CMS. As well as a Netflix clone also using
          NextJS with AWS.
        </section>
        <section class="flex flex-col">
          <span class="mt-1">
            <Calendar className="inline" /> Joined September, 2023
          </span>
          <ul class="flex space-x-3  mt-3">
            <li>
              <span class="dark:text-white text-black mr-1 font-medium">
                100
              </span>
              Followers
            </li>
            <li>
              <span class="dark:text-white text-black mr-1 font-medium">
                10
              </span>
              Following
            </li>
          </ul>
        </section>
      </article>
      <ul class="text-[#444444] dark:text-[#B1B1B1] border-[#444444] dark:border-[#222222] font-medium flex space-x-6 items-center border-b sm:border-x  sm:rounded-b-md justify-between pt-2 px-[25%] ">
        <li class="hover:text-white hover:border-white border-transparent border-b-2 py-3 hover:cursor-pointer">
          Posts
        </li>
        <li class="hover:text-white hover:border-white border-transparent border-b-2 py-3 hover:cursor-pointer">
          Media
        </li>
        <li class="self-end py-1.5">
          <SettingsIcon />
        </li>
      </ul>
    </main>
  );
}
