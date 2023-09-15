import Elysia from "elysia";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

import { db } from "../../db/client";
import { users } from "../../db/schema";
import { sql } from "drizzle-orm";

import { BaseHtml } from "../../pages/basehtml";
import ProjectForm from "../../pages/projectform";
import html from "@elysiajs/html";

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
    .get("/languages", () => {
      const languages = [
        "Rust",
        "Go",
        "C/C++",
        "Python",
        "JavaScript",
        "Java",
        "Zig",
        "Mojo",
        "Haskell",
        "Ruby",
      ];
      console.log(
        languages.map((language) => (
          <option value={language}>{language}</option>
        ))
      );
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
    .post("/project", async ({ userAuthorized, set, body }) => {
      const user = userAuthorized;
      if (!user) {
        set.status = 307;
        set.redirect = "/sign-in";
      }
      console.log(body);
      return <div></div>;
    });
