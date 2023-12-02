import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";

import { SelectBleep, bleeps, followers, likes } from "../../db/schema";
import { sql, eq } from "drizzle-orm";

import { BaseHtml } from "../../pages/base/basehtml";

import BleepList from "../../components/bleeplist";
import BleepItem from "../../components/bleepitem";
import BleepPage from "../../pages/bleeppage";
import Like from "../../components/assets/like";

export const bleep = (app: Elysia) =>
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
    .get(
      "/bleeps-list",
      async ({ userAuthorized, query: { skip } }) => {
        const bleep: SelectBleep[] = await db.execute(
          sql`SELECT bleeps.id, text, image, posted, username, verified, profile_picture, name, count(post) as likes_count FROM bleeps FULL JOIN likes ON  id = post INNER JOIN users ON author = users.id GROUP BY users.id, bleeps.id, user_id, post LIMIT 10 OFFSET ${
            skip ? skip : 0
          }`
        );

        if (bleep.length !== 0 && !skip) {
          return (
            <BleepList
              bleeps={bleep}
              user={userAuthorized}
              input={!skip}
              skipAmount={10}
            />
          );
        } else if (bleep.length !== 0) {
          return (
            <>
              {bleep.map((item, index) => (
                <BleepItem
                  item={item}
                  skip={index === bleep.length - 1}
                  skipAmount={Number(skip) + 10}
                />
              ))}
            </>
          );
        }
        return (
          <div class="text-[#444444] dark:text-[#B1B1B1] text-center">
            Sorry no bleep {":("}
          </div>
        );
      },
      {
        query: t.Object({
          skip: t.Optional(t.String()),
        }),
      }
    )
    .get(
      "/bleep/:id",
      async ({ userAuthorized, params: { id } }) => {
        const bleep: SelectBleep[] = await db.execute(
          sql`SELECT bleeps.id, text, image, posted, username, verified, profile_picture, name, count(post) as likes_count FROM bleeps FULL JOIN likes ON  id = post INNER JOIN users ON author = users.id WHERE bleeps.id = ${id} GROUP BY users.id, bleeps.id, user_id, post`
        );

        return (
          <BaseHtml>
            <BleepPage
              bleep={bleep[0]}
              username={userAuthorized?.username}
              image={userAuthorized?.profile_picture}
            />
          </BaseHtml>
        );
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    )
    .get(
      "/:username/bleeps",
      async ({ userAuthorized, params: { username }, query: { skip } }) => {
        const bleep: SelectBleep[] = await db.execute(
          sql`WITH user_info AS (SELECT id, username, name, verified, profile_picture FROM users WHERE username = ${username} LIMIT 1),  bleeps_list AS (SELECT * FROM bleeps WHERE author = (SELECT id FROM user_info) LIMIT 10 OFFSET ${
            skip ? skip : 0
          }), count AS (SELECT sum((post = (SELECT id FROM bleeps_list))::int) AS likes_count FROM likes) SELECT * FROM count, user_info, bleeps_list`
        );

        if (bleep.length !== 0 && !skip) {
          return (
            <BleepList
              bleeps={bleep}
              user={userAuthorized}
              username={username}
            />
          );
        } else if (bleep.length !== 0) {
          return (
            <>
              {bleep.map((item, index) => (
                <BleepItem
                  item={item}
                  skip={index === bleep.length - 1}
                  skipAmount={Number(skip) + 10}
                  username={username}
                />
              ))}
            </>
          );
        }
        return (
          <div class="text-[#444444] dark:text-[#B1B1B1] text-center">
            Sorry no bleeps {":("}
          </div>
        );
      },
      {
        params: t.Object({
          username: t.String(),
        }),
        query: t.Object({
          skip: t.Optional(t.String()),
        }),
      }
    )
    .post(
      "/bleep",
      async ({ userAuthorized, body: { text, image }, set }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
          return;
        }

        const bleep = await db
          .insert(bleeps)
          .values({ text, author: userAuthorized.id })
          .returning();

        bleep[0].name = userAuthorized?.name;
        bleep[0].profile_picture = userAuthorized?.profile_picture;
        bleep[0].username = userAuthorized?.username;
        bleep[0].likes_count = "0";

        return <BleepItem item={bleep[0]} />;
      },
      {
        body: t.Object({
          text: t.String(),
          image: t.Optional(t.File()),
        }),
      }
    )
    .post("/like/:id", async ({ userAuthorized, params: { id }, set }) => {
      if (!userAuthorized) {
        set.status = 307;
        set.redirect = "/sign-in";
        return;
      }

      const like = await db.execute(
        sql`WITH post_like AS (INSERT INTO likes(user_id, post) VALUES(${userAuthorized?.id}, ${id}) RETURNING post) SELECT count(*) FROM likes WHERE post = (SELECT post FROM post_like)`
      );

      if (like) {
        return (
          <button
            id="like_button"
            onclick="this.stopPropagation()"
            hx-delete={`/like/${id}`}
            class="flex space-x-1 items-center font-medium text-lg"
          >
            <div class="text-red-500">
              <Like />
            </div>
            <span id="like_count">{Number(like[0]?.count) + 1}</span>
          </button>
        );
      }
    });
