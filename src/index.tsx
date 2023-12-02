import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import { BaseHtml } from "./pages/base/basehtml";
import { auth, home, project, blog, user, message, bleep } from "./routes";

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
  .use(bleep)
  .use(message)
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
