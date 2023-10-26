import ArrowLeft from "../components/assets/arrowleft";
import Send from "../components/assets/send";
import Navbar from "../components/navbar";

const MessagePage = ({
  username,
  image,
}: {
  username?: string;
  image?: string;
}) => (
  <div class="flex min-h-screen">
    <Navbar username={username && username} image={image && image} />
    <main hx-ext="ws" ws-connect="/messages-ws" class="w-full px-6 h-full">
      <h1 class="py-3 text-xl font-bold hidden md:block">Messages</h1>
      <div class="md:grid grid-cols-12 grid-rows-none w-full min-h-screen">
        <nav
          id="friends"
          class="hidden md:block col-span-4 overflow-y-scroll pr-1 h-fit md:h-[500px] hide-scrollbar"
        >
          <div
            hx-get="/messages-list"
            hx-swap="outerHTML"
            hx-trigger="load"
            class="h-[50px] w-full bg-zinc-300 dark:bg-zinc-800 animate-pulse rounded-md"
          >
            <div class="p-1.5">
              <div class="h-[40px] w-[40px] rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
            </div>
          </div>
        </nav>
        <div
          id="messages"
          class="md:col-span-8 flex flex-col md:px-2 md:h-[500px] md:block"
        >
          <div class="flex space-x-6  items-center pt-6 md:pt-0">
            <button
              _="on click toggle .hidden on #friends then toggle .hidden on #messages"
              aria-label="User Messages List"
              class="block md:hidden"
            >
              <ArrowLeft />
            </button>
            <div id="user-info" class="flex space-x-2 items-center">
              <div class="w-[35px] h-[35px] bg-zinc-300 dark:bg-zinc-800 animate-pulse rounded-full"></div>
              <div class="w-[125px] h-[20px] rounded-lg animate-pulse bg-zinc-300 dark:bg-zinc-800"></div>
            </div>
          </div>

          <div
            id="chat"
            class="flex flex-col space-y-1 col-auto custom-scrollbar flex-grow pt-2 md:pt-0 md:max-h-[450px] overflow-y-scroll pr-3 pb-10"
          ></div>
          <form
            ws-send
            class="w-10/12 sm:11/12  md:w-full px-2 md:px-3 pt-2 fixed md:static bottom-[84px] inset-x-0 md:self-end z-40"
          >
            <div class="flex space-x-1.5 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 rounded-3xl w-full  p-1.5 px-3 bg-[#fcfcfc] dark:bg-[#0e0e0e]">
              <input
                _="on htmx:afterRequest set my.value to ''"
                id="message"
                spellcheck="true"
                autocomplete="on"
                type="text"
                autofocus="true"
                name="message"
                aria-label="Message"
                placeholder="Send a message."
                class="bg-transparent outline-none flex-grow resize-none custom-scrollbar pr-1"
              />
              <button
                type="submit"
                class="px-2.5 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-3xl"
                aria-label="Send Message"
              >
                <Send />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
);

export default MessagePage;
