import { SelectBlog } from "../db/schema";
import BlogItem from "./blogitem";

export default function BlogList({
  blogs,
  type,
  username,
  skipAmount,
}: {
  username: string;
  skipAmount: number;
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
      {blogs.map((blog, index) => (
        <BlogItem
          skip={index === blogs.length - 1}
          username={username}
          skipAmount={skipAmount}
          blog={blog}
        />
      ))}
    </ul>
  );
}
