import { Elysia, t } from "elysia";
import html from "@elysiajs/html";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import { SelectUser, followers, users } from "../../db/schema";
import { sql, eq } from "drizzle-orm";
import { MessageLayout } from "../../pages/base/messagelayout";
import MessagePage from "../../pages/message";
import ProfilePage from "../../pages/profilepage";
import { BaseHtml } from "../../pages/base/basehtml";

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
          id: users.id,
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
    .get("/profile/:id", async ({ userAuthorized, set, params: { id } }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const userId = Number(id);

      const userPrepared = db
        .select()
        .from(users)
        .where(eq(sql.placeholder("id"), users.id))
        .limit(1)
        .prepare("select_user");
      const user1: SelectUser[] = await userPrepared.execute({ id: userId });

      const followerPrepared = db
        .select({ count: sql<number>`count(*)` })
        .from(followers)
        .where(eq(sql.placeholder("id"), followers.user_id))
        .prepare("select_followers");
      const Followers = await followerPrepared.execute({ id: userId });

      const followingPrepared = db
        .select({ count: sql<number>`count(*)` })
        .from(followers)
        .where(eq(sql.placeholder("id"), followers.follower_id))
        .prepare("select_following");
      const following = await followingPrepared.execute({ id: userId });

      return (
        <BaseHtml>
          <ProfilePage
            user={user1[0]}
            followers={Followers[0].count}
            following={following[0].count}
          />
        </BaseHtml>
      );
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
