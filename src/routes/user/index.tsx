import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import client from "../../db/redis-client";
import { db } from "../../db/client";

import {
  SelectNotification,
  followers,
  messages,
  notifications,
  users,
} from "../../db/schema";
import { sql, eq, and, asc, or } from "drizzle-orm";

import fs from "fs";
import { randomBytes } from "crypto";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({ region: process.env.BUCKET_REGION });

import { BaseHtml } from "../../pages/base/basehtml";
import { MessageLayout } from "../../pages/base/basehtml";

import MessagePage from "../../pages/message";
import ProfilePage from "../../pages/profilepage";
import NotificationsPage from "../../pages/notificationspage";

import NotificationsList from "../../components/notifications/notificationslist";
import NotificationIcon from "../../components/assets/notificationicon";
import MessageUserList from "../../components/message-user-list";

import ProfileIcon from "../../components/assets/profileicon";

const followingPrepared = db
  .select({ count: sql<number>`count(*)` })
  .from(followers)
  .where(eq(sql.placeholder("id"), followers.follower_id))
  .prepare("select_following");

export const user = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET as string,
      })
    )
    .derive(async ({ jwt, cookie: { user } }) => {
      let userAuthorized;

      if (!user.value) {
        return userAuthorized;
      }

      const userJWT: any = await jwt.verify(user.value);

      if (userJWT) {
        userAuthorized = userJWT;
      }

      return {
        userAuthorized,
      };
    })
    .patch(
      "/user",
      async ({
        userAuthorized,
        set,
        body: { username, name, profile_picture },
      }) => {
        if (!userAuthorized) {
          set.status = 307;
          set.redirect = "/sign-in";
        }

        const profile_picture_name = `${randomBytes(32).toString(
          "hex"
        )}_${Date.now().toString()}`;

        const userUpdates = {
          ...(username && { username: username?.toLowerCase() }),
          ...(name && { name }),
          ...(profile_picture && { profile_picture: profile_picture_name }),
        };

        if (profile_picture) {
          const buffer = await profile_picture?.arrayBuffer();
          const file = Buffer.from(buffer);

          fs.writeFile(
            profile_picture?.name as string,
            file,
            "binary",
            function (err) {
              if (err) console.error(err);
            }
          );

          fs.readFile(profile_picture?.name as string, function (err, data) {
            const params = {
              Bucket: process.env.BUCKET_NAME as string,
              Key: profile_picture_name,
              ContentType: profile_picture?.type,
              Body: data,
            };

            s3Client.send(new PutObjectCommand(params), function (err, data) {
              if (err) {
                return console.error(err);
              }
              console.log("Successfully uploaded profile_picture");
            });
          });

          fs.unlink(profile_picture?.name, function (err) {
            if (err) return console.error(err);
            console.log("File deleted successfully");
          });
        }

        const [user1] = await db
          .update(users)
          .set(userUpdates)
          .where(eq(users.id, userAuthorized.id))
          .returning({
            updatedName: users.name,
            updatedUsername: users.username,
          });

        return (
          <>
            <h1
              hx-swap-oob="name"
              id="name"
              class="text-2xl md:text-3xl font-bold"
            >
              {user1.updatedName}
            </h1>
            <h2
              hx-swap-oob="username"
              id="username"
              class="text-[#444444] dark:text-[#B1B1B1]"
            >
              @{user1.updatedUsername}
            </h2>
            <p class="text-green-600 dark:text-green-300">Saved</p>
          </>
        );
      },
      {
        body: t.Object({
          name: t.Optional(t.String()),
          username: t.Optional(t.String()),
          profile_picture: t.Optional(t.File()),
        }),
      }
    )
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

      return <p>{badges}</p>;
    })
    .get(
      "/:username",
      async ({ userAuthorized, set, params: { username } }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }

        if (username === "favicon.ico") {
          set.status = 304;
          return;
        }

        let userInfoCached;

        if (user?.username) {
          userInfoCached = await client.get(
            `${user?.username}-${username}-info`
          );
        } else {
          userInfoCached = await client.get(`${username}-info`);
        }

        if (userInfoCached) {
          userInfoCached = JSON.parse(userInfoCached);

          return (
            <BaseHtml>
              <ProfilePage
                user={userInfoCached}
                isUserAccount={userInfoCached.id == user?.id}
                username={user?.username}
                profile_picture={user?.profile_picture}
              />
            </BaseHtml>
          );
        }

        const user1 = await db.execute(
          sql`WITH userInfo AS (SELECT * FROM users WHERE username = ${username}), followerInfo AS (SELECT sum((user_id = (SELECT id FROM userInfo))::int) as follower_count, sum((follower_id = (SELECT id FROM userInfo))::int) as following_count, sum((follower_id = (SELECT id FROM userInfo))::int) as following_count  FROM followers), isFollowing AS (select exists(select 1 from followers where user_id = (SELECT id FROM userInfo) AND follower_id = ${
            user?.id ? user?.id : 0
          })) SELECT * FROM userInfo, followerInfo, isFollowing`
        );

        if (user1) {
          const cache = user1[0];

          if (user?.username) {
            await client.setEx(
              `${user.username}-${username}-info`,
              12,
              JSON.stringify(cache)
            );
          } else {
            await client.setEx(`${username}-info`, 12, JSON.stringify(cache));
          }

          return (
            <BaseHtml>
              <ProfilePage
                user={user1[0]}
                isUserAccount={user1[0].id == user?.id}
                username={user?.username}
                profile_picture={user?.profile_picture}
              />
            </BaseHtml>
          );
        }

        set.status = 404;
        return;
      }
    )
    .post("/follow/:id", async ({ userAuthorized, set, params: { id } }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      await db
        .insert(followers)
        .values({ user_id: Number(id), follower_id: user.id });

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
          <div id="followerCount" hx-swap-oob="follower-count">
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
    .get("/check-for-notifications", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 401;
        return;
      }

      const cachedNotifications = await client.get(
        `${user.username}-notifications`
      );

      if (cachedNotifications) {
        return (
          <li class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-2.5 md:rounded-full">
            <a
              href="/notifications"
              aria-label="Notifications Page"
              hx-boost="true"
              hx-push-url
            >
              <NotificationIcon notification={cachedNotifications} />
            </a>
          </li>
        );
      }
      const notification = await db
        .select({ count: sql<number>`count(*)` })
        .from(notifications)
        .where(eq(notifications.user_id, user.id))
        .limit(1);

      await client.setEx(
        `${user.username}-notifications`,
        10,
        notification ? "true" : "false"
      );
      return (
        <li class="md:transition md:hover:bg-zinc-200 md:hover:dark:bg-zinc-800 md:p-2.5 md:rounded-full">
          <a
            href="/notifications"
            aria-label="Notifications Page"
            hx-boost="true"
            hx-push-url
          >
            <NotificationIcon
              notification={notification[0].count >= 1 ? "true" : "false"}
            />
          </a>
        </li>
      );
    })
    .get("/notifications", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 302;
        set.redirect = "/sign-in";
        return;
      }
      return (
        <BaseHtml>
          <NotificationsPage
            username={user?.username}
            profile_picture={user?.profile_picture}
          />
        </BaseHtml>
      );
    })
    .get("/messages", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 302;
        set.redirect = "/sign-in";
        return;
      }

      return (
        <MessageLayout>
          <MessagePage
            username={user.username}
            profile_picture={user?.profile_picture}
          />
        </MessageLayout>
      );
    })
    .get("/messages-list", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      const Users = await db
        .select({
          id: users.id,
          name: users.name,
          username: users.username,
          profile_picture: users.profile_picture,
        })
        .from(followers)
        .where(eq(followers.user_id, user.id))
        .innerJoin(users, eq(followers.follower_id, users.id));

      return <MessageUserList users={Users} />;
    })
    .get(
      "/message-info/:id",
      async ({ userAuthorized, set, params: { id } }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }
        const user_info = db.$with("user_info").as(
          db
            .select({
              username: users.username,
              name: users.name,
              id: users.id,
              profile_picture: users.profile_picture,
            })
            .from(users)
            .where(eq(users.id, Number(id)))
        );
        const message_info = await db
          .with(user_info)
          .select()
          .from(user_info)
          .leftJoin(
            messages,
            or(
              and(
                eq(messages.user_id, user.id),
                eq(messages.sender_id, Number(id))
              ),
              and(
                eq(messages.sender_id, user.id),
                eq(messages.user_id, Number(id))
              )
            )
          )
          .orderBy(asc(messages.sent))
          .limit(10);
        return (
          <>
            <a
              id="user-info"
              href={`/profile/${message_info[0].user_info.username}`}
              aria-label={`${message_info[0].user_info.name} Profile`}
              hx-swap-oob="true"
              class="flex space-x-2 items-center w-fit pb-2"
            >
              {message_info[0].user_info.profile_picture ? (
                <img
                  width="35"
                  height="35"
                  src={user.profilePicture}
                  alt="User Profile Picture"
                  class="rounded-full"
                />
              ) : (
                <ProfileIcon />
              )}
              <p class="font-medium">{message_info[0].user_info.username}</p>
            </a>
            <div id="chat" hx-swap-oob="true">
              {message_info[0]?.messages ? (
                message_info.map((m, index) => (
                  <>
                    <p
                      class={
                        m?.messages.sender_id == user.id
                          ? "self-end py-2 px-3.5  bg-blue-800 rounded-3xl text-white max-w-[85%]"
                          : "py-2 px-3.5 rounded-3xl bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white self-start max-w-[85%]"
                      }
                    >
                      {m?.messages.message}{" "}
                    </p>
                    {Number(message_info[index + 1]?.messages?.sender_id) !==
                      Number(m?.messages.sender_id) && (
                      <p
                        class={
                          m?.messages.sender_id == user.id
                            ? "self-end text-[#444444] dark:text-[#B1B1B1] text-sm"
                            : "text-[#444444] dark:text-[#B1B1B1] text-sm"
                        }
                      >
                        {new Date(String(m?.messages.sent)).toLocaleDateString(
                          "en-us",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </>
                ))
              ) : (
                <p class="text-center">No messages yet.</p>
              )}
            </div>
          </>
        );
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    );
