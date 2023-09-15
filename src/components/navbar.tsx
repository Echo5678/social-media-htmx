import SearchIcon from "../components/assets/searchicon";
import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import MessageIcon from "../components/assets/messageicon";

const Navbar = () => {
  return (
    <nav class=" text-[#fafafa] bg-[#0e0e0e] fixed bottom-0 border-t-2 border-[#2f3336] w-[100%] md:invisible">
      <div
        id="icons"
        class="flex flex-row justify-around w-[100%] h-[10vh] items-center"
      >
        <HomeIcon className="" />
        <SearchIcon className="" />
        <button class="bg-gradient-to-r from-purple-400 to-pink-600 rounded-full text-[3vh] w-[10%] justify-center items-center">
          +
        </button>
        <NotificationIcon className="" />
        <MessageIcon className="" />
      </div>
    </nav>
  );
};

export default Navbar;
