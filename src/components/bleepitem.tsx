import ProfilePlaceHolder from "./assets/profileplaceholder";
import Verified from "./assets/verified";

interface Item {
  id: string | number;
  profile_picture?: string;
  username: string;
  text: string;
  name: string;
  image?: string;
  likes_count: string | number;
}

function BleepItem({
  item,
  skip,
  skipAmount,
  username,
}: {
  username?: string;
  item: Item;
  skip: boolean;
  skipAmount?: number;
}) {
  return (
    <li
      {...(skip
        ? {
            "hx-get": username
              ? `/${username}/bleeps/?skip=${skipAmount ? skipAmount : 10}`
              : `/bleeps-list/?skip=${skipAmount ? skipAmount : 10}`,
            "hx-trigger": "revealed",
            "hx-swap": "afterend",
          }
        : {})}
      class="border-b border-zinc-300 dark:border-zinc-800 w-full hover:cursor-pointer flex  flex-col"
    >
      <a href={`/${item.username}`} hx-boost="true" hx-push-url class="flex">
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
          <div class="flex  flex-col">
            <span class="font-semibold hover:underline flex items-center space-x-2.5">
              {item.name}
              {item.verified && (
                <span class="text-black dark:text-white">
                  <Verified />
                </span>
              )}
            </span>
            <span class="text-[#444444] dark:text-[#B1B1B1] hover:underline decoration-1 hover:text-wite">
              {item.username}
            </span>
          </div>
        </div>
      </a>
      <a
        href={`/bleep/${item.id}`}
        hx-boost="true"
        hx-push-url
        class="flex flex-col space-y-2 pt-2"
      >
        <span class="pl-[59.02px]" safe>
          {item.text}
        </span>

        {item.image && (
          <div class="w-full h-full sm:h-[45vw] md:h-[37.5vw]  lg:[32.5vw] xl:[22.5vw] py-1.5">
            <img
              alt={item.text}
              height="200"
              src={`https://d20yxzu0sm1upk.cloudfront.net/${item.image}`}
              class="rounded-md object-contain h-full w-full"
            />
          </div>
        )}
      </a>
      <div class="flex justify-between px-[10vw] py-3.5 text-[#444444] dark:text-[#B1B1B1]">
        <button
          onclick="this.stopPropagation()"
          hx-post={`/like/${item.id}`}
          hx-swap="outerHTML"
          class="flex space-x-1 items-center font-medium text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12.82 5.58l-.82.822l-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599a5.38 5.38 0 0 0-7.611 0Z"
            />
          </svg>
          <span id="like_count">
            {item?.likes_count ? item.likes_count : 0}
          </span>
        </button>
        <button
          onclick="this.stopPropagation()"
          hx-get={`/${item.id}/comments`}
          hx-swap="outerHTML"
          class="flex space-x-1 items-center font-medium text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.643.397 3.23 1.145 4.65l-1.116 4.29a.85.85 0 0 0 1.036 1.036l4.29-1.117A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10Z"
            />
          </svg>
          <span>{item?.likes_count ? item.likes_count : 0}</span>
        </button>
      </div>
    </li>
  );
}

export default BleepItem;
