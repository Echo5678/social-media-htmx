import { Elysia, t, ws } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";

import { BaseHtml } from "./pages/basehtml";
import { auth, home } from "./routes";

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
  .ws("/message", {
    open(ws) {
      console.log("Connected");
      ws.subscribe("group-chat");
      ws.publish("group-chat", "<p>User connect</p>");
    },
    message(ws, message: any) {
      ws.publish(
        "group-chat",
        `<div id="chat-message" class="dark:text-white text-black">
          ${message.chat_message}
        </div>`
      );
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
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
