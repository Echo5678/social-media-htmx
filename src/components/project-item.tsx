import { SelectProject } from "../db/schema";

import ProfilePlaceHolder from "./assets/profileplaceholder";
import StarIconRegular from "./assets/stariconregular";

function ProjectItem({
  item,
  skip,
  skipAmount,
  username,
}: {
  username: string;
  item: SelectProject;
  skip: boolean;
  skipAmount: number;
}) {
  return (
    <>
      <li class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full hover:cursor-pointer flex  flex-col p-5">
        <div class="flex space-x-2">
          <a
            href={`/project/${item?.project_id}`}
            hx-push-url
            class="flex flex-col flex-grow"
          >
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
          </a>
          <div class="w-full">
            <a
              href={`/project/${item?.project_id}`}
              hx-push-url
              class="flex flex-col flex-grow"
            >
              <h2 class="text-lg font-medium  w-full line-clamp-1">
                {item.project_name}
              </h2>
            </a>
            <a
              href={`/project/${item?.project_id}`}
              hx-push-url
              class="flex flex-col flex-grow"
            >
              <span class="text-[#444444] dark:text-[#B1B1B1] font-semibold tracking-wide hover:underline decoration-1 hover:text-wite">
                {item.project_username}
              </span>
            </a>
          </div>
        </div>
        <p class="line-clamp-3 py-2 text-[#444444] dark:text-[#B1B1B1] flex-grow">
          {item.description}
        </p>
        <button
          hx-post={`/stars/${item.id}`}
          hx-swap="outerHTML"
          class="self-end flex space-x-1 items-center font-medium text-lg"
        >
          <StarIconRegular />
          <span>{item?.stars_count}</span>
        </button>
      </li>
      {skip && (
        <li
          {...{
            "hx-get": username
              ? `/project-list/${username}/?skip=${
                  skipAmount ? skipAmount : 10
                }`
              : `/project-list/?skip=${skipAmount ? skipAmount : 10}`,
            "hx-trigger": "revealed",
            "hx-swap": "afterend",
          }}
        ></li>
      )}
    </>
  );
}

export default ProjectItem;
