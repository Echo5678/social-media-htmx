import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

import { db } from "./db/client";
import { users, SelectUser, InsertUser } from "./db/schema";
import validator from "validator";

import * as elements from "typed-html";

import { BaseHtml } from "./pages/basehtml";
import HomePage from "./pages/homepage";
import SignUpPage from "./pages/signinpage";
import SocialPage from "./pages/socialpage";

const WEEK = 60 * 60 * 24 * 7;

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Co-Dev Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET as string,
    })
  )
  .use(cookie())
  .use(html())
  .get(
    "/",
    ({ html }) =>
      html(
        <BaseHtml>
          <HomePage />
        </BaseHtml>
      ),
    {
      detail: {
        summary: "Home Page",
        tags: ["Home", "Main"],
      },
    }
  )
  .get(
    "/sign-up",
    ({ html }) => (
      <BaseHtml>
        <SignUpPage />
      </BaseHtml>
    ),
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
      const user: SelectUser[] = await db
        .insert(users)
        .values({ username, email, password: hashedPassword })
        .returning();

      if (user) {
        set.status = 201;
        setCookie("user", await jwt.sign({}), {
          httpOnly: true,
          maxAge: WEEK,
          sameSite: "strict",
        });
      }

      return (
        <BaseHtml>
          <SocialPage />
        </BaseHtml>
      );
    },
    {
      body: t.Object({
        username: t.String(),
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
  )
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return (
        <BaseHtml>
          <p class="text-4xl md:text-5xl font-bold text-center my-auto">
            Error 404: Page not found
          </p>
        </BaseHtml>
      );
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
