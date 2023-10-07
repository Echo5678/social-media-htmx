import ProfilePlaceHolder from "../components/assets/profileplaceholder";
import Verified from "../components/assets/verified";
import Navbar from "../components/navbar";
import { SelectUser } from "../db/schema";

export default function InvitePage({
  users,
  username,
  image,
  project_id,
}: {
  users: SelectUser[];
  username?: string;
  image?: string;
  project_id: string;
}) {
  return (
    <div class="flex">
      <Navbar username={username} image={image && image} />
      <main hx-target-400="#error-message" class="w-full h-full px-6">
        <h1 class="text-xl font-bold py-3">Invite Users</h1>
        <div id="error-message"></div>
        <ul id="list" class="grid grid-cols-1 grid-flow-row gap-4">
          {users.map((user) => (
            <>
              <li class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 rounded-lg w-full p-5 flex items-center justify-between">
                <div>
                  <div class="flex items-center w-full">
                    {user.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        width="37.5"
                        height="37.5"
                        class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 rounded-full"
                        alt="Profile Picture"
                      />
                    ) : (
                      <div class="bg-[#fcfcfc] dark:bg-[#0e0e0e] rounded-full w-[37.5px] h-[37.5px] flex items-center justify-center">
                        <ProfilePlaceHolder />
                      </div>
                    )}
                    <div class="flex items-center ml-2">
                      <div class="flex flex-col sm:flex-row sm:items-center">
                        <div class="flex space-x-1 sm:items-center w-[160px] sm:w-auto">
                          <a
                            href={`/profile/${user.username}`}
                            aria-label={`${user.username} Profile Page`}
                            class="hover:underline line-clamp-1"
                          >
                            @{user.username}
                          </a>
                          {user.verified && (
                            <span class="text-black dark:text-white">
                              <Verified />
                            </span>
                          )}
                          <div class="px-2 hidden sm:block">
                            <div class="h-[7.5px] w-[7.5px] bg-zinc-300 dark:bg-zinc-800 rounded-full"></div>
                          </div>
                        </div>

                        <ul class="text-[#444444] dark:text-[#B1B1B1] flex space-x-2 line-clamp-1">
                          {user.roles.map((role, index) => (
                            <li class={index > 0 ? "hidden sm:block" : ""}>
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="pl-[45.5px] pt-1.5">
                    {user.languages.map((lang, index) => (
                      <>
                        {index > 0 && ", "}
                        {lang}
                      </>
                    ))}
                  </div>
                </div>

                <button
                  hx-post={`/invite/${project_id}/${user.id}`}
                  hx-trigger="click"
                  hx-swap="outerHTML"
                  class="text-white bg-black dark:text-black dark:bg-white px-3.5 py-1 font-medium rounded-md"
                >
                  Invite
                </button>
              </li>
            </>
          ))}
        </ul>
      </main>
    </div>
  );
}
