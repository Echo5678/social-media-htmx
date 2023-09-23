import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import html from "@elysiajs/html";
import { Elysia, t } from "elysia";

import validator from "validator";

import { db } from "../../db/client";
import { users, SelectUser, InsertUser } from "../../db/schema";
import { eq, sql } from "drizzle-orm";

import { BaseHtml } from "../../pages/base/basehtml";
import SignUpPage from "../../pages/signuppage";
import Signinpage from "../../pages/signinpage";

const WEEK = 60 * 60 * 24 * 7;

export const auth = (app: Elysia) =>
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
          sql`${users.email} = ${userJWT.email} and ${users.jwt} = ${user}`
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
      "/sign-up",
      ({ userAuthorized, set }) => {
        const User = userAuthorized;
        if (User) {
          set.status = 301;
          set.redirect = "/home";
          return;
        }

        return (
          <BaseHtml>
            <SignUpPage />
          </BaseHtml>
        );
      },
      {
        detail: {
          summary: "Sign Up Page",
          tags: ["Auth, Sign Up"],
        },
      }
    )
    .post(
      "/sign-up",
      async ({ body: { username, email, password }, setCookie, set, jwt }) => {
        if (!validator.isEmail(email)) {
          set.status = 400;
          return (
            <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Please provide valid email.
            </p>
          );
        }
        if (!validator.isAlphanumeric(username)) {
          set.status = 400;
          return (
            <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Username can only contain letters and numbers.
            </p>
          );
        }
        if (!validator.isStrongPassword(password)) {
          set.status = 400;
          return (
            <div class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Password must be:
              <ul>
                <li>Minimum 8 characters</li>
                <li>Minimum 1 uppercase and lowercase letter</li>
                <li>Minimum 1 number and symbol.</li>
              </ul>
            </div>
          );
        }
        const hashedPassword = await Bun.password.hash(password);
        const JWT = await jwt.sign({ username, email });

        const user: InsertUser = await db
          .insert(users)
          .values({
            username,
            email,
            password: hashedPassword,
            jwt: JWT,
          })
          .returning();

        if (user) {
          setCookie("user", JWT);
          set.status = 307;
          set.redirect = "/home";
        }
      },
      {
        body: t.Object({
          username: t.String(),
          email: t.String(),
          password: t.String(),
        }),
        detail: {
          summary: "Sign Up Route",
          tags: ["Auth, Sign Up"],
        },
        error({ code, error }) {
          if (code === "VALIDATION") {
            console.log(error.all);
            const name = error.all.find((x) => x.path === "/name");
            if (name) console.log(name);
          }
        },
      }
    )
    .get(
      "/sign-in",
      ({ userAuthorized, set }) => {
        const User = userAuthorized;
        if (User) {
          set.status = 301;
          set.redirect = "/home";
          return;
        }

        return (
          <BaseHtml>
            <Signinpage />
          </BaseHtml>
        );
      },
      {
        detail: {
          summary: "Sign Up Page",
          tags: ["Auth, Sign Up"],
        },
      }
    )
    .post(
      "/sign-in",
      async ({ body: { email, password }, setCookie, set, jwt }) => {
        if (!validator.isEmail(email)) {
          set.status = 400;
          return (
            <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Please provide valid email.
            </p>
          );
        }
        if (!validator.isStrongPassword(password)) {
          set.status = 400;
          return (
            <div class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Password must be:
              <ul>
                <li>Minimum 8 characters</li>
                <li>Minimum 1 uppercase and lowercase letter</li>
                <li>Minimum 1 number and symbol.</li>
              </ul>
            </div>
          );
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) {
          set.status = 400;
          return (
            <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Error Authenticating
            </p>
          );
        }

        const isMatch = await Bun.password.verify(password, user[0].password);

        if (!isMatch) {
          set.status = 400;
          return (
            <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Error Authenticating
            </p>
          );
        }

        const JWT = await jwt.sign({
          username: user[0].username as string,
          email,
        });

        if (user) {
          setCookie("user", JWT);
          set.status = 307;
          set.redirect = "/home";
        }
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
        detail: {
          summary: "Sign In Route",
          tags: ["Auth, Sign Up"],
        },
        error({ code, error }) {
          if (code === "VALIDATION") {
            console.log(error.all);
            const name = error.all.find((x) => x.path === "/name");
            if (name) console.log(name);
          }
        },
      }
    );
