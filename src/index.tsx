import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import { BaseHtml } from "./pages/base/basehtml";
import { auth, home, project, blog, user } from "./routes";

const WEEK = 60 * 60 * 24 * 7;

const app = new Elysia({
  cookie: {
    httpOnly: true,
    maxAge: WEEK,
    secure: process.env?.NODE_ENV === "production",
    sameSite: "strict",
  },
})
  .use(html())
  .use(auth)
  .use(home)
  .use(project)
  .use(blog)
  .use(user)
  .ws("/messages-ws", {
    open(ws) {
      console.log("Connected to Websocket");
      ws.subscribe("meow");
    },
    message(ws, message: any) {
      console.log(message);
      ws.publish(
        "meow",
        <>
          <div id="chat" hx-swap-oob="beforeend">
            <p class="py-2 px-3.5 rounded-3xl bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white self-start max-w-[85%]">
              {`${message.chat_message}${" "}`}
            </p>
          </div>
        </>
      );
      ws.send(
        <>
          <div id="chat" hx-swap-oob="beforeend">
            <p class="self-end py-2 px-3.5  bg-blue-800 rounded-3xl text-white max-w-[85%]">
              {`${message.message}${" "}`}
            </p>
          </div>
        </>
      );
    },
    close(ws) {
      ws.unsubscribe("group-chat");
    },
    perMessageDeflate: true,
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
  .listen({
    port: 3000,
    hostname: "0.0.0.0",
  });

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}/`
);
