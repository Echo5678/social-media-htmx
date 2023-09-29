import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

import { db } from "../../db/client";
import { SelectProject, projects } from "../../db/schema";
import { and, eq, sql } from "drizzle-orm";

import { BaseHtml } from "../../pages/base/basehtml";
import ProjectForm from "../../pages/project/projectform";
import html from "@elysiajs/html";
import ProjectPage from "../../pages/project/projectpage";
import StarIconFilled from "../../components/assets/stariconfilled";
import HomePage from "../../pages/homepage";
import { ProjectFormLayout } from "../../pages/base/project-form-layout";
import ProjectList from "../../components/projectlist";

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

      if (userJWT) {
        userAuthorized = userJWT;
      }

      return {
        userAuthorized,
      };
    })
    .get("/project-list", async () => {
      const Projects: SelectProject[] = await db.execute(
        sql`SELECT *, (ARRAY_LENGTH(stars, 1)) as stars_count FROM projects WHERE privacy = 'public' LIMIT 10`
      );

      return <ProjectList projects={Projects} />;
    })
    .get("/project-list/:username", async ({ params: { username } }) => {
      const Projects: SelectProject[] = await db.execute(
        sql`SELECT *, (ARRAY_LENGTH(stars, 1)) as stars_count FROM projects WHERE privacy = 'public' AND username = ${username} LIMIT 10`
      );

      return <ProjectList projects={Projects} />;
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
          technologies: [],
          collaborators: [],
          stars: [],
        });

        return (
          <BaseHtml>
            <HomePage />
          </BaseHtml>
        );
      },
      {
        body: t.Object({
          name: t.String(),
          description: t.String(),
          privacy: t.String(),
          language: t.String(),
          collaborators: t.String(),
          technologies: t.String(),
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
        .where(
          and(eq(projects.id, Number(id)), eq(projects.privacy, "public"))
        );

      return (
        <BaseHtml>
          <ProjectPage project={project} />
        </BaseHtml>
      );
    })
    .delete(
      "/remove/project/:id",
      async ({ params: { id }, userAuthorized, set }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }
        const [remove] = await db
          .delete(projects)
          .where(eq(projects.id, Number(id)));

        return (
          <BaseHtml>
            <HomePage />
          </BaseHtml>
        );
      }
    );
