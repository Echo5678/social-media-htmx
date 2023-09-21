const MessagePage = () => (
  <main hx-ext="ws" ws-connect="/messages-ws">
    <form ws-send>
      <input
        id="message"
        type="text"
        name="chat_message"
        class="outline-none bg-transparent border-zinc-200 dark:border-zinc-800 border rounded-md w-full md:w-1/2 block m-6 p-1 focus:border-blue-500"
      />
    </form>
    <div id="chat"></div>
  </main>
);

export default MessagePage;
