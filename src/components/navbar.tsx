import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import MessageIcon from "../components/assets/messageicon";
import PlusIcon from "./assets/plusicon";
import ProfileIcon from "./assets/profileicon";

const Navbar = ({ image, username }: { image?: string; username?: string }) => {
  return (
    <footer class="fixed bottom-0 border-t-2 border-[#2f3336] w-full md:hidden bg-[#fcfcfc] dark:bg-[#0e0e0e] z-40">
      <nav class="relative">
        <a
          href="/project/form"
          class="absolute right-5 -top-14 p-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-center"
          aria-label="Create new project"
        >
          <PlusIcon />
        </a>
        <ul
          id="icons"
          class="flex flex-row justify-around w-[100%] py-5 items-center text-zinc-800  dark:text-[#fafafa]"
        >
          <li>
            <a href="/home" aria-label="Home Page">
              <HomeIcon />
            </a>
          </li>
          <li
            hx-get="/notifications-count"
            hx-swap="outerHTML"
            hx-trigger="load"
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
          <li>
            <a
              href={username ? "/messages" : "/sign-in"}
              aria-label={username ? "Messages Page" : "Sign In Page"}
              hx-push-url
            >
              <MessageIcon />
            </a>
          </li>
          <li>
            <a
              href={username ? `/profile/${username}` : "/sign-in"}
              hx-boost="true"
              hx-push-url
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
      </nav>
    </footer>
  );
};

export default Navbar;
