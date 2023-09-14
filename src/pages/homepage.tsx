import Navbar from "../components/navbar";

export default function HomePage() {
  return (
    <main class="flex m-auto flex-row h-screen w-5/6 ">
      <Navbar />
      <div class="flex flex-col w-2/4 border-x-2 border-[#2f3336] h-screen">
        <div>post compoents go here</div>
      </div>
      <div class="flex flex-col flex-1 justify-around h-screen">
        <div class=" flex h-[10%] justify-center">
          <input
            placeholder="Search"
            class="m-auto bg-[#212327] w-[90%] h-[60%] border rounded-full border-none pl-5"
          />
        </div>
        <div class="flex flex-col h-[22%] bg-[#16181c] w-[90%] justify-between mr-auto ml-auto rounded-lg p-[5%]">
          <h1 class="text-[2.5vh] font-bold">Subscribe to Premium</h1>
          <p class="text-[2vh]">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button class="text-[2vh] w-[40%] bg-gradient-to-r from-purple-400 to-pink-600 rounded-full p-[2%]">
            Subscribe
          </button>
        </div>
        <div class="flex h-[45%] h-flex-col justify-center w-[90%] mr-auto ml-auto">
          <div class="h-[100%] bg-[#16181c] w-full flex flex-col justify-center items-center m-auto rounded- p-[2%]">
            <h1 class="text-[2.5vh] font-bold h-[10%]">Trending</h1>
            <div class="flex flex-col justify-around items-center h-[20%] w-[100%] p-[5%] hover:bg-[#2f3336]">
              <p class="text-[1.5vh] text-[#6d6f70]">
                Pattern AI - 22 minutes ago
              </p>
              <h1 class="text-[2vh] font-bold">Database ML Model</h1>
            </div>
            <div class="flex flex-col justify-around items-left h-[20%] w-[100%] p-[5%] hover:bg-[#2f3336]">
              <p class="text-[1.5vh] text-[#6d6f70]">Trending in California</p>
              <h1 class="text-[2vh] font-bold">Aliens</h1>
              <p class="text-[1.5vh] text-[#6d6f70]">21k posts</p>
            </div>
            <div class="flex flex-col justify-around items-left h-[20%] w-[100%] p-[5%] hover:bg-[#2f3336]">
              <p class="text-[1.5vh] text-[#6d6f70]">Sports - Trending</p>
              <h1 class="text-[2vh] font-bold">Kings of The East</h1>
              <p class="text-[1.5vh] text-[#6d6f70]">2.7k posts</p>
            </div>
            <div class="flex flex-col justify-around items-left h-[20%] w-[100%] p-[5%] hover:bg-[#2f3336]">
              <p class="text-[1.5vh] text-[#6d6f70]">
                Trending in the United States
              </p>
              <h1 class="text-[2vh] font-bold">El Chapo</h1>
              <p class="text-[1.5vh] text-[#6d6f70]">16k posts</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col h-[20%] bg-[#16181c] justify-center items-center w-[90%] mr-auto ml-auto rounded-lg">
          <h1 class="text-[2.5vh] font-bold p-[2%]">Follow Suggestions</h1>
          <div class="flex flex-row justify-around items-center w-[90%] h-[60%]">
            <div class="flex flex-col justify-between w-[40%] p-[2%] items-center">
              <img
                class="w-[70%] rounded-full"
                src="https://chanzuckerberg.com/wp-content/uploads/2018/12/Our-Leadership-Mark1-e1612310553440.jpg"
              />
              <p>@ZuccMe</p>
            </div>
            <div class="flex flex-col items-center w-[40%] p-[2%]">
              <img
                class="w-[50%] rounded-full"
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg"
              />
              <p>@ElonMusk</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
