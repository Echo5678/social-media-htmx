import jwt from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

import validator from "validator";

import { db } from "../../db/client";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

import { BaseHtml } from "../../pages/base/basehtml";
import SignUpPage from "../../pages/signuppage";
import Signinpage from "../../pages/signinpage";

export const auth = (app: Elysia) =>
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
      async ({
        body: { username, email, password },
        cookie: { user },
        set,
        jwt,
      }) => {
        if (!validator.isEmail(email)) {
          set.status = 400;
          return (
            <div
              id="error-message"
              hx-swap-oob="true"
              class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600"
            >
              Please provide valid email.
            </div>
          );
        }
        if (!validator.isAlphanumeric(username)) {
          set.status = 400;
          return (
            <div
              id="error-message"
              hx-swap-oob="true"
              class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600"
            >
              Username can only contain letters and numbers.
            </div>
          );
        }
        if (!validator.isStrongPassword(password)) {
          set.status = 400;
          return (
            <div
              id="error-message"
              hx-swap-oob="true"
              class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600"
            >
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

        const user1 = await db
          .insert(users)
          .values({
            username,
            email,
            password: hashedPassword,
            profile_picture: "",
            roles: [""],
            languages: [""],
          })
          .returning();

        if (user1) {
          const userId = String(user1[0].id);
          const JWT = await jwt.sign({
            id: userId,
            username: user1[0].username,
            name: user1[0].name,
            email,
            profile_picture: "",
          });

          set.headers['HX-Redirect'] = '/home';
          user.value = JWT;
          set.status = 307;

          return;
        }

        set.status = 500;
        return (
          <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
            Error creating account.
          </p>
        );
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
      async ({ body: { email, password }, cookie: { user }, set, jwt }) => {
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
        const userDB = await db
          .select({
            id: users.id,
            username: users.username,
            password: users.password,
            email: users.email,
            profile_picture: users.profile_picture,
            name: users.name,
          })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!userDB) {
          set.status = 400;
          return (
            <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Error Authenticating
            </p>
          );
        }

        const isMatch = await Bun.password.verify(password, userDB[0].password);

        if (!isMatch) {
          set.status = 400;
          return (
            <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
              Error Authenticating
            </p>
          );
        }

        const userId = String(userDB[0].id);
        const userUsername = String(userDB[0].username);

        const JWT = await jwt.sign({
          id: userId,
          username: userUsername,
          name: userDB[0].name,
          email,
          profile_picture: userDB[0].profile_picture,
        });

        if (JWT) {
          user.value = JWT;
          set.status = 307;
	  set.headers['HX-Redirect'] = "/home";

          return;
        }

        set.status = 500;
        return (
          <p class="border border-red-500 dark:border-red-600 px-3 py-3.5 rounded-md text-red-500 dark:text-red-600">
            Error Authenticating
          </p>
        );
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
        error({ code, error }) {
          if (code === "VALIDATION") {
            console.log(error.all);
            const name = error.all.find((x) => x.path === "/name");
            if (name) console.log(name);
          }
        },
      }
    );
