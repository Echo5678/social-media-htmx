import { SelectNotification } from "../../db/schema";
import InviteNotification from "./invite-notification";
import LinkNotification from "./link-notification";

const NotificationsList = ({ notis }: { notis: SelectNotification[] }) => (
  <ul class="grid grid-cols-1 xl:grid-cols-2 gap-4 grid-flow-row">
    {notis.map((noti) => (
      <>
        {noti.type === "link" ? (
          <LinkNotification noti={noti} />
        ) : (
          <InviteNotification noti={noti} />
        )}
      </>
    ))}
  </ul>
);

export default NotificationsList;
