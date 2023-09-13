export default function HomePage() {
  return (
    <div hx-ext="ws" ws-connect="/message">
      <form id="form" ws-send>
        <input
          name="chat_message"
          class="bg-transparent outline-none text-black dark:text-white border-white border"
        />
      </form>
      <div id="chat-message" hx-swap-oob="afterend">
        ...
      </div>
    </div>
  );
}
