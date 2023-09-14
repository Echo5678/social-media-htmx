import SearchIcon from "../components/assets/searchicon";
import HomeIcon from "../components/assets/homeicon";
import NotificationIcon from "../components/assets/notificationicon";
import ExploreIcon from "../components/assets/exploreicon";
import MessageIcon from "../components/assets/messageicon";
import BlogIcon from "../components/assets/blogicon";
import ProfileIcon from "../components/assets/profileicon";

const Navbar = () => {
  return (
    <nav class=" flex flex-col w-1/5 justify-center">
      <div class="h-[9%] justify-center text-[3vh]">CoDev</div>
      <div class="h-[65%] justify-between flex flex-col">
        <div class="flex flex-row items-center w-[40%]">
          <div class="flex flex-1">
            <HomeIcon />
          </div>
          <a class="text-[3vh] flex flex-3">Home</a>
        </div>
        <div class="flex flex-row items-center w-[45%]">
          <div class="flex flex-1">
            <SearchIcon />
          </div>
          <a class="text-[3vh]">Search</a>
        </div>
        <div class="flex flex-row items-center w-[47%]">
          <div class="flex flex-1">
            <ExploreIcon />
          </div>
          <a class="text-[3vh]">Explore</a>
        </div>
        <div class="flex flex-row items-center w-[35%]">
          <div class="flex flex-1">
            <BlogIcon />
          </div>
          <a class="text-[3vh]">Blog</a>
        </div>
        <div class="flex flex-row items-center w-[60%]">
          <div class="flex flex-1">
            <MessageIcon />
          </div>
          <a class="text-[3vh]">Messages</a>
        </div>
        <div class="flex flex-row items-center w-[48%]">
          <div class="flex flex-1">
            <NotificationIcon />
          </div>
          <a class="text-[3vh]">Activity</a>
        </div>
        <div class="flex flex-row items-center w-[42%]">
          <div class="flex flex-1">
            <ProfileIcon />
          </div>
          <a class="text-[3vh]">Profile</a>
        </div>
        <button class="bg-gradient-to-r from-purple-400 to-pink-600 w-[80%] text-[2vh] rounded-full p-[4%]">
          Post
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
