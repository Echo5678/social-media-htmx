const Header = () => {
  return (
    <header
      hx-boost="true"
      class="pt-4 flex justify-between items-center text-sm"
    >
      <a class="sm:text-lg font-semibold hover:cursor-pointer transition  flex items-center">
        <img
          height="65"
          width="65"
          src="https://d20yxzu0sm1upk.cloudfront.net/logo-min_65x65.png"
          alt="Co-Dev Logo"
        />
        Co-Dev
      </a>
      <nav class="flex space-x-6 font-semibold items-center text-[#444444] dark:text-[#B1B1B1]">
        <a
          href="/sign-in"
          hx-push-url="true"
          class="hover:text-zinc-400 dark:hover:text-white"
        >
          Log in
        </a>
        <a
          href="/sign-up"
          class="dark:text-[#1e1e1e] text-white bg-black dark:bg-white py-1.5 px-4 rounded-md hover:bg-zinc-100 active:shadow-inner"
        >
          Sign up
        </a>
      </nav>
    </header>
  );
};

export default Header;
