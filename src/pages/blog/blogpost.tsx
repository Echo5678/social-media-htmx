import ProfilePlaceHolder from "../../components/assets/profileplaceholder";
import Navbar from "../../components/navbar";
import { SelectBlog } from "../../db/schema";

export default function BlogPost({
  blog,
  username,
  image,
}: {
  blog: SelectBlog;
  username?: string;
  image?: string;
}) {
  return (
    <div class="flex">
      <Navbar username={username && username} image={image && image} />
      <main class=" md:w-10/12 xl:w-4/5 mx-auto px-2 md:px-0">
        <h1 class="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center pt-14 md:pt-20 tracking-wide">
          {blog.title}
        </h1>
        <div class="flex flex-col space-y-2 pt-8 xl:pt-10">
          <a href={`/${blog?.username}`} class="flex items-center space-x-2">
            {blog?.profile_picture ? (
              <img
                src={`https://d20yxzu0sm1upk.cloudfront.net/${blog?.profile_picture}`}
                width="50"
                height="50"
                class="rounded-full"
                alt="Profile Picture"
              />
            ) : (
              <div class="bg-[#fcfcfc] dark:bg-[#0e0e0e] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                <ProfilePlaceHolder />
              </div>
            )}
            <h2 class="font-semibold">@{blog?.username}</h2>
          </a>
          <div class="flex space-x-2 pb-2">
            <span>
              {new Date(String(blog.posted)).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>&middot;</span>
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9.005a4 4 0 1 1 0 8a4 4 0 0 1 0-8ZM12 5.5c4.613 0 8.596 3.15 9.701 7.564a.75.75 0 1 1-1.455.365a8.504 8.504 0 0 0-16.493.004a.75.75 0 0 1-1.456-.363A10.003 10.003 0 0 1 12 5.5Z"
                />
              </svg>
              <span>1,120,420</span>
            </div>
          </div>
        </div>
        <div class="w-full h-[1px] px-2 bg-zinc-200 dark:bg-zinc-700"></div>
        <input
          id="blog"
          type="text"
          value={JSON.stringify(blog.blog)}
          class="hidden"
        />
        <article
          id="editor"
          class="prose prose-stone dark:prose-invert sm:prose-lg lg:prose-xl max-w-none prose-a:text-blue-500 hover:prose-a:text-blue-600 pt-8"
        ></article>
        <div class="w-full h-[1px] px-2 bg-zinc-200 dark:bg-zinc-700"></div>
        <footer class="pb-6">
          <div class="flex justify-between px-1 pt-2 pb-3">
            <h4 class="text-xl font-semibold">Comments</h4>
            <h4 class="text-lg font-semibold">Posted September, 2023</h4>
          </div>
          <div>
            <div class="flex items-center">
              <img
                src="https://yt3.ggpht.com/dR6qqf39NiziFmXdMlYnRhVsrM2Qb0b9eQPNhoMICKvZ40Zdxb5zXkqKxX84k_yv7jXojhI1PQ=s108-c-k-c0x00ffffff-no-rj"
                width="45"
                height="45"
                class="bg-[#fcfcfc] dark:bg-[#0e0e0e] p-1 rounded-full"
                alt="Profile Picture"
              />
              <h2>@echo</h2>
            </div>
            <p class="pl-12">
              Worst Blog Post I've ever read you post some shit like this again
              and I'mma beat yo ass.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
