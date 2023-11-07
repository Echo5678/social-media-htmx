import { SelectProject } from "../db/schema";

import StarIconRegular from "../components/assets/stariconregular";
import ProfilePlaceHolder from "./assets/profileplaceholder";

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
              {item?.profile_picture ? (
                <img
                  src={`https://d20yxzu0sm1upk.cloudfront.net/${item?.profile_picture}`}
                  width="50"
                  height="50"
                  class="rounded-full"
                  alt="Profile Picture"
                />
              ) : (
                <div class="bg-[#fcfcfc] dark:bg-[#0e0e0e] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                  <ProfilePlaceHolder />
                </div>
              )}
              <div class="w-full">
                <h2 class="text-lg font-medium  w-full line-clamp-1">
                  {item.project_name}
                </h2>
                <span class="text-[#444444] dark:text-[#B1B1B1] font-semibold tracking-wide hover:underline decoration-1 hover:text-wite">
                  {item.project_username}
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
            <span>{item?.stars_count}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
