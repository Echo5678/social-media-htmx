const Header = () => {
  return (
    <header hx-boost="true" class="pt-4 flex justify-between items-center">
      <a class="text-2xl font-semibold hover:cursor-pointer">Co-Dev</a>
      <nav class="flex space-x-6 font-semibold items-center text-[#444444] dark:text-[#B1B1B1]">
        <a
          href="/pricing"
          hx-push-url="true"
          preload="mouseover"
          class="hover:text-white"
        >
          Pricing
        </a>
        <a
          href="/sign-in"
          hx-push-url="true"
          preload="mouseover"
          class="hover:text-white"
        >
          Log in
        </a>
        <a
          href="/sign-up"
          preload="mouseover"
          class="dark:text-[#1e1e1e] text-white bg-black dark:bg-white py-1.5 px-4 rounded-md hover:bg-zinc-100 active:shadow-inner"
        >
          Sign up
        </a>
      </nav>
    </header>
  );
};

export default Header;
