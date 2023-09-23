import StarIconRegular from "../components/assets/stariconregular";
import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

export default function HomePage() {
  return (
    <>
      <div class="flex">
        <SideBar />
        <main id="page">
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
            <li class="bg-[#010101] border border-zinc-800 p-5 rounded-lg w-full sm:w-[50vw] md:w-[40vw] hover:scale-105 transition duration-500 hover:cursor-pointer">
              <a
                href="/project/3"
                hx-boost="true"
                hx-push-url
                preload="mouseover"
              >
                <div class="flex space-x-2">
                  <img
                    src="https://yt3.ggpht.com/dR6qqf39NiziFmXdMlYnRhVsrM2Qb0b9eQPNhoMICKvZ40Zdxb5zXkqKxX84k_yv7jXojhI1PQ=s108-c-k-c0x00ffffff-no-rj"
                    width="50"
                    height="50"
                    class=" rounded-full"
                    alt="Profile Picture"
                  />
                  <div>
                    <h2 class="text-lg font-medium  w-full line-clamp-1">
                      The Game Engine Project with an extremely long name Idk
                      what is going on
                    </h2>
                    <span class="text-[#444444] dark:text-[#B1B1B1] font-semibold tracking-wide">
                      @echo
                    </span>
                  </div>
                </div>
                <p class="line-clamp-2 pt-2 text-[#444444] dark:text-[#B1B1B1]">
                  The Game Engine project plans to create a replacement for
                  Unity, similar to the Godot Engine the Game Engine Project is
                  a free open source Game Engine.
                </p>
              </a>
              <div class="flex flex-row">
                <button hx-patch="/stars/1" hx-swap="innerHTML">
                  <StarIconRegular />
                </button>
              </div>
              <p hx-patch="/badges/2" hx-swap="innerHTML">
                add badge
              </p>
            </li>
          </ul>
        </main>
      </div>

      <Navbar />
    </>
  );
}
