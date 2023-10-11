import { Elysia, t } from "elysia";
import html from "@elysiajs/html";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import {
  InsertFollower,
  SelectNotification,
  SelectUser,
  followers,
  notifications,
  projects,
  users,
} from "../../db/schema";
import { sql, eq } from "drizzle-orm";

import { MessageLayout } from "../../pages/base/messagelayout";
import MessagePage from "../../pages/message";
import ProfilePage from "../../pages/profilepage";
import { BaseHtml } from "../../pages/base/basehtml";
import NotificationsPage from "../../pages/notificationspage";
import NotificationsList from "../../components/notifications/notificationslist";
import { ProfileLayout } from "../../pages/base/profile-layout";
import NotificationIcon from "../../components/assets/notificationicon";

import validator from "validator";

const WEEK = 60 * 60 * 24 * 7;

const followingPrepared = db
  .select({ count: sql<number>`count(*)` })
  .from(followers)
  .where(eq(sql.placeholder("id"), followers.follower_id))
  .prepare("select_following");

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

      if (userJWT) {
        userAuthorized = userJWT;
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
    .get(
      "/profile/:username",
      async ({ userAuthorized, set, params: { username } }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }

        const userPrepared = db
          .select()
          .from(users)
          .where(eq(sql.placeholder("username"), users.username))
          .limit(1)
          .prepare("select_user");
        const user1: SelectUser[] = await userPrepared.execute({ username });

        const followerPrepared = db
          .select({ count: sql<number>`count(*)` })
          .from(followers)
          .where(eq(sql.placeholder("id"), followers.user_id))
          .prepare("select_followers");
        const Followers = await followerPrepared.execute({ id: user1[0].id });

        const following = await followingPrepared.execute({ id: user1[0].id });

        const is_following = await db
          .select()
          .from(followers)
          .where(
            sql`${followers.user_id} = ${user1[0].id} and ${followers.follower_id} = ${userAuthorized.id}`
          );

        const postsPrepared = db
          .select()
          .from(projects)
          .where(eq(sql.placeholder("username"), projects.username))
          .prepare("select_projects");
        const posts = await postsPrepared.execute({
          username: user1[0].username,
        });

        const isUserAccount = user.username === user1[0].username;

        return (
          <ProfileLayout>
            <ProfilePage
              user={user1[0]}
              followers={Followers[0].count}
              following={following[0].count}
              posts={posts}
              isFollowing={is_following ? true : false}
              isUserAccount={isUserAccount}
              username={user.username}
              image={user?.image}
            />
          </ProfileLayout>
        );
      }
    )
    .post("/follow/:id", async ({ userAuthorized, set, params: { id } }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      const follow: InsertFollower[] = await db
        .insert(followers)
        .values({ user_id: Number(id), follower_id: user.id })
        .returning();

      const following = await followingPrepared.execute({ id: user.id });
      return (
        <div>
          <button
            hx-delete={`/unfollow/${id}`}
            hx-swap="outerHTML"
            hx-target="#follow"
            id="follow"
            class=" px-4 py-2 border rounded-md bg-black text-white dark:bg-white dark:text-black font-medium"
          >
            Following
          </button>
          <div id="followerCount" hx-swap-oob="true">
            <span class="dark:text-white text-black mr-1 font-medium">
              {following[0].count}
            </span>
          </div>
        </div>
      );
    })
    .get("/notifications-list", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 401;
        return;
      }

      const notis: SelectNotification[] = await db
        .select()
        .from(notifications)
        .where(eq(notifications.user_id, Number(user.id)));

      if (notis.length === 0) {
        return <p>Sorry no notifications yet. {":("}</p>;
      }

      return <NotificationsList notis={notis} />;
    })
    .get("/notifications-count", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 401;
        return;
      }
      const noti_count = await db
        .select({ count: sql<number>`count(*)` })
        .from(notifications)
        .where(eq(notifications.user_id, user.id))
        .limit(1);

      return (
        <li class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-2.5 md:rounded-full">
          <a
            href="/notifications"
            aria-label="Notifications Page"
            hx-boost="true"
            hx-push-url
          >
            <NotificationIcon notification_count={noti_count[0].count} />
          </a>
        </li>
      );
    })
    .get("/notifications", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      return (
        <BaseHtml>
          <NotificationsPage username={user.username} image={user?.image} />
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
          <MessagePage username={user.username} image={user?.image} />
        </MessageLayout>
      );
    });
