import { SelectNotification } from "../db/schema";

const NotificationsList = ({ notis }: { notis: SelectNotification[] }) => (
  <ul class="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-flow-row">
    {notis.map((noti) => (
      <li class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full hover:cursor-pointer flex  flex-col relative">
        <a
          class="px-4 py-3"
          href={noti.reference}
          aria-label="Notification Link"
          hx-push-url
        >
          <h3 class="text-xl font-medium">{noti.sent_by}</h3>
          <p class="py-2 text-[#444444] dark:text-[#B1B1B1]">{noti.content}</p>
        </a>
        {noti.read && (
          <div class="h-[5px] w-[5px] bg-red-600 absolute top-0 left-0"></div>
        )}
      </li>
    ))}
  </ul>
);

export default NotificationsList;
