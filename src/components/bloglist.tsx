import { SelectBlog } from "../db/schema";

export default function BlogList({
  blogs,
  type,
}: {
  blogs: SelectBlog[];
  type?: string;
}) {
  return (
    <ul
      id="list"
      class={
        type === "single"
          ? "grid grid-cols-1 gap-4 grid-flow-row"
          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row"
      }
    >
      {blogs.map((blog) => (
        <li class="bg-[#010101] border border-zinc-800 p-5 rounded-lg w-full hover:scale-105 hover:z-40 transition duration-500 hover:cursor-pointer flex  flex-col">
          <a href={`/blog/${blog.id}`} class="flex-grow">
            <div class="flex space-x-2">
              <div>
                <h2 class="text-xl font-semibold  w-full line-clamp-1">
                  {blog.title}
                </h2>
                <span class="text-[#444444] dark:text-[#B1B1B1] font-semibold tracking-wide">
                  {blog.posted}
                </span>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
