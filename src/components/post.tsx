interface PostProps {
  creator: string;
  handle: string;
  profilePic: string;
  title: string;
  timestamp: string;
  technologies: string[];
}

const Post = ({
  creator,
  handle,
  profilePic,
  title,
  timestamp,
  technologies,
}: PostProps) => {
  return (
    <div class="w-[90%] p-[5%] mr-auto ml-auto mt-[3%] border-[1px] rounded-lg md:border-r-2 md:border-l-2">
      <div class=" flex flex-row items-center justify-center items-center w-[90%]">
        <div class="flex flex-col w-[100%]">
          <div class="flex flex-row items-center ">
            <div class="items-center w-[100%] flex flex-row md:w-[45%]">
              <img
                src={profilePic}
                class="h-[4vh] rounded-full mr-auto border-[1px]"
              />
              <div class="flex flex-col items-left justify-between ml-[5%] w-[100%]">
                <p class="text-[1.5vh] font-bold">{creator}</p>
                <p class="ml-[1%] text-[1.3vh]">{handle}</p>
              </div>
            </div>
          </div>
          <div class=" flex flex-row h-[10vh] w-[100%] justify-between">
            <div class="items-left flex flex-col justify-center mt-auto">
              <h1 class="text-[1.8vh] font-bold">{title}</h1>
              <p class="text-[1.5vh]">{timestamp}</p>
            </div>
            <div class="flex flex-row justify-between w-[30%] md:w-[15%]">
              {technologies.map((tech) => (
                <img class="h-[35%] mt-auto" src={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Post;
