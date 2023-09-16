import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";
import Post from "../components/post";
import fakePosts from "../posts.json";
import Trending from "../components/trending";
import FriendsList from "../components/friendslist";

export default function HomePage() {
  return (
    <div
      id="homepage-container"
      class="flex flex-col h-[100vh] md:flex-row overflow-y-hidden"
    >
      <div
        id="homepage-left"
        class="flex justify-center items-center hidden md:grid md:w-1/4 h-screen relative"
      >
        <SideBar />
        <FriendsList />
      </div>
      <div
        id="homepage-main"
        class="w-[100%] flex flex-col md:w-2/4 h-screen overflow-y-scroll top-0"
      >
        <div class=" border-zinc-800 md:border-x-[1px]">
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
      <div id="homepage-right" class="hidden md:grid md:w-1/4 md:h-[100%] flex">
        <Trending />
      </div>
    </div>
  );
}
