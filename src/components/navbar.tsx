import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import MessageIcon from "../components/assets/messageicon";
import PlusIcon from "./assets/plusicon";
import NavbarSearch from "./assets/navbar-search-icon";

const Navbar = () => {
  return (
    <footer class="fixed bottom-0 border-t-2 border-[#2f3336] w-full md:hidden bg-[#fcfcfc] dark:bg-[#0e0e0e] z-40">
      <nav class="relative">
        <a
          href="/project/form"
          class="absolute right-5 -top-14 p-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-center"
          hx-push-url
          preload="mouseover"
          aria-label="Create new project"
        >
          <PlusIcon />
        </a>
        <ul
          id="icons"
          class="flex flex-row justify-around w-[100%] py-5 items-center text-zinc-800  dark:text-[#fafafa]"
        >
          <li>
            <a
              href="/home"
              aria-label="Home Page"
              hx-push-url
              preload="mouseover"
            >
              <HomeIcon />
            </a>
          </li>
          <li>
            <a
              href="/notifications"
              aria-label="Notifications Page"
              hx-push-url
              preload="mouseover"
            >
              <NotificationIcon />
            </a>
          </li>
          <li>
            <a
              href="/messages"
              aria-label="Messages Page"
              hx-push-url
              preload="mouseover"
            >
              <MessageIcon />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
