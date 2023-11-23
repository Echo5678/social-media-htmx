import { SelectUser } from "../db/schema";
import Calendar from "./assets/calendar";
import ProfilePlaceHolder from "./assets/profileplaceholder";
import Verified from "./assets/verified";

const ProfileInfo = ({
  user,
  isUserAccount,
}: {
  user: SelectUser;
  isUserAccount: boolean;
}) => {
  return (
    <>
      {user?.backgroundImage ? (
        <img
          src={user?.backgroundImage}
          alt="Profile Banner Image"
          hx-swap-oob="true"
          width="750"
          height="200"
          class="w-full h-[20vw] sm:h-[15vw] lg:h-[12.5vw] xl:h-[7.5vw] bg-black dark:bg-white"
        ></img>
      ) : (
        <div
          hx-swap-oob="true"
          id="user-background"
          class="w-full h-[20vw] sm:h-[15vw] lg:h-[12.5vw] xl:h-[7.5vw] bg-zinc-300 dark:bg-zinc-800"
        ></div>
      )}
      {user?.profile_picture ? (
        <img
          src={`https://d20yxzu0sm1upk.cloudfront.net/${user.profile_picture}`}
          width="75"
          height="75"
          class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 absolute -bottom-7 left-5 rounded-full"
          alt="Profile Picture"
          id="profile_picture"
          hx-swap-oob="true"
        />
      ) : (
        <div
          class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 absolute -bottom-7 left-5 rounded-full w-[75px] h-[75px] flex items-center justify-center"
          id="profile_picture"
          hx-swap-oob="true"
        >
          <ProfilePlaceHolder />
        </div>
      )}
      <h1 id="name" hx-swap-oob="true" class="text-2xl md:text-3xl font-bold">
        {user.name}
      </h1>
      {user.verified && (
        <span
          hx-swap-oob="true"
          id="verified"
          class="text-black dark:text-white"
        >
          <Verified />
        </span>
      )}
      {!isUserAccount &&
        (user?.exists ? (
          <button
            hx-swap-oob="true"
            hx-delete={`/unfollow/${user.id}`}
            hx-swap="outerHTML"
            hx-target="#follow"
            id="follow"
            class=" px-4 py-2 border rounded-md bg-black text-white dark:bg-white dark:text-black font-medium"
          >
            Following
          </button>
        ) : (
          <button
            hx-swap-oob="true"
            hx-target="#follow"
            hx-post={`/follow/${user.id}`}
            hx-swap="outerHTML"
            id="follow"
            class=" px-4 py-2 border rounded-md bg-black text-white dark:bg-white dark:text-black font-medium"
          >
            Follow
          </button>
        ))}
      <h2
        id="username"
        hx-swap-oob="true"
        class="text-[#444444] dark:text-[#B1B1B1]"
      >
        @{user.username}
      </h2>
      <span id="joined" hx-swap-oob="true" class="mt-1">
        <Calendar className="inline" /> Joined{" "}
        {new Date(String(user.joined)).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
      <ul id="following_info" hx-swap-oob="true" class="flex space-x-3  mt-3">
        <li id="follower-count">
          <span class="dark:text-white text-black mr-1 font-medium">
            {user.follower_count}
          </span>
          Followers
        </li>
        <li>
          <span class="dark:text-white text-black mr-1 font-medium">
            {user.following_count}
          </span>
          Following
        </li>
      </ul>
      <section
        id="user_bio"
        hx-swap-oob="true"
        class="pr-2 py-1 w-full xl:w-[75%]"
      >
        {user.bio}
      </section>
    </>
  );
};

export default ProfileInfo;
