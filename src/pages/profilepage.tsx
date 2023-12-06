import CloseIcon from "../components/assets/closeicon";
import SettingsIcon from "../components/assets/settings";
import Navbar from "../components/navbar";

export default function ProfilePage({
  isUserAccount,
  searchUser,
  username,
  image,
}: {
  isUserAccount: boolean;
  searchUser: string;
  username?: string;
  image?: string;
}) {
  return (
    <>
      {isUserAccount && (
        <dialog
          id="modal"
          class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 text-black dark:text-white rounded-md w-screen sm:w-auto p-10"
        >
          <div class="w-full flex justify-between">
            <h2 class="text-2xl font-semibold">Settings</h2>
            <button _="on click close() on #modal">
              <CloseIcon />
            </button>
          </div>
          <form
            hx-patch="/user"
            hx-trigger="submit"
            hx-encoding="multipart/form-data"
            class="pt-5 flex flex-col space-y-7"
          >
            <div>
              <label for="change_name" class="font-medium">
                Change Name:
              </label>
              <input
                aria-label="Change Username"
                type="text"
                id="change_name"
                name="name"
                class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500"
              />
            </div>
            <div>
              <label for="change_username" class="font-medium">
                Change Username:
              </label>
              <input
                aria-label="Change Username"
                type="text"
                id="change_username"
                name="username"
                class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="change_profile_picture"
                class="font-medium bg-black text-white dark:bg-white dark:text-black py-1.5 px-2.5 rounded-md hover:cursor-pointer"
              >
                Change profile picture
              </label>
              <input
                aria-label="Change Profile Picture"
                type="file"
                accept="image/png image/jpeg image/jpg image/webp"
                id="change_profile_picture"
                name="profile_picture"
                class="hidden"
              />
            </div>
            <button
              aria-label="Save Changes made to profile"
              type="submit"
              class="px-3 py-1 font-medium bg-black text-white dark:bg-white dark:text-black rounded-md w-fit self-end"
            >
              Save changes
            </button>
          </form>
        </dialog>
      )}

      <div class="flex">
        <Navbar username={username} image={image && image} />
        <div class="w-full h-full">
          <header
            hx-get={`/${searchUser}/info`}
            hx-trigger="load"
            hx-swap="none"
            class="w-full md:w-3/4 xl:w-1/2 mx-auto"
          >
            <div class="relative">
              <div
                id="user_background"
                class="w-full h-[20vw] sm:h-[15vw] lg:h-[12.5vw] xl:h-[7.5vw] bg-zinc-300 dark:bg-zinc-800"
              ></div>
              <div
                id="profile_picture"
                class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 absolute -bottom-7 left-5 rounded-full w-[75px] h-[75px] flex items-center justify-center animate-pulse"
              ></div>
            </div>
            <article class="text-sm border-x border-zinc-300 dark:border-[#222222] pt-6 xl:pt-8  pl-2.5 items-center">
              <section class=" text-black dark:text-white flex flex-col space-y-2">
                <div class="flex justify-between pr-4">
                  <div class="flex items-center space-x-3">
                    <div
                      id="name"
                      class="w-[125px] h-[40px] bg-zinc-300 dark:bg-zinc-800 animate-pulse rounded-md"
                    ></div>
                    <div id="verified"></div>
                  </div>
                  <div id="follow"></div>
                </div>
                <div
                  id="username"
                  class="h-[20px] w-[100px] bg-zinc-300 dark:bg-zinc-800 animate-pulse rounded-md"
                ></div>
              </section>

              <div id="user_bio"></div>

              <section class="flex flex-col text-[#444444] dark:text-[#B1B1B1]">
                <div id="joined"></div>
                <div id="following_info"></div>
              </section>
            </article>
            <div
              id="tabs"
              hx-target="#list"
              role="tablist"
              _="on htmx:afterOnLoad set @aria-selected of <[aria-selected=true]/> to false tell the target take .selected-home-tab set @aria-selected to true"
              class="text-[#444444] dark:text-[#B1B1B1] border-zinc-300 dark:border-[#222222] font-medium flex space-x-6 items-center border-b sm:border-x  sm:rounded-b-md justify-between pt-2 px-[12.5%] "
            >
              <button
                role="tab"
                aria-label="Projects"
                aria-controls="tab-content"
                aria-selected="true"
                hx-get={`/${searchUser}/bleeps`}
                hx-swap="outerHTML"
                class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer selected-home-tab"
              >
                Bleeps
              </button>
              <button
                role="tab"
                aria-label="Projects"
                aria-controls="tab-content"
                aria-selected="false"
                hx-get={`/project-list/${searchUser}`}
                hx-swap="outerHTML"
                class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer"
              >
                Projects
              </button>
              <button
                role="tab"
                aria-label="Media"
                aria-controls="tab-content"
                aria-selected="false"
                hx-get={`/blog-list/${searchUser}`}
                hx-swap="outerHTML"
                class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer"
              >
                Media
              </button>
              {isUserAccount && (
                <button
                  role="tab"
                  aria-label="Settings"
                  aria-controls="tab-content"
                  aria-selected="false"
                  _="on click showModal() on #modal"
                  class="hover:dark:text-white  hover:text-black hover:border-black hover:dark:border-white border-transparent border-b-2 py-3 hover:cursor-pointer"
                >
                  <SettingsIcon />
                </button>
              )}
            </div>
          </header>
          <main class="w-full md:w-3/4 xl:w-1/2 mx-auto">
            <div class="w-full h-full px-3 md:px-0 py-6">
              <div
                hx-get={`/${searchUser}/bleeps`}
                hx-swap="outerHTML"
                hx-trigger="load"
                class="grid grid-cols-1 gap-4 grid-flow-row"
              >
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
    </>
  );
}
