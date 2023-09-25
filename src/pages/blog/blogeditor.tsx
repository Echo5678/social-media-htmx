const BlogEditor = () => {
  return (
    <div>
      <header class="pl-6 pt-6">
        <a
          hx-boost
          preload="mouseover"
          hx-push-url
          href="/home"
          class="text-2xl font-semibold hover:cursor-pointer"
        >
          Co-Dev
        </a>
      </header>
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
          class="p-2  prose prose-stone dark:prose-invert md:prose-lg lg:prose-xl prose-p:leading-relaxed prose-p:pt-4 max-w-none prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-h1:text-2xl md:prose-h1:text-4xl xl:prose-h1:text-5xl"
        ></div>
        <button
          type="submit"
          class="outline-none bg-black text-white  dark:bg-white dark:text-black px-3 py-1 rounded-md mt-6 text-lg ml-auto self-end"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
