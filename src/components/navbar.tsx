import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import MessageIcon from "../components/assets/messageicon";
import ProfileIcon from "./assets/profileicon";
import { ProjectIcon } from "./assets/projecticon";
import { NotePad } from "./assets/notepadicon";

const Navbar = ({ image, username }: { image?: string; username?: string }) => {
  return (
    <div class="fixed md:static bottom-0 border-t-2 md:border-r-2 md:border-t-0 border-[#2f3336] w-full md:w-auto bg-[#fcfcfc] dark:bg-[#0e0e0e] z-40 md:min-h-screen">
      <nav class="relative md:px-4 md:pt-2">
        <a
          href="/home"
          aria-label="Home Page"
          class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-1 md:rounded-full hidden md:block"
        >
          <img
            height="65"
            width="65"
            src="https://res.cloudinary.com/dtkwfyslj/image/upload/v1695964824/logo-min_znkkto.png"
            alt="Co-Dev Logo"
          />
        </a>
        <ul
          id="icons"
          class="flex flex-row md:flex-col  md: justify-around w-[100%] py-5 items-center text-zinc-800  dark:text-[#fafafa] md:space-y-2"
        >
          <li class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-2.5 md:rounded-full">
            <a href="/home" aria-label="Home Page">
              <HomeIcon />
            </a>
          </li>
          <li
            hx-get="/notifications-count"
            hx-swap="outerHTML"
            hx-trigger="load"
            class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-2.5 md:rounded-full"
          >
            {username ? (
              <a
                href="/notifications"
                aria-label="Notifications Page"
                hx-boost="true"
                hx-push-url
              >
                <NotificationIcon />
              </a>
            ) : (
              <a
                href="/sign-in"
                aria-label="Sign In Page"
                hx-boost="true"
                hx-push-url
              >
                <NotificationIcon />
              </a>
            )}
          </li>
          <li class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-2.5 md:rounded-full">
            <a
              href={username ? "/messages" : "/sign-in"}
              aria-label={username ? "Messages Page" : "Sign In Page"}
              hx-push-url
            >
              <MessageIcon />
            </a>
          </li>
          <li class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-2.5 md:rounded-full">
            <a
              href={username ? `/profile/${username}` : "/sign-in"}
              aria-label={username ? "Profile Page" : "Sign In Page"}
            >
              {username ? (
                image ? (
                  <img
                    width="32"
                    height="32"
                    src={image ? image : ""}
                    alt="User Profile Picture"
                    class="rounded-full"
                  />
                ) : (
                  <ProfileIcon />
                )
              ) : (
                <ProfileIcon />
              )}
            </a>
          </li>
        </ul>
        <div id="addnew" class="md:mt-8 flex items-center justify-center">
          <button
            _="on click toggle .open on #addnew then toggle .hidden on #menu then toggle .blur-sm on <main/> then toggle .pointer-events-none on <main/>"
            class="absolute right-5 -top-14 bg-black text-white dark:bg-white dark:text-black rounded-full md:static"
            aria-label="Create new project"
          >
            <div class="plus"></div>
          </button>
          <div
            id="menu"
            class="menu hidden text-black  dark:text-white absolute max-md:right-5 max-md:bottom-48 md:left-28 md:top-64 text-lg font-medium"
          >
            <ul>
              <li class="p-3">
                <a href="/project/form" class="flex space-x-2  w-[200px]">
                  <ProjectIcon />
                  <span>Create New Project</span>
                </a>
              </li>
              <li class="mt-6 p-3">
                <a href="/blog/editor" class="flex space-x-2">
                  <div>
                    <NotePad />
                  </div>
                  <span>Write a Blog Post</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
