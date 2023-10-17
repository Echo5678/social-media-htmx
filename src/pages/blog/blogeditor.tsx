import Navbar from "../../components/navbar";

const BlogEditor = ({
  username,
  image,
}: {
  username?: string;
  image?: string;
}) => {
  return (
    <div class="flex">
      <Navbar username={username && username} image={image && image} />
      <main class="w-full">
        <form
          hx-post="/blog"
          hx-target="#main"
          hx-trigger="submit"
          class="p-10  rounded-md flex flex-col"
        >
          <label for="title" class="text-xl font-medium">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full block mb-6 p-3 focus:border-blue-500 mt-1.5"
            placeholder="Name your blog post"
          />
          <input id="blog" name="blog" type="text" class="hidden" />
          <div
            id="editor"
            class="prose prose-stone dark:prose-invert sm:prose-lg lg:prose-xl max-w-none p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg h-full"
            disabled
          ></div>
          <button
            type="submit"
            class="outline-none bg-black text-white  dark:bg-white dark:text-black px-3 py-1 rounded-md mt-6 text-lg ml-auto self-end"
          >
            Post
          </button>
        </form>
      </main>
    </div>
  );
};

export default BlogEditor;
