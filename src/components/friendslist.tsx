import friends from "../friends.json";

const FriendsList = () => {
  return (
    <div class=" md:w-[90%] md:h-[95%] border-[1px] rounded-lg flex flex-col  items-center md:pt-[5%] justify-around">
      <input
        class="border-[1px] bg-[#0e0e0e] rounded-full w-[90%] h-[5vh] pl-[4%]"
        placeholder="Search"
      />
      <div class="flex flex-col w-[90%] h-[100%] rounded-lg justify-around items-center overflow-hidden mt-[5%]">
        {friends.map((item) => (
          <div class="flex flex-row h-[8vh] items-center justify-around border-[1px] p-[5%] w-[90%] rounded-lg mb-[5%]">
            <div class="flex flex-col justify-around">
              <p class="text-[1.5vh] font-bold">{item.name}</p>
              <p class="text-[1.3vh]">{item.handle}</p>
            </div>
            <p class="text-[1.3vh]">{item.lastActive}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
