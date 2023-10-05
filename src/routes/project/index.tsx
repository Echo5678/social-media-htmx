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

const cloudinary = require("cloudinary").v2;
const fse = require("fs-extra");

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

const WEEK = 60 * 60 * 24 * 7;

// const cloudinaryConfig = cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.CLOUDAPIKEY,
//   api_secret: process.env.CLOUDINARYSECRET,
//   secure: true,
// });

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
          <ProjectForm />
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

        await db.insert(projects).values({
          name,
          description,
          privacy,
          languages: [language],
          username: user.username,
          image: "",
          technologies: [],
          slogan: "",
          application_type: "",
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
          image: t.File(),
          slogan: t.String(),
          application_type: t.String(),
          stars: t.String(),
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

// .get("/", (req, res) => {
//   res.send(`<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//   </head>
//   <body>
//     <h1>Welcome</h1>

//     <form id="upload-form">
//       <input id="file-field" type="file" />
//       <button>Upload</button>
//     </form>

//     <hr />

//     <a href="/view-photos">How would I use the public_id values that I store in my database?</a>

//     <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//     <script src="/client-side.js"></script>
//   </body>
// </html>`)
// })

// .get("/get-signature", (req, res) => {
//   const timestamp = Math.round(new Date().getTime() / 1000)
//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp: timestamp
//     },
//     cloudinaryConfig.api_secret
//   )
//   res.json({ timestamp, signature })
// })

// .post("/do-something-with-photo", async (req, res) => {
//   // based on the public_id and the version that the (potentially malicious) user is submitting...
//   // we can combine those values along with our SECRET key to see what we would expect the signature to be if it was innocent / valid / actually coming from Cloudinary
//   const expectedSignature = cloudinary.utils.api_sign_request({ public_id: req.body.public_id, version: req.body.version }, cloudinaryConfig.api_secret)

//   // We can trust the visitor's data if their signature is what we'd expect it to be...
//   // Because without the SECRET key there's no way for someone to know what the signature should be...
//   if (expectedSignature === req.body.signature) {
//     // Do whatever you need to do with the public_id for the photo
//     // Store it in a database or pass it to another service etc...
//     await fse.ensureFile("./data.txt")
//     const existingData = await fse.readFile("./data.txt", "utf8")
//     await fse.outputFile("./data.txt", existingData + req.body.public_id + "\n")
//   }
// })

// .get("/view-photos", async (req, res) => {
//   await fse.ensureFile("./data.txt")
//   const existingData = await fse.readFile("./data.txt", "utf8")
//   res.send(`<h1>Hello, here are a few photos...</h1>
//   <ul>
//   ${existingData
//     .split("\n")
//     .filter(item => item)
//     .map(id => {
//       return `<li><img src="https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/upload/w_200,h_100,c_fill,q_100/${id}.jpg">
//       <form action="delete-photo" method="POST">
//         <input type="hidden" name="id" value="${id}" />
//         <button>Delete</button>
//       </form>
//       </li>
//       `
//     })
//     .join("")}
//   </ul>
//   <p><a href="/">Back to homepage</a></p>
//   `)
// })

// .post("/delete-photo", async (req, res) => {
//   // do whatever you need to do in your database etc...
//   await fse.ensureFile("./data.txt")
//   const existingData = await fse.readFile("./data.txt", "utf8")
//   await fse.outputFile(
//     "./data.txt",
//     existingData
//       .split("\n")
//       .filter(id => id != req.body.id)
//       .join("\n")
//   )

//   // actually delete the photo from cloudinary
//   cloudinary.uploader.destroy(req.body.id)

//   res.redirect("/view-photos")
// })

// .get("/get-signature", (req, res) => {
//   const timestamp = Math.round(new Date().getTime() / 1000);
//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp: timestamp,
//     },
//     cloudinaryConfig.api_secret
//   );
//   res.json({ timestamp: signature });
// });
