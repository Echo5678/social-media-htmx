import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

import { db } from "../../db/client";
import { projects, users } from "../../db/schema";
import { eq, sql } from "drizzle-orm";

import { BaseHtml } from "../../pages/basehtml";
import ProjectForm from "../../pages/projectform";
import html from "@elysiajs/html";
import ProjectPage from "../../pages/projectpage";
import UpVoteFilled from "../../components/assets/upvotefilled";
import DownVoteFilled from "../../components/assets/downvotefilled";

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
        <BaseHtml>
          <ProjectForm />
        </BaseHtml>
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

        const project = await db
          .insert(projects)
          .values({
            name,
            description,
            privacy,
            languages: [language],
            username: user.username,
            likes: [],
          })
          .returning();
        return <div></div>;
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
    .patch("/like/:id", async ({ params: { id }, userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const [project] = await db.execute(
        sql`update projects SET likes = array_append(likes, ${userAuthorized.username})  where ${projects.id} = ${id}`
      );
      return (
        <button>
          <UpVoteFilled />
        </button>
      );
    })
    .patch("/dislike/:id", async ({ params: { id }, userAuthorized, set }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      const [project] = await db.execute(
        sql`update projects SET dislikes = array_append(dislikes, ${userAuthorized.username})  where ${projects.id} = ${id}`
      );
      return (
        <button>
          <DownVoteFilled />
        </button>
      );
    })
    .get("/project/:id", async ({ params: { id } }) => {
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, Number(id)));

      return <ProjectPage project={project} />;
    });
