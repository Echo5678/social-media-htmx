import DownVoteRegular from "./assets/downvoteregular";
import UpVoteRegular from "./assets/upvoteregular";

interface PostProps {
  handle: string;
  profilePic: string;
  title: string;
  description: string;
}

const Post = ({ handle, profilePic, title, description }: PostProps) => {
  return (
    <li class="bg-[#010101] border border-zinc-800 p-5 rounded-lg">
      <div class="flex space-x-2">
        <img
          src={profilePic}
          width="50"
          height="50"
          class=" rounded-full"
          alt="Profile Picture"
        />
        <div>
          <h2 class="text-lg font-medium">{title}</h2>
          <span>{handle}</span>
        </div>
      </div>
      <p class="truncate max-w-[400px] pt-2">{description}</p>
      <div class="flex flex-row">
        <UpVoteRegular />
      </div>
    </li>
  );
};

export default Post;
