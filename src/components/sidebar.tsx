import SearchIcon from "../components/assets/searchicon";
import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import MessageIcon from "../components/assets/messageicon";
import PlusIcon from "./assets/plusicon";

const SideBar = () => (
  <aside class="hidden md:block border-r border-zinc-800 min-h-screen">
    <nav class="flex flex-col px-6 py-3 items-center space-y-7">
      <ul
        id="icons"
        class="flex flex-col text-zinc-800  dark:text-[#fafafa] space-y-3"
      >
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a href="/home" hx-push-url preload="mouseover">
            <HomeIcon />
          </a>
        </li>
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a href="/search" hx-push-url preload="mouseover">
            <SearchIcon />
          </a>
        </li>
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a href="/notifications" hx-push-url preload="mouseover">
            <NotificationIcon />
          </a>
        </li>
        <li class="transition hover:bg-zinc-800 p-2.5 rounded-full">
          <a href="/messages" hx-push-url preload="mouseover">
            <MessageIcon />
          </a>
        </li>
      </ul>
      <a
        href="/project/form"
        class="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-center"
        hx-push-url
        preload="mouseover"
      >
        <PlusIcon />
      </a>
    </nav>
  </aside>
);

export default SideBar;
