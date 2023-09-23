import Calendar from "../components/assets/calendar";
import SettingsIcon from "../components/assets/settings";
import { SelectUser } from "../db/schema";

export default function ProfilePage({
  user,
  followers,
  following,
}: {
  user: SelectUser;
  followers: number;
  following: number;
}) {
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
      </div>
      <article class="text-sm border-x border-[#444444] dark:border-[#222222] pt-6 xl:pt-8  pl-2.5 items-center">
        <section class="text-white">
          <h1 class="text-2xl md:text-3xl font-bold">
            {`${user.first_name} ${user.last_name}`}
          </h1>
          <h2 class="text-[#444444] dark:text-[#B1B1B1]">@{user.username}</h2>
        </section>
        <section class="pr-2 py-1 w-full xl:w-[75%]">{user.bio}</section>
        <section class="flex flex-col text-[#444444] dark:text-[#B1B1B1]">
          <span class="mt-1">
            <Calendar className="inline" /> Joined {user.joined}
          </span>
          <ul class="flex space-x-3  mt-3">
            <li>
              <span class="dark:text-white text-black mr-1 font-medium">
                {followers}
              </span>
              Followers
            </li>
            <li>
              <span class="dark:text-white text-black mr-1 font-medium">
                {following}
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
