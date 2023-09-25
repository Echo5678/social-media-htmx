import { SelectProject } from "../db/schema";
import StarIconRegular from "../components/assets/stariconregular";

export default function ProjectList({ project }: { project: SelectProject[] }) {
  return (
    <ul
      id="list"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 grid-flow-row"
    >
      {project.map((item) => (
        <li class="bg-[#010101] border border-zinc-800 p-5 rounded-lg w-full hover:scale-105 hover:z-40 transition duration-500 hover:cursor-pointer flex  flex-col">
          <a
            href={`/project/${item.id}`}
            hx-boost="true"
            hx-push-url
            preload="mouseover"
            class="flex-grow"
          >
            <div class="flex space-x-2">
              <img
                src="https://yt3.ggpht.com/dR6qqf39NiziFmXdMlYnRhVsrM2Qb0b9eQPNhoMICKvZ40Zdxb5zXkqKxX84k_yv7jXojhI1PQ=s108-c-k-c0x00ffffff-no-rj"
                width="50"
                height="50"
                class=" rounded-full"
                alt="Profile Picture"
              />
              <div class="w-full">
                <h2 class="text-lg font-medium  w-full line-clamp-1">
                  {item.name}
                </h2>
                <a
                  class="text-[#444444] dark:text-[#B1B1B1] font-semibold tracking-wide hover:underline decoration-1 hover:text-wite"
                  href={`/profile/${item.username}`}
                  hx-push-url="true"
                  hx-boost="true"
                >
                  {item.username}
                </a>
              </div>
            </div>
            <p class="line-clamp-3 pt-2 text-[#444444] dark:text-[#B1B1B1] flex-grow">
              {item.description}
            </p>
          </a>
          <button
            hx-patch={`/stars/${item.id}`}
            hx-swap="outerHTML"
            class="self-end"
          >
            <StarIconRegular />
          </button>
        </li>
      ))}
    </ul>
  );
}
