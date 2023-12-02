import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";

import { followers, messages, users } from "../../db/schema";
import { eq, and, asc, or } from "drizzle-orm";

import { MessageLayout } from "../../pages/base/basehtml";

import MessagePage from "../../pages/message";
import MessageUserList from "../../components/message-user-list";

import ProfileIcon from "../../components/assets/profileicon";

export const message = (app: Elysia) =>
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
    .ws("/messages-ws", {
      open(ws) {
        console.log("Connected to Websocket");
        ws.subscribe("meow");
      },
      message(ws, message: any) {
        ws.publish(
          "meow",
          <>
            <div id="chat" hx-swap-oob="beforeend">
              <p class="py-2 px-3.5 rounded-3xl bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white self-start max-w-[85%]">
                {`${message.message}${" "}`}
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
    .get("/messages", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 302;
        set.redirect = "/sign-in";
        return;
      }

      return (
        <MessageLayout>
          <MessagePage username={user.username} image={user?.profile_picture} />
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
