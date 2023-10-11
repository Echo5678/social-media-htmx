import { Elysia, t, ws } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";

import { BaseHtml } from "./pages/base/basehtml";
import { auth, home, project, blog, user } from "./routes";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Co-Dev Documentation",
          version: "1.0.0",
        },
      },
    })
  )

  .use(html())
  .use(ws())
  .use(auth)
  .use(home)
  .use(project)
  .use(blog)
  .use(user)
  .ws("/messages-ws", {
    open(ws) {
      ws.subscribe("group-chat").publish(
        "group-chat",
        <p>`${ws.data.userAuthorized.username} has joined the chat.`</p>
      );
    },
    message(ws, message: any) {
      console.log(message);
      ws.publish(
        "group-chat",
        <div id="chat" class="dark:text-white text-black">
          ${message.chat_message}
        </div>
      );
      ws.send(
        <div id="chat" class="dark:text-white text-black">
          {message.chat_message}
        </div>
      );
    },
    close(ws) {
      ws.publish("group-chat", "Bro has left chat 💀");
      ws.unsubscribe("group-chat");
    },
  })
  .onError(({ code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return (
        <BaseHtml>
          <div class="text-4xl md:text-5xl font-bold text-center my-auto">
            Error 404: Page not found
          </div>
        </BaseHtml>
      );
    }
    return (
      <div class="text-4xl md:text-5xl font-bold text-center my-auto">
        Smile if you like D#ck.
        {`Error: ${code}`}
      </div>
    );
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
