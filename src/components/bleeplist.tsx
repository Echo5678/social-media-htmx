import { SelectBleep } from "../db/schema";
import { ImagePlus } from "./assets/imageplus";

import ProfilePlaceHolder from "./assets/profileplaceholder";
import BleepItem from "./bleepitem";

export default function BleepList({
  bleeps,
  user,
  input,
  skipAmount,
}: {
  user: any;
  bleeps: SelectBleep[];
  input?: boolean;
  skipAmount: number;
}) {
  return (
    <div id="list" class="max-w-[700px] mx-auto">
      {user && input && (
        <form
          hx-post="/bleep"
          hx-target="#bleeps_list"
          hx-swap="afterbegin"
          hx-encoding="multipart/form-data"
          hx-trigger="submit"
          class="flex flex-col w-fit space-y-1 pb-6"
        >
          <div class="flex items-center space-x-2">
            {user?.profile_picture ? (
              <img
                src={`https://d20yxzu0sm1upk.cloudfront.net/${user?.profile_picture}`}
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
                class="outline-none bg-transparent border-b border-zinc-300 dark:border-zinc-800 text-[#444444] dark:text-[#B1B1B1] placeholder:text-[#444444] placeholder:dark:text-[#B1B1B1] text-xl pb-1 min-w-[242px] max-w-[642px] w-[100vw]"
              />
            </div>
          </div>
          <div class="justify-between flex items-start">
            <div>
              <div class="pl-[60px]">
                <label class="text-blue-500 hover:cursor-pointer" for="image">
                  <ImagePlus />
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/png image/jpeg image/jpg"
                  name="image"
                  alt="Project Thumbnail"
                  class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block mt-1.5 p-1 focus:border-blue-500 hidden"
                />
              </div>
            </div>
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

      <ul id="bleeps_list" class="grid grid-cols-1 gap-y-4 grid-flow-row pb-24">
        {bleeps.map((item, index) => (
          <BleepItem
            item={item}
            skip={index === bleeps.length - 1}
            skipAmount={skipAmount && skipAmount}
          />
        ))}
      </ul>
    </div>
  );
}
