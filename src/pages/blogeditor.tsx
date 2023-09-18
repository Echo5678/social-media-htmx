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
      <main class="p-10  rounded-md">
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
        <div id="editor" class="p-2"></div>
      </main>
    </div>
  );
};

export default BlogEditor;
