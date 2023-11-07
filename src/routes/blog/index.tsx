import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import { SelectBlog, blogs } from "../../db/schema";
import { eq } from "drizzle-orm";

import { BlogLayout } from "../../pages/base/basehtml";

import { BlogEditorLayout } from "../../pages/base/basehtml";
import BlogEditor from "../../pages/blog/blogeditor";

import BlogPost from "../../pages/blog/blogpost";
import BlogList from "../../components/bloglist";

export const blog = (app: Elysia) =>
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
    .get("/blog/:id", async ({ params: { id }, userAuthorized }) => {
      const [Blog] = await db
        .select()
        .from(blogs)
        .where(eq(blogs.id, Number(id)))
        .limit(1);

      return (
        <BlogLayout>
          <BlogPost
            blog={Blog}
            username={userAuthorized?.username}
            image={userAuthorized?.image}
          />
        </BlogLayout>
      );
    })
    .get("/blog-list", async () => {
      const Blogs: SelectBlog[] = await db.select().from(blogs).limit(10);

      return <BlogList blogs={Blogs} />;
    })
    .get("/blog-list/:username", async ({ params: { username } }) => {
      const Blogs = await db
        .select()
        .from(blogs)
        .where(eq(blogs.owner, String(username)));

      return <BlogList blogs={Blogs} type="single" />;
    })
    .get("/blog/editor", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <BlogEditorLayout>
          <BlogEditor username={user?.username} image={user?.image} />
        </BlogEditorLayout>
      );
    });
