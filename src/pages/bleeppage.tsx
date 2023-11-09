import { SelectBleep } from "../db/schema";

import ProfilePlaceHolder from "../components/assets/profileplaceholder";
import Navbar from "../components/navbar";

export default function BleepPage({
  bleep,
  username,
  image,
}: {
  bleep: SelectBleep;
  username?: string;
  image?: string;
}) {
  return (
    <>
      <div class="flex">
        <Navbar username={username && username} image={image && image} />
        <main
          id="page"
          class="w-full grid grid-cols-1 grid-cols-flow md:grid-cols-12"
        >
          <div class="flex flex-col justify-center pt-2 md:pt-0 md:px-2.5  col-span-7 xl:col-span-9">
            <a
              href={`/${bleep.username}`}
              class="flex space-x-2 pb-6 pl-2 md:pl-0"
            >
              {bleep?.profile_picture ? (
                <img
                  src={`https://d20yxzu0sm1upk.cloudfront.net/${bleep?.profile_picture}`}
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
                <span class="font-semibold hover:underline">{bleep?.name}</span>
                <span class="text-[#444444] dark:text-[#B1B1B1] hover:underline decoration-1 hover:text-wite">
                  {bleep?.username}
                </span>
              </div>
            </a>
            <span class="pl-2 md:pl-0">{bleep.text}</span>

            {bleep.image && (
              <div class="max-w-[800px]">
                <img
                  alt={bleep.text}
                  height="200"
                  src={`https://d20yxzu0sm1upk.cloudfront.net/${bleep.image}`}
                  class="md:rounded-md object-contain h-full w-full"
                />
              </div>
            )}
          </div>

          <div class="border-l border-zinc-300 dark:border-zinc-800 px-2">
            {username && (
              <form
                hx-post="/bleep"
                hx-target="#comments_list"
                hx-swap="afterbegin"
                hx-trigger="submit"
                class="flex flex-col w-full space-y-1 pb-6 pt-10"
              >
                <div class="flex items-center space-x-2">
                  {image ? (
                    <img
                      src={`https://d20yxzu0sm1upk.cloudfront.net/${image}`}
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
                  <div>
                    <input
                      type="text"
                      id="post_text"
                      name="text"
                      autocomplete="true"
                      autofocus="true"
                      aria-label="Post text"
                      placeholder="Wsg?"
                      class="outline-none bg-transparent border-b border-zinc-300 dark:border-zinc-800 text-[#444444] dark:text-[#B1B1B1] placeholder:text-[#444444] placeholder:dark:text-[#B1B1B1] text-xl pb-1"
                    />
                  </div>
                </div>
                <div class="flex">
                  <button
                    type="submit"
                    aria-label="Upload Post"
                    class="px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-md font-medium"
                  >
                    Post
                  </button>
                </div>
              </form>
            )}
            <ul class="flex flex-col space-y-2 pt-6 items-center">
              {bleep?.comments && <li>Be the first to comment!</li>}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
