import SearchIcon from "../components/assets/searchicon";
import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import MessageIcon from "../components/assets/messageicon";
import PlusIcon from "./assets/plusicon";

const Navbar = () => {
  return (
    <footer class="fixed bottom-0 border-t-2 border-[#2f3336] w-full md:hidden bg-[#fcfcfc] dark:bg-[#0e0e0e]">
      <nav class="relative">
        <a
          href="/project/form"
          class="absolute right-5 -top-14 p-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-center"
          hx-push-url
          preload="mouseover"
        >
          <PlusIcon />
        </a>
        <ul
          id="icons"
          class="flex flex-row justify-around w-[100%] h-[10vh] items-center text-zinc-800  dark:text-[#fafafa]"
        >
          <li>
            <a href="/home" hx-push-url preload="mouseover">
              <HomeIcon />
            </a>
          </li>
          <li>
            <a href="/search" hx-push-url preload="mouseover">
              <SearchIcon />
            </a>
          </li>
          <li>
            <a href="/notifications" hx-push-url preload="mouseover">
              <NotificationIcon />
            </a>
          </li>
          <li>
            <a href="/messages" hx-push-url preload="mouseover">
              <MessageIcon />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
