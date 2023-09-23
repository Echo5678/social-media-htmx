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
import SearchPage from "../../pages/searchpage";
import ProjectList from "../../components/projectlist";

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
          id: users.id,
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
      const project = await db
        .select()
        .from(projects)
        .where(eq(projects.privacy, "public"));

      return (
        <BaseHtml>
          <HomePage project={project} />
        </BaseHtml>
      );
    })
    .get("/search", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const Projects = await db
        .select()
        .from(projects)
        .where(eq(projects.privacy, "public"))
        .limit(10);

      return (
        <BaseHtml>
          <SearchPage projects={Projects} />
        </BaseHtml>
      );
    })
    .get(
      "/search-for",
      async ({ userAuthorized, set, query: { search } }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }
        let Projects: SelectProject[];

        if (validator.isAscii(search)) {
          Projects = await db
            .select()
            .from(projects)
            .where(
              and(
                or(
                  ilike(projects.name, search),
                  ilike(projects.description, search)
                ),
                eq(projects.privacy, "public")
              )
            );
        } else {
          Projects = await db.select().from(projects).limit(10);
        }

        return <ProjectList project={Projects} />;
      },
      {
        query: t.Object({
          search: t.String(),
        }),
      }
    );
