export default function SignInPage() {
  return (
    <form
      class="flex justify-center items-center flex-col space-y-4 min-h-screen px-4"
      hx-post="/sign-in"
      hx-replace-url="/home"
      hx-trigger="submit"
      hx-target="#main"
      hx-swap="outerHTML"
      hx-target-400="#error-message"
      hx-target-500="#error-message"
    >
      <h1 class="text-3xl font-medium">Log in with Co-Dev</h1>
      <div id="error-message"></div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        class="outline-none bg-transparent border dark:border-zinc-900 text-lg px-3 py-3.5 rounded-md w-full sm:w-1/2 md:w-1/3 xl:w-1/4 invalid:border-red-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="outline-none bg-transparent border dark:border-zinc-900 text-lg px-3 py-3.5 rounded-md w-full sm:w-1/2 md:w-1/3 xl:w-1/4"
      />
      <button
        class="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 bg-black text-white dark:bg-white dark:text-black rounded-md py-2 text-center font-medium hover:cursor-pointer"
        type="submit"
      >
        Sign In
      </button>
      <span>
        Never used CoDev?{" "}
        <a
          href="/sign-up"
          hx-push-url="true"
          class="text-blue-500 hover:underline"
        >
          Sign up
        </a>
      </span>
    </form>
  );
}
