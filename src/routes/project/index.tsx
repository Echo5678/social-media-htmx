import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

import { db } from "../../db/client";
import {
  SelectProject,
  invites,
  notifications,
  projects,
  stars,
  users,
} from "../../db/schema";
import { and, eq, ne, sql } from "drizzle-orm";

import { BaseHtml } from "../../pages/base/basehtml";
import ProjectForm from "../../pages/project/projectform";
import ProjectPage from "../../pages/project/projectpage";
import StarIconFilled from "../../components/assets/stariconfilled";
import HomePage from "../../pages/homepage";
import { ProjectFormLayout } from "../../pages/base/project-form-layout";
import ProjectList from "../../components/projectlist";
import InvitePage from "../../pages/invitepage";
import { BunFile } from "bun";

export const project = (app: Elysia) =>
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
    .get("/project-list", async () => {
      const Projects: SelectProject[] = await db.execute(
        sql`SELECT id, name, description, username, languages, image, technologies, instagram_username, twitter_username,	youtube_username,	categories, count(project_id) as stars_count FROM projects FULL JOIN stars ON id = project_id GROUP BY id LIMIT 10`
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
        sql`SELECT id, name, description, username, languages, image, technologies, instagram_username, twitter_username,	youtube_username,	categories, count(project_id) as stars_count FROM projects FULL JOIN stars ON id = project_id WHERE username = ${username} GROUP BY id LIMIT 10`
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
        body: {
          name,
          description,
          languages,
          image,
          brief_description,
          technologies,
          categories,
        },
      }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 307;
          set.redirect = "/sign-in";
        }
        if (
          !name ||
          !description ||
          !languages ||
          !brief_description ||
          !technologies ||
          !categories
        ) {
          set.status = 400;
          return (
            <p
              id="#error-message"
              class="w-full px-3 py-2 text-red-500 dark:text-white dark:bg-red-500/30 border rounded-md border-red-700 mb-6"
            >
              Bro fill out the form :|
            </p>
          );
        }
        console.log(image);

        await Bun.write("/capture.png", image as File);

        set.status = 301;
        set.redirect = "/home";

        await db.insert(projects).values({
          name,
          description,
          languages: [...languages],
          username: user.username,
          image: "",
          technologies: [...technologies],
          categories: [...categories],
          brief_description,
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
          technologies: t.String(),
          categories: t.Array(t.String()),
          brief_description: t.String(),
          image: t.Optional(t.File()),
          collaborators: t.Optional(t.Any()),
          languages: t.Array(t.String()),
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
    .get(
      "/project/:id",
      async ({ params: { id }, userAuthorized }) => {
        const [project] = await db
          .select()
          .from(projects)
          .where(eq(projects.id, Number(id)))
          .limit(1);
        let username;

        if (userAuthorized) {
          username = userAuthorized.username;
        }

        return (
          <BaseHtml>
            <ProjectPage project={project} username={username} />
          </BaseHtml>
        );
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    )
    .get(
      "/project/:id/invite",
      async ({ params: { id }, userAuthorized, set }) => {
        let username;

        if (userAuthorized) {
          username = userAuthorized.username;
        }
        const [project] = await db
          .select()
          .from(projects)
          .where(
            and(
              eq(projects.id, Number(id)),
              eq(projects.username, userAuthorized.username)
            )
          )
          .limit(1);

        const Users = await db
          .select()
          .from(users)
          .where(ne(users.id, Number(userAuthorized.id)))
          .limit(10);

        if (!project) {
          set.status = 404;

          return (
            <BaseHtml>
              <div class="flex flex-col space-y-12 justify-center items-center text-center min-h-screen">
                <h1 class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
                  Error: Project not found
                </h1>
                <span>
                  Return
                  <a
                    href="/home"
                    aria-label="Home Page"
                    class="text-blue-700 dark:text-blue-500 underline ml-1"
                  >
                    Home
                  </a>
                </span>
              </div>
            </BaseHtml>
          );
        }
        return (
          <BaseHtml>
            <InvitePage
              users={Users}
              username={username}
              image={userAuthorized?.image}
              project_id={id}
            />
          </BaseHtml>
        );
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    )
    .post(
      "/invite/:id/:userId",
      async ({ params: { id, userId }, userAuthorized, set }) => {
        const user = userAuthorized;
        if (!user) {
          set.status = 401;
          set.redirect = "/sign-in";
        }
        const [project] = await db
          .select()
          .from(projects)
          .where(
            and(
              eq(projects.id, Number(id)),
              eq(projects.username, userAuthorized.username)
            )
          )
          .limit(1);

        if (!project) {
          set.status = 404;

          return (
            <BaseHtml>
              <div class="flex flex-col space-y-12 justify-center items-center text-center min-h-screen">
                <h1 class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
                  Error: Project not found
                </h1>
                <span>
                  Return
                  <a
                    href="/home"
                    aria-label="Home Page"
                    class="text-blue-700 dark:text-blue-500 underline ml-1"
                  >
                    Home
                  </a>
                </span>
              </div>
            </BaseHtml>
          );
        }

        const invite = await db
          .insert(invites)
          .values({ project_id: Number(id), user_id: Number(userId) })
          .returning();

        const user_id = Number(userId);

        if (invite) {
          const noti = await db.insert(notifications).values({
            user_id,
            content: `${userAuthorized.username} has invited you`,
            reference: `/invite/${id}/${userId}`,
            sent_by: userAuthorized.username,
            type: "invite",
            read: false,
          });

          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.3 4.7 8.5 16.5 3.7 11.7 2.3 13.15 8.5 19.3 21.7 6.1z"></path>
            </svg>
          );
        }
      },
      {
        params: t.Object({
          id: t.String(),
          userId: t.String(),
        }),
      }
    )
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
