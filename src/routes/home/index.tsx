import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import { projects, SelectProject } from "../../db/schema";
import { sql } from "drizzle-orm";

import validator from "validator";

import { BaseHtml } from "../../pages/base/basehtml";
import { BaseHtml as ProfileLayout } from "../../pages/base/basehtml";

import LandingPage from "../../pages/landingpage";
import HomePage from "../../pages/homepage";

import ProjectList from "../../components/projectlist";

export const home = (app: Elysia) =>
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
    .get("/", ({ userAuthorized, set }) => {
      if (userAuthorized) {
        set.status = 307;
        set.redirect = "/home";
        return;
      }

      return (
        <BaseHtml>
          <LandingPage />
        </BaseHtml>
      );
    })
    .get("/home", async ({ userAuthorized }) => {
      let username;

      if (userAuthorized) {
        username = userAuthorized.username;
      }

      return (
        <ProfileLayout>
          <HomePage
            username={username}
            image={userAuthorized?.profile_picture}
          />
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
