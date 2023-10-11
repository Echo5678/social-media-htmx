import Navbar from "../components/navbar";

const MessagePage = ({
  username,
  image,
}: {
  username?: string;
  image?: string;
}) => (
  <div class="flex">
    <Navbar username={username && username} image={image && image} />
    <main
      hx-ext="ws"
      ws-connect="/messages-ws"
      class="w-full md:w-1/2 block px-6"
    >
      <h1 class="py-3 text-xl font-bold">Messages</h1>
      <form ws-send>
        <input
          id="message"
          type="text"
          name="chat_message"
          aria-label="Message"
          class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md p-1 focus:border-blue-500"
        />
      </form>
      <div id="chat"></div>
    </main>
  </div>
);

export default MessagePage;
