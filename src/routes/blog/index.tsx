import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import { SelectBlog, blogs, users } from "../../db/schema";
import { eq } from "drizzle-orm";

import { BlogLayout } from "../../pages/base/basehtml";

import { BlogEditorLayout } from "../../pages/base/basehtml";
import BlogEditor from "../../pages/blog/blogeditor";

import BlogPost from "../../pages/blog/blogpost";
import BlogList from "../../components/bloglist";
import BlogItem from "../../components/blogitem";

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
          <BlogEditor username={user.username} image={user?.profile_picture} />
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
        .select({
          blog: blogs.blog,
          posted: blogs.posted,
          title: blogs.title,
          profile_picture: users.profile_picture,
          username: users.username,
        })
        .from(blogs)
        .innerJoin(users, eq(blogs.owner, users.username))
        .where(eq(blogs.id, Number(id)))
        .limit(1);

      console.log(Blog);

      return (
        <BlogLayout>
          <BlogPost
            blog={Blog}
            username={userAuthorized?.username}
            image={userAuthorized?.profile_picture}
          />
        </BlogLayout>
      );
    })
    .get(
      "/blog-list",
      async ({ query: { skip } }) => {
        const Blogs: SelectBlog[] = await db
          .select()
          .from(blogs)
          .limit(10)
          .offset(skip ? Number(skip) : 0);

        if (Blogs.length !== 0 && !skip) {
          return <BlogList blogs={Blogs} skipAmount={10} />;
        } else if (Blogs.length !== 0) {
          return (
            <>
              {Blogs.map((blog, index) => (
                <BlogItem
                  skip={index === Blogs.length - 1}
                  skipAmount={Number(skip) + 10}
                  blog={blog}
                />
              ))}
            </>
          );
        }

        return (
          <div class="text-[#444444] dark:text-[#B1B1B1] text-center">
            No more blogs {":("}
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
      "/blog-list/:username",
      async ({ params: { username }, query: { skip } }) => {
        const Blogs = await db
          .select()
          .from(blogs)
          .where(eq(blogs.owner, String(username)))
          .limit(10)
          .offset(skip ? Number(skip) : 0);

        if (Blogs.length !== 0 && !skip) {
          return (
            <BlogList
              blogs={Blogs}
              skipAmount={10}
              username={username}
              type={"single"}
            />
          );
        } else if (Blogs.length !== 0) {
          return (
            <>
              {Blogs.map((blog, index) => (
                <BlogItem
                  skip={index === Blogs.length - 1}
                  skipAmount={Number(skip) + 10}
                  username={username}
                  blog={blog}
                />
              ))}
            </>
          );
        }

        return (
          <div class="text-[#444444] dark:text-[#B1B1B1] text-center">
            No more blogs {":("}
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
    .get("/blog/editor", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <BlogEditorLayout>
          <BlogEditor username={user?.username} image={user?.profile_picture} />
        </BlogEditorLayout>
      );
    });
