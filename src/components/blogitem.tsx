import { SelectBlog } from "../db/schema";

function BlogItem({
  blog,
  skip,
  username,
  skipAmount,
}: {
  skip: boolean;
  username?: string;
  skipAmount: number;
  blog: SelectBlog;
}) {
  return (
    <li
      {...(skip
        ? {
            "hx-get": username
              ? `/blog-list/${username}/?skip=${skipAmount ? skipAmount : 10}`
              : `/blog-list/?skip=${skipAmount ? skipAmount : 10}`,
            "hx-trigger": "revealed",
            "hx-swap": "afterend",
          }
        : {})}
      class="bg-[#f9f9f9] dark:bg-[#010101] border border-zinc-300 dark:border-zinc-800 p-5 rounded-lg w-full hover:cursor-pointer flex  flex-col"
    >
      <a href={`/blog/${blog.id}`} class="flex-grow">
        <div class="flex space-x-2">
          <div>
            <h2 class="text-xl font-semibold  w-full line-clamp-1">
              {blog.title}
            </h2>
            <span class="text-[#444444] dark:text-[#B1B1B1]">
              {new Date(String(blog.posted)).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}

export default BlogItem;
