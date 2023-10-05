import { Elysia, t } from "elysia";
import html from "@elysiajs/html";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import { users, projects, SelectProject } from "../../db/schema";
import { and, eq, ilike, or, sql } from "drizzle-orm";

import validator from "validator";

import { BaseHtml } from "../../pages/base/basehtml";
import LandingPage from "../../pages/landingpage";
import HomePage from "../../pages/homepage";
import ProjectList from "../../components/projectlist";
import { ProfileLayout } from "../../pages/base/profile-layout";

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

      if (userJWT) {
        userAuthorized = userJWT;
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
    .get("/home", async ({ userAuthorized }) => {
      let username;

      if (userAuthorized) {
        username = userAuthorized.username;
      }

      return (
        <ProfileLayout>
          <HomePage username={username} />
        </ProfileLayout>
      );
    })
    .get(
      "/search-for",
      async ({ query: { search } }) => {
        let Projects: SelectProject[];

        if (validator.isAscii(search)) {
          Projects = await db.execute(
            sql`SELECT * FROM projects WHERE LOWER(name) LIKE '%' || LOWER(${search}) || '%'`
          );
        } else {
          Projects = await db.select().from(projects).limit(10);
        }

        return <ProjectList projects={Projects} />;
      },
      {
        query: t.Object({
          search: t.String(),
        }),
      }
    );
