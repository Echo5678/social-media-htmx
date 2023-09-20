import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";
import html from "@elysiajs/html";

import { db } from "../../db/client";
import { blogs, users } from "../../db/schema";
import { eq, sql } from "drizzle-orm";

import { BlogLayout } from "../../pages/base/bloglayout";
import { BlogEditorLayout } from "../../pages/base/blog-editor-layout";
import BlogEditor from "../../pages/blog/blogeditor";
import BlogPost from "../../pages/blog/blogpost";

const WEEK = 60 * 60 * 24 * 7;

export const blog = (app: Elysia) =>
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
    .get("/blog/editor", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <BlogEditorLayout>
          <BlogEditor />
        </BlogEditorLayout>
      );
    })
    .post(
      "/blog",
      async ({ userAuthorized, set, body: { title, blog } }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }

        const Blog = await db
          .insert(blogs)
          .values({
            owner: userAuthorized.username,
            title,
            blog: JSON.parse(blog),
          })
          .returning();
        return <div>{...Blog}</div>;
      },
      {
        body: t.Object({
          title: t.String(),
          blog: t.String(),
        }),
      }
    )
    .get("/blog/:id", async ({ userAuthorized, set, params: { id } }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const [Blog] = await db
        .select()
        .from(blogs)
        .where(eq(blogs.id, Number(id)))
        .limit(1);

      return (
        <BlogLayout>
          <BlogPost blog={Blog} />
        </BlogLayout>
      );
    })
    .get("/blog/editor", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <BlogEditorLayout>
          <BlogEditor />
        </BlogEditorLayout>
      );
    });
