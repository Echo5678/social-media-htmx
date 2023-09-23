import { Elysia, t } from "elysia";
import html from "@elysiajs/html";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import { users, projects } from "../../db/schema";
import { sql } from "drizzle-orm";

import { BaseHtml } from "../../pages/base/basehtml";
import LandingPage from "../../pages/landingpage";
import HomePage from "../../pages/homepage";
import ProfilePage from "../../pages/profilepage";
import BlogPost from "../../pages/blog/blogpost";
import BlogEditor from "../../pages/blog/blogeditor";

const WEEK = 60 * 60 * 24 * 7;

export const home = (app: Elysia) =>
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
    .get(
      "/",
      ({ userAuthorized, set }) => {
        if (userAuthorized) {
          set.status = 301;
          set.redirect = "/home";
          return;
        }

        return (
          <BaseHtml>
            <LandingPage />
          </BaseHtml>
        );
      },
      {
        detail: {
          summary: "Home Page",
          tags: ["Home", "Main"],
        },
      }
    )
    .get("/home", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const project = await db.select().from(projects);

      return (
        <BaseHtml>
          <HomePage project={project} />
        </BaseHtml>
      );
    })

    .get("/profile", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <BaseHtml>
          <ProfilePage />
        </BaseHtml>
      );
    });
