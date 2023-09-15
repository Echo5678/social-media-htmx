import trending from "../trending.json";

const Trending = () => {
  return (
    <div class="flex flex-col justify-between items-center w-[90%] h-[90%] m-auto">
      <div class="flex flex-col border-[1px] p-[5%] rounded-lg h-[20vh] justify-between w-[100%] items-left">
        <h1 class="font-bold text-[3vh]">Subscribe to Premium</h1>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button class="bg-gradient-to-r from-purple-400 to-pink-600 h-[6vh] text-[2vh] rounded-full w-[40%]">
          Subscribe
        </button>
      </div>
      <div class="flex flex-col border-[1px] w-[100%] justify-center items-center rounded-lg p-[5%] mt-[5%]">
        <h1 class="font-bold text-[3vh] h-[6vh] justify-center items-center">
          Trending
        </h1>
        <div class="flex flex-col w-[90%]">
          {trending.map((item) => (
            <div class="mb-[5%] w-[100%]">
              <p class="text-[#6d747d]">{item.location}</p>
              <h1 class="font-bold text-[1.5vh]">{item.title}</h1>
              <p>{item.posts}</p>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Trending;
