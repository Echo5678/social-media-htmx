import { SelectProject } from "../db/schema";
import StarIconRegular from "../components/assets/stariconregular";

export default function ProjectList({
  projects,
  type,
}: {
  projects: SelectProject[];
  type?: string;
}) {
  return (
    <ul
      id="list"
      class={
        type === "single"
          ? "grid grid-cols-1 gap-4 grid-flow-row"
          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row"
      }
    >
      {projects.map((item) => (
        <li class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full hover:cursor-pointer flex  flex-col p-5">
          <a
            href={`/project/${item.id}`}
            hx-boost="true"
            hx-push-url
            class="flex flex-col flex-grow"
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
                <span class="text-[#444444] dark:text-[#B1B1B1] font-semibold tracking-wide hover:underline decoration-1 hover:text-wite">
                  {item.username}
                </span>
              </div>
            </div>
            <p class="line-clamp-3 py-2 text-[#444444] dark:text-[#B1B1B1] flex-grow">
              {item.description}
            </p>
          </a>
          <button
            hx-post={`/stars/${item.id}`}
            hx-swap="outerHTML"
            class="self-end flex space-x-1 items-center font-medium text-lg"
          >
            <StarIconRegular />
            <span>{item?.stars_count ? item?.stars_count : 0}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
