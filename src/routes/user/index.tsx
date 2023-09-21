import { Elysia, t } from "elysia";
import html from "@elysiajs/html";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import { users } from "../../db/schema";
import { sql, eq } from "drizzle-orm";
import { MessageLayout } from "../../pages/base/messagelayout";
import MessagePage from "../../pages/message";

const WEEK = 60 * 60 * 24 * 7;

export const user = (app: Elysia) =>
  app
    .use(html())
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
    .derive(async ({ jwt, cookie: { user } }) => {
      let userAuthorized;

      if (!user) {
        return userAuthorized;
      }

      const userJWT: any = await jwt.verify(user);

      if (!userJWT) {
        return userAuthorized;
      }

      const User: any = await db
        .select({
          username: users.username,
          email: users.email,
        })
        .from(users)
        .where(
          sql`${users.email} = ${userJWT.email} and ${user} = ${users.jwt}`
        )
        .limit(1);

      if (User) {
        userAuthorized = User[0];
      }
      return {
        userAuthorized,
      };
    })
    .patch("/badges/:id", async ({ params: { id }, userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const [badges] = await db.execute(
        sql`update users SET badges = array_append(badges, 'badge')  where ${users.id} = ${id}`
      );
      console.log(badges, "patch");
      return <p>{badges}</p>;
    })
    .get("/badges/:id", async ({ params: { id }, userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const [badges] = await db
        .select({
          badges: users.badges,
        })
        .from(users)
        .where(eq(users.username, userAuthorized.username));

      console.log(badges, "get");
      return <p>{badges}</p>;
    })
    .get("/messages", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <MessageLayout>
          <MessagePage />
        </MessageLayout>
      );
    });
