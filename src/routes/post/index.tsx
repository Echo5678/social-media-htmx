import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

import { db } from "../../db/client";
import { projects, users } from "../../db/schema";
import { sql } from "drizzle-orm";
import html from "@elysiajs/html";

const WEEK = 60 * 60 * 24 * 7;

const post = (app: Elysia) => {
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
    });

  // const updateLikes = await db.update(projects)
  // .set({likes: array_append(projects,${projectId})})
  // .where(sql`${usersTable.id == ${useId}}`)
};

export default post;
