import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import client from "../../db/redis-client";
import { db } from "../../db/client";

import {
  SelectNotification,
  followers,
  notifications,
  users,
} from "../../db/schema";
import { sql, eq } from "drizzle-orm";

import fs from "fs";
import { randomBytes } from "crypto";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({ region: process.env.BUCKET_REGION });

import { BaseHtml } from "../../pages/base/basehtml";

import ProfilePage from "../../pages/profilepage";
import NotificationsPage from "../../pages/notificationspage";

import NotificationsList from "../../components/notifications/notificationslist";
import ProfileInfo from "../../components/profile-info";

import NotificationIcon from "../../components/assets/notificationicon";

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
        jwt,
        cookie: { user },
      }) => {
        if (!userAuthorized) {
          set.status = 307;
          set.redirect = "/sign-in";
          return;
        }
        let profile_picture_name: string = "";

        if (profile_picture) {
          const db_profile = await db
            .select({ profile_picture: users.profile_picture })
            .from(users)
            .where(eq(users.username, userAuthorized.username));

          profile_picture_name = db_profile
            ? db_profile[0].profile_picture
            : `${randomBytes(32).toString("hex")}_${Date.now().toString()}`;

          console.log(profile_picture);
        }

        const userUpdates = {
          ...(username && { username: username?.toLowerCase() }),
          ...(name && { name }),
          ...(profile_picture && {
            profile_piisFollowingcture: profile_picture_name,
          }),
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
            email: users.email,
            id: users.id,
            updatedProfilePicture: users.profile_picture,
          });

        const JWT = await jwt.sign({
          id: user1.id,
          username: user1.updatedUsername,
          email: user1.email,
          profile_picture: user1.updatedProfilePicture,
        });

        user.value = JWT;

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

        return (
          <BaseHtml>
            <ProfilePage
              isUserAccount={user?.username == username}
              searchUser={username}
              username={user?.username}
              image={user?.profile_picture}
            />
          </BaseHtml>
        );
      }
    )
    .get(
      "/:username/info",
      async ({ userAuthorized, set, params: { username } }) => {
        {
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
          let isFollowing;

          userInfoCached = await client.get(`${username}-info`);

          if (userInfoCached) {
            userInfoCached = JSON.parse(userInfoCached);

            if (user?.username && userInfoCached?.id != user?.id) {
              isFollowing = await client.get(
                `${user?.username}-following-${username}`
              );

              if (!isFollowing) {
                isFollowing = await db.execute(
                  sql`WITH userInfo AS (SELECT id FROM users WHERE username = ${username}) select exists(select 1 from followers where user_id = (SELECT id FROM userInfo) AND follower_id = ${
                    user?.id ? user?.id : 0
                  })`
                );
              }
            }

            userInfoCached.exists = isFollowing == "true" ? true : false;

            return (
              <>
                <ProfileInfo
                  user={userInfoCached}
                  isUserAccount={userInfoCached.id == user?.id}
                />
              </>
            );
          }

          const user1 = await db.execute(
            sql`WITH userInfo AS (SELECT * FROM users WHERE username = ${username}), followerInfo AS (SELECT sum((user_id = (SELECT id FROM userInfo))::int) as follower_count, sum((follower_id = (SELECT id FROM userInfo))::int) as following_count, sum((follower_id = (SELECT id FROM userInfo))::int) as following_count  FROM followers), isFollowing AS (select exists(select 1 from followers where user_id = (SELECT id FROM userInfo) AND follower_id = ${
              user?.id ? user?.id : 0
            })) SELECT * FROM userInfo, followerInfo, isFollowing`
          );

          if (user1) {
            let cache = user1[0];

            if (user?.username && user1[0] != user?.id) {
              await client.setEx(
                `${user?.username}-following-${username}`,
                86400,
                String(user1[0].exists)
              );
            }

            delete cache.exists;

            await client.setEx(
              `${username}-info`,
              86400,
              JSON.stringify(cache)
            );

            return (
              <>
                <ProfileInfo
                  user={user1[0]}
                  isUserAccount={user1[0].id == user?.id}
                />
              </>
            );
          }

          set.status = 404;
          return;
        }
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
            image={user?.profile_picture}
          />
        </BaseHtml>
      );
    });
