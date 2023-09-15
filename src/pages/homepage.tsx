import FriendsList from "../components/friendslist";
import Navbar from "../components/navbar";
import Post from "../components/post";
import Trending from "../components/trending";
import fakePosts from "../posts.json";

export default function HomePage() {
  return (
    <div class="flex flex-col h-[100vh] md:flex-row overflow-y-hidden">
      <div class="flex justify-center items-center hidden lg:block md:w-1/4 h-screen relative">
        <FriendsList />
      </div>
      <div class="w-[100%] flex flex-col lg:w-2/4 h-screen top-0 overflow-y-scroll">
        <div class="md:border-x-[1px]">
          <header class="flex border-b-[1px] h-[8vh] justify-center items-center top-0 lg:hidden">
            <h1 class="text-[3vh] font-bold">CoDev</h1>
          </header>

          <Navbar />

          {fakePosts.map((item) => (
            <Post
              creator={item.creator}
              handle={item.handle}
              profilePic={item.profilePic}
              timestamp={item.timestamp}
              title={item.title}
              technologies={item.technologies}
            />
          ))}

          <Navbar />
        </div>
      </div>
      <div class="hidden lg:block md:w-1/4 md:h-[100%] flex4 ">
        <Trending />
      </div>
    </div>
  );
}
