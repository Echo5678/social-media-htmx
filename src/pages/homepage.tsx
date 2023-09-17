import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";
import Post from "../components/post";

const post = [
  {
    handle: "@echo",
    profilePic:
      "https://yt3.ggpht.com/dR6qqf39NiziFmXdMlYnRhVsrM2Qb0b9eQPNhoMICKvZ40Zdxb5zXkqKxX84k_yv7jXojhI1PQ=s108-c-k-c0x00ffffff-no-rj",
    title: "The Game Engine Project",
    description:
      "The Game Engine project plans to create a replacement for Unity similar to the Godot Engine the Game Engine Project is a free open source Game Engine.",
  },
];

export default function HomePage() {
  return (
    <>
      <div class="flex">
        <SideBar />
        <main>
          <h1 class="text-xl font-bold p-3">Home</h1>
          <nav class="px-3 pb-3 flex space-x-6">
            <a
              href="/home/projects"
              class="font-medium text-lg pb-2 nav-link relative nav-link-active"
            >
              Projects
            </a>
            <a
              href="/home/projects"
              class=" text-lg border-white pb-2 nav-link  relative"
            >
              Blogs
            </a>
          </nav>
          <ul class="flex px-3">
            {post.map((item) => (
              <Post
                handle={item.handle}
                profilePic={item.profilePic}
                title={item.title}
                description={item.description}
              />
            ))}
          </ul>
        </main>
      </div>

      <Navbar />
    </>
  );
}
