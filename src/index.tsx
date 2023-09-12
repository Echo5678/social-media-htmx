import { Elysia, t, ws } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

import { db } from "./db/client";
import { users } from "./db/schema";
import { sql } from "drizzle-orm";

import { BaseHtml } from "./pages/basehtml";
import { auth, home } from "./routes";

const WEEK = 60 * 60 * 24 * 7;

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
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET as string,
    })
  )
  .use(
    cookie({
      httpOnly: true,
      maxAge: WEEK,
      sameSite: "strict",
      signed: true,
      secret: process.env.COOKIE_SECRET as string,
    })
  )
  .use(html())
  .use(ws())
  .derive(async ({ jwt, cookie: { user } }) => {
    let userAuthorized;

    if (!user) {
      return userAuthorized;
    }

    const userJWT: any = await jwt.verify(user);
    const User: any = await db
      .select({
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(sql`${users.email} = ${userJWT.email} and ${user} = ${users.jwt}`)
      .limit(1);

    if (User) {
      userAuthorized = User[0];
    }
    return {
      userAuthorized,
    };
  })
  .use(auth)
  .use(home)
  .ws("/message", {
    open(ws) {
      console.log("Connected");
    },
    message(ws, message: any) {
      ws.send(`
        <div id="chat-message" class="dark:text-white text-black">
          ${message.chat_message}
        </div>`);
    },
  })
  .onError(({ code, error, set }) => {
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
