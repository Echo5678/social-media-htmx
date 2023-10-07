import { SelectNotification } from "../../db/schema";

const InviteNotification = ({ noti }: { noti: SelectNotification }) => (
  <li
    hx-trigger="from:#accept, from:#decline"
    class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full flex flex-col md:flex-row justify-between items-center relative p-5"
  >
    <div class="flex flex-col">
      {!noti.read && (
        <div class="h-[7.5px] w-[7.5px] bg-red-600 absolute -top-1 -left-1 rounded-full"></div>
      )}
      <h1 class="text-xl font-medium">
        <a
          href={`/profile/${noti.sent_by}`}
          aria-label={`${noti.sent_by} Profile Page`}
        >
          {noti.sent_by}
        </a>{" "}
        has invited you!
      </h1>
      <p class="py-2 text-[#444444] dark:text-[#B1B1B1]">{noti.content}</p>
    </div>

    <div class="flex space-x-8 md:space-x-6 items-center pt-4 md:pt-0">
      <button
        aria-label="Accept Project Invite"
        id="accept"
        class="text-green-600 dark:text-green-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.3 4.7 8.5 16.5 3.7 11.7 2.3 13.15 8.5 19.3 21.7 6.1z"></path>
        </svg>
      </button>
      <button
        aria-label="Decline Project Invite"
        id="decline"
        class="text-red-600 dark:text-red-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4.078 2.633 2.656 4.055 10.578 11.977 2.609 19.961 4.016 21.367 12 13.398 19.969 21.367 21.391 19.945 13.422 11.977 21.344 4.055 19.922 2.633 12 10.555Z"></path>
        </svg>
      </button>
    </div>
  </li>
);

export default InviteNotification;
