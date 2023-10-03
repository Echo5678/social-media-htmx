import Calendar from "../components/assets/calendar";
import ProfilePlaceHolder from "../components/assets/profileplaceholder";
import SettingsIcon from "../components/assets/settings";
import Verified from "../components/assets/verified";
import Navbar from "../components/navbar";
import { SelectProject, SelectUser } from "../db/schema";

export default function ProfilePage({
  user,
  followers,
  following,
  posts,
  isFollowing,
  isUserAccount,
  backgroundImage,
  username,
  image,
}: {
  user: SelectUser;
  followers: number;
  following: number;
  posts: SelectProject[];
  isFollowing: boolean;
  isUserAccount: boolean;
  backgroundImage?: string;
  username?: string;
  image?: string;
}) {
  return (
    <div class="flex">
      <Navbar username={username} image={image && image} />
      <div class="w-full h-full">
        <header class="w-full md:w-3/4 xl:w-1/2 mx-auto">
          <div class="relative">
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt="Profile Banner Image"
                width="750"
                height="200"
                class="w-full h-[20vw] sm:h-[15vw] lg:h-[12.5vw] xl:h-[7.5vw] bg-black dark:bg-white"
              ></img>
            ) : (
              <div class="w-full h-[20vw] sm:h-[15vw] lg:h-[12.5vw] xl:h-[7.5vw] bg-zinc-300 dark:bg-zinc-800"></div>
            )}
            {user.profile_picture ? (
              <img
                src={user.profile_picture}
                width="75"
                height="75"
                class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 absolute -bottom-7 left-5 rounded-full"
                alt="Profile Picture"
              />
            ) : (
              <div class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 absolute -bottom-7 left-5 rounded-full w-[75px] h-[75px] flex items-center justify-center">
                <ProfilePlaceHolder />
              </div>
            )}
          </div>
          <article class="text-sm border-x border-zinc-300 dark:border-[#222222] pt-6 xl:pt-8  pl-2.5 items-center">
            <section class=" text-black dark:text-white">
              <div class="flex justify-between pr-4">
                <div class="flex items-center space-x-3">
                  <h1 class="text-2xl md:text-3xl font-bold">
                    {`${user.first_name} ${user.last_name}`}
                  </h1>
                  {user.verified && (
                    <span class="text-black dark:text-white">
                      <Verified />
                    </span>
                  )}
                </div>

                {!isUserAccount &&
                  (isFollowing ? (
                    <button
                      hx-delete={`/unfollow/${user.id}`}
                      hx-swap="outerHTML"
                      hx-target="#follow"
                      id="follow"
                      class=" px-4 py-2 border rounded-md bg-black text-white dark:bg-white dark:text-black font-medium"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      hx-target="#follow"
                      hx-post={`/follow/${user.id}`}
                      hx-swap="outerHTML"
                      id="follow"
                      class=" px-4 py-2 border rounded-md bg-black text-white dark:bg-white dark:text-black font-medium"
                    >
                      Follow
                    </button>
                  ))}
              </div>

              <h2 class="text-[#444444] dark:text-[#B1B1B1]">
                @{user.username}
              </h2>
            </section>
            <section class="pr-2 py-1 w-full xl:w-[75%]">{user.bio}</section>
            <section class="flex flex-col text-[#444444] dark:text-[#B1B1B1]">
              <span class="mt-1">
                <Calendar className="inline" /> Joined {user.joined}
              </span>
              <ul class="flex space-x-3  mt-3">
                <li id="followerCount" hx-swap-oob="true">
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
          <div
            id="tabs"
            hx-target="#list"
            role="tablist"
            _="on htmx:afterOnLoad set @aria-selected of <[aria-selected=true]/> to false tell the target take .selected set @aria-selected to true"
            class="text-[#444444] dark:text-[#B1B1B1] border-zinc-300 dark:border-[#222222] font-medium flex space-x-6 items-center border-b sm:border-x  sm:rounded-b-md justify-between pt-2 px-[25%] "
          >
            <button
              role="tab"
              aria-controls="tab-content"
              aria-selected="true"
              hx-get={`/project-list/${user.username}`}
              hx-swap="outerHTML"
              class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer selected"
            >
              Projects
            </button>
            <button
              role="tab"
              aria-controls="tab-content"
              aria-selected="false"
              hx-get={`/blog-list/${user.username}`}
              hx-swap="outerHTML"
              class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer"
            >
              Media
            </button>
            <button
              role="tab"
              aria-controls="tab-content"
              aria-selected="false"
              hx-get="/tab3"
              class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer"
            >
              <SettingsIcon />
            </button>
          </div>
        </header>
        <main class="w-full md:w-3/4 xl:w-1/2 mx-auto">
          <div class="w-full h-full px-3 md:px-0 py-6">
            <div
              hx-get={`/project-list/${user.username}`}
              hx-swap="outerHTML"
              hx-trigger="load"
              class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row"
            >
              <div class="p-5 rounded-lg w-full h-[250px] animate-pulse bg-zinc-300 dark:bg-zinc-700 flex flex-col  space-y-4">
                <div class="flex space-x-3 items-center">
                  <div class="bg-[#f9f9f9] dark:bg-[313131] shadow-lg rounded-full h-[20px] w-[20px]"></div>
                  <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[10px] w-[35px]"></div>
                </div>
                <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[15px] w-full"></div>
              </div>
              <div class="p-5 rounded-lg w-full h-[250px] animate-pulse bg-zinc-300 dark:bg-zinc-700 flex flex-col  space-y-4">
                <div class="flex space-x-3 items-center">
                  <div class="bg-[#f9f9f9] dark:bg-[313131] shadow-lg rounded-full h-[20px] w-[20px]"></div>
                  <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[10px] w-[35px]"></div>
                </div>
                <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[15px] w-full"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
