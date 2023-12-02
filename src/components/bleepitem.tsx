import Like from "./assets/like";
import ProfilePlaceHolder from "./assets/profileplaceholder";
import Verified from "./assets/verified";
import Comment from "./assets/comment";

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
            "hx-trigger": "intersect once",
            "hx-swap": "afterend",
          }
        : {})}
      class="border-b border-zinc-300 dark:border-zinc-800 w-full hover:cursor-pointer flex  flex-col"
    >
      <div class="flex">
        <div class="flex space-x-2">
          <a href={`/${item.username}`}>
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

          <div class="flex  flex-col">
            <span class="font-semibold hover:underline flex items-center space-x-2.5">
              <a href={`/${item.username}`}>{item.name}</a>
              {item.verified && (
                <span class="text-black dark:text-white">
                  <Verified />
                </span>
              )}
            </span>
            <a
              href={`/${item.username}`}
              hx-boost
              hx-push-url
              class="text-[#444444] dark:text-[#B1B1B1] hover:underline decoration-1 hover:text-wite"
            >
              {item.username}
            </a>
          </div>
        </div>
      </div>
      <a
        href={`/bleep/${item.id}`}
        hx-boost
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
          id="like_button"
          onclick="this.stopPropagation()"
          hx-post={`/like/${item.id}`}
          hx-swap="outerHTML"
          class="flex space-x-1 items-center font-medium text-lg"
        >
          <Like />
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
          <Comment />
          <span>{item?.likes_count ? item.likes_count : 0}</span>
        </button>
      </div>
    </li>
  );
}

export default BleepItem;
