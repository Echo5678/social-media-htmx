import { SelectNotification } from "../../db/schema";

const LinkNotification = ({ noti }: { noti: SelectNotification }) => (
  <li class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full hover:cursor-pointer flex  flex-col relative p-5">
    {!noti.read && (
      <div class="h-[7.5px] w-[7.5px] bg-red-600 absolute -top-1 -left-1 rounded-full"></div>
    )}
    <a href={noti.reference} aria-label="Notification Link" hx-push-url>
      <h3 class="text-xl font-medium">{noti.sent_by}</h3>
      <p class="py-2 text-[#444444] dark:text-[#B1B1B1]">{noti.content}</p>
    </a>
    {noti.read && (
      <div class="h-[5px] w-[5px] bg-red-600 absolute top-0 left-0"></div>
    )}
  </li>
);

export default LinkNotification;
