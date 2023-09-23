import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

import { db } from "../../db/client";
import { projects, users } from "../../db/schema";
import { eq, sql } from "drizzle-orm";

import { BaseHtml } from "../../pages/base/basehtml";
import ProjectForm from "../../pages/project/projectform";
import html from "@elysiajs/html";
import ProjectPage from "../../pages/project/projectpage";
import StarIconFilled from "../../components/assets/stariconfilled";
import HomePage from "../../pages/homepage";
import { ProjectFormLayout } from "../../pages/base/project-form-layout";

const WEEK = 60 * 60 * 24 * 7;

export const project = (app: Elysia) =>
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
    .get("/project/form", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <ProjectFormLayout>
          <ProjectForm />
        </ProjectFormLayout>
      );
    })
    .post(
      "/project",
      async ({
        userAuthorized,
        set,
        body: { name, description, privacy, language },
      }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }

        await db.insert(projects).values({
          name,
          description,
          privacy,
          languages: [language],
          username: user.username,
          image: "",
          collaborators: [],
          stars: [],
        });

        const project = await db.select().from(projects);

        return (
          <BaseHtml>
            <HomePage project={project} />
          </BaseHtml>
        );
      },
      {
        body: t.Object({
          name: t.String(),
          description: t.String(),
          privacy: t.String(),
          language: t.String(),
        }),
      }
    )
    .patch("/stars/:id", async ({ params: { id }, userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const [star] = await db.execute(
        sql`update projects SET stars = array_append(stars, ${userAuthorized.username})  where ${projects.id} = ${id}`
      );
      return (
        <button>
          <StarIconFilled />
        </button>
      );
    })
    .get("/project/:id", async ({ params: { id } }) => {
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, Number(id)));

      return (
        <BaseHtml>
          <ProjectPage project={project} />
        </BaseHtml>
      );
    });
