import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

import { db } from "../../db/client";
import { SelectProject, projects, stars } from "../../db/schema";
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
        sql`SELECT id, name, description, privacy, username, languages, image, collaborators, technologies, instagram_username, twitter_username,	youtube_username,	categories, count(project_id) as stars_count FROM projects FULL JOIN stars ON id = project_id WHERE privacy = 'public' GROUP BY id LIMIT 10`
      );

      if (Projects.length !== 0) {
        return <ProjectList projects={Projects} />;
      }
      return (
        <div class="text-[#444444] dark:text-[#B1B1B1] text-center">
          Sorry no projects {":("}
        </div>
      );
    })
    .get("/project-list/:username", async ({ params: { username } }) => {
      const Projects: SelectProject[] = await db.execute(
        sql`SELECT id, name, description, privacy, username, languages, image, collaborators, technologies, instagram_username, twitter_username,	youtube_username,	categories, count(project_id) as stars_count FROM projects FULL JOIN stars ON id = project_id WHERE privacy = 'public' AND username = ${username} GROUP BY id LIMIT 10`
      );

      if (Projects.length !== 0) {
        return <ProjectList projects={Projects} type="single" />;
      }

      return (
        <div class="text-[#444444] dark:text-[#B1B1B1] text-center">
          Sorry no projects {":("}
        </div>
      );
    })
    .get("/project/form", async ({ userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }

      return (
        <ProjectFormLayout>
          <ProjectForm username={user?.username} image={user?.image} />
        </ProjectFormLayout>
      );
    })
    .post(
      "/project",
      async ({
        userAuthorized,
        set,
        body: { name, description, privacy, language, image },
      }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }
        if (!name || !description || !privacy || !language || !image) {
          set.status = 401;

          return (
            <p class="w-full px-3 py-2 text-red-500 dark:text-white dark:bg-red-500/30 border rounded-md border-red-700 mb-6">
              Bro fill out the form :|
            </p>
          );
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
          image: t.File(),
        }),
      }
    )
    .post("/stars/:id", async ({ params: { id }, userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      await db
        .insert(stars)
        .values({ project_id: Number(id), user_id: user.id });
      const count = await db
        .select({ count: sql<number>`count(*)` })
        .from(stars)
        .where(eq(stars.project_id, Number(id)));
      return (
        <button class="self-end flex space-x-1 items-center font-medium text-lg">
          <StarIconFilled />
          <span>{count[0].count}</span>
        </button>
      );
    })
    .get("/project/:id", async ({ params: { id }, userAuthorized }) => {
      const [project] = await db
        .select()
        .from(projects)
        .where(
          and(eq(projects.id, Number(id)), eq(projects.privacy, "public"))
        );
      let username;

      if (userAuthorized) {
        username = userAuthorized.username;
      }

      return (
        <BaseHtml>
          <ProjectPage project={project} username={username} />
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
