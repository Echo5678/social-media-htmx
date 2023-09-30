import SideBar from "../components/sidebar";
import Navbar from "../components/navbar";

const NotificationsPage = ({
  username,
  image,
}: {
  username?: string;
  image?: string;
}) => (
  <main>
    <div class="flex">
      <SideBar username={username && username} image={image && image} />
      <main id="page" class="w-full px-6">
        <h1 class="text-xl font-bold py-3">Notifications</h1>
        <div
          hx-get="/notifications-list"
          hx-swap="outerHTML"
          hx-trigger="load"
          class="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-flow-row"
        >
          <div class="p-5 rounded-lg w-full h-[100px] animate-pulse bg-zinc-300 dark:bg-zinc-700 flex flex-col  space-y-4">
            <div class="flex space-x-3 items-center">
              <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[10px] w-[35px]"></div>
            </div>
            <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[15px] w-full"></div>
          </div>
          <div class="p-5 rounded-lg w-full h-[100px] animate-pulse bg-zinc-300 dark:bg-zinc-700 flex flex-col  space-y-4">
            <div class="flex space-x-3 items-center">
              <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[10px] w-[35px]"></div>
            </div>
            <div class="bg-[#f9f9f9] dark:bg-[#616161] shadow-lg rounded-lg h-[15px] w-full"></div>
          </div>
        </div>
      </main>
    </div>

    <Navbar username={username && username} image={image && image} />
  </main>
);

export default NotificationsPage;
