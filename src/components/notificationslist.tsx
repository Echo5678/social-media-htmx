import { SelectNotification } from "../db/schema";

const NotificationsList = ({
  notifications,
}: {
  notifications: SelectNotification[];
}) => (
  <ul class="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-flow-row">
    {notifications.map((item) => (
      <li class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full hover:cursor-pointer flex  flex-col px-4 py-3">
        <h3>{item.type.toUpperCase()}</h3>
        <p class="py-2 text-[#444444] dark:text-[#B1B1B1]">{item.content}</p>
      </li>
    ))}
  </ul>
);

export default NotificationsList;
