import ProfileIcon from "./assets/profileicon";

interface MessageUserListProps {
  id?: number;
  name?: string;
  username?: string;
  profile_picture?: string;
}

const MessageUserList = ({ users }: { users: MessageUserListProps[] }) => {
  return (
    <>
      {users ? (
        <div class="flex flex-col space-y-2 pt-6 md:pt-0">
          {users.map((user, index) => (
            <button
              role="tab"
              aria-controls="tab-content"
              aria-selected={index === 0 ? "true" : "false"}
              hx-get={`/message-info/${user.id}`}
              hx-target="#chat"
              hx-trigger={index === 0 ? "load, click" : "click"}
              hx-swap="outerHTML"
              class={
                index === 0
                  ? "hover:dark:text-white  hover:text-black p-3 hover:cursor-pointer rounded-md selected"
                  : "hover:dark:text-white  hover:text-black border-transparent p-3 rounded-md hover:cursor-pointer hover:bg-zinc-300 hover:dark:bg-zinc-800"
              }
            >
              <div class="flex space-x-4 items-center">
                {user.profile_picture ? (
                  <img
                    width="32"
                    height="32"
                    src={user.profile_picture}
                    alt="User Profile _picture"
                    class="rounded-full-"
                  />
                ) : (
                  <ProfileIcon />
                )}
                <div class="flex flex-col items-start">
                  <h2 class="font-semibold line-clamp-1">{user.name}</h2>
                  <h3 class="text-[#444444] dark:text-[#B1B1B1] line-clamp-1">
                    {user.username}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <h4 class="font-medium text-center text-lg">No messages yet.</h4>
      )}
    </>
  );
};

export default MessageUserList;
