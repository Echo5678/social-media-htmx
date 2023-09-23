import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import MessageIcon from "../components/assets/messageicon";
import PlusIcon from "./assets/plusicon";
import NavbarSearch from "./assets/navbar-search-icon";

const SideBar = () => (
  <aside class="hidden md:block border-r border-zinc-800 min-h-screen">
    <nav class="flex flex-col px-6 py-3 items-center space-y-7">
      <a
        href="/home"
        aria-label="Home Page"
        hx-boost="true"
        hx-push-url
        preload="mouseover"
        class="transition hover:bg-zinc-800 p-1 rounded-full"
      >
        <img
          height="65"
          width="65"
          src="https://res.cloudinary.com/dtkwfyslj/image/upload/v1695253847/Untitled_design-removebg-preview_wpselx.png"
          alt="Co-Dev Logo"
        />
      </a>
      <ul
        id="icons"
        class="flex flex-col text-zinc-800  dark:text-[#fafafa] space-y-3"
      >
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a
            href="/home"
            aria-label="Home Page"
            hx-boost="true"
            hx-push-url
            preload="mouseover"
          >
            <HomeIcon />
          </a>
        </li>
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a
            href="/search"
            aria-label="Search Page"
            hx-boost="true"
            hx-push-url
            preload="mouseover"
          >
            <NavbarSearch />
          </a>
        </li>
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a
            href="/notifications"
            aria-label="Notifications page"
            hx-boost="true"
            hx-push-url
            preload="mouseover"
          >
            <NotificationIcon />
          </a>
        </li>
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a
            href="/messages"
            aria-label="Message Page"
            hx-boost="true"
            hx-push-url
            preload="mouseover"
          >
            <MessageIcon />
          </a>
        </li>
      </ul>
      <a
        href="/project/form"
        class="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-center"
        hx-boost="true"
        hx-push-url
        preload="mouseover"
      >
        <PlusIcon />
      </a>
    </nav>
  </aside>
);

export default SideBar;
