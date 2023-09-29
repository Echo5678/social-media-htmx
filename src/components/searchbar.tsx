import FilterIcon from "./assets/filtericon";
import SearchIcon from "./assets/searchicon";

const SearchBar = () => (
  <search class="w-full flex space-x-2 items-center mb-4">
    <div class="w-full px-2.5 border border-zinc-300 dark:border-zinc-800 rounded-md flex items-center space-x-2 bg-zinc-50 dark:bg-black">
      <SearchIcon />
      <input
        hx-get="/search-for"
        hx-trigger="keyup changed delay:250ms, search"
        hx-target="#list"
        hx-swap="outerHTML"
        type="search"
        id="search"
        name="search"
        maxlength="100"
        placeholder="Search your favorite topics"
        class="bg-transparent w-full outline-none py-1.5 flex-grow"
      />
    </div>
    <button
      name="filter"
      class="bg-black text-white dark:bg-white dark:text-black py-[5.5px] px-3 rounded-md"
    >
      <FilterIcon />
    </button>
  </search>
);

export default SearchBar;
