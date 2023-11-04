import "./src";
import { expect, test, describe } from "bun:test";
import { db } from "./src/db/client";
import { users } from "./src/db/schema";
import { eq } from "drizzle-orm";

let cookie: string = "";
const url = "http://localhost:3000";

const email = "echo1@gmail.com";
const password = "StrongbartholomewJames1235!!$";
const username = "yuh12345";

describe("POST auth", () => {
  test("Sign In", async () => {
    const req = await fetch(`${url}/sign-in`, {
      body: JSON.stringify({
        email: "vincentgarciajr2712@gmail.com",
        password: "Faith1989$",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    expect(req.status).toBe(307);
    expect(req.url).toBe(`${url}/sign-in`);
    expect(req.headers.get("Set-Cookie")).toBeDefined();

    if (req.headers.get("Set-Cookie")) {
      for (let n of req?.headers?.get("Set-Cookie") as any) {
        if (n === ";") {
          break;
        }
        cookie += n;
      }
    }
  });
  test("Create User", async () => {
    const req = await fetch(`${url}/sign-up`, {
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    expect(req.status).toBe(404);
    expect(req.url).toBe(`${url}/home`);
    expect(req.headers.get("Set-Cookie")).toBeDefined();

    if (req.status === 404) {
      await db.delete(users).where(eq(users.email, email));
    }
  });
});

describe("GET all pages signed out", () => {
  test("Home Page", async () => {
    const req = await fetch(`${url}/home`);
    expect(req.status).toBe(200);
  });
  test("Landing Page", async () => {
    const req = await fetch(`${url}/`);
    expect(req.status).toBe(200);
  });
  test("Sign In Page", async () => {
    const req = await fetch(`${url}/sign-in`);
    expect(req.status).toBe(200);
  });
  test("Signup Page", async () => {
    const req = await fetch(`${url}/sign-up`);
    expect(req.status).toBe(200);
  });
  test("Profile Page", async () => {
    const req = await fetch(`${url}/echo`);
    expect(req.status).toBe(200);
  });
  test("Messages Page redirects to Sign In", async () => {
    const req = await fetch(`${url}/messages`);
    expect(req.url).toBe(`${url}/sign-in`);
  });
  test("Notifications Page redirects to Sign In", async () => {
    const req = await fetch(`${url}/notifications`);
    expect(req.url).toBe(`${url}/sign-in`);
  });
});

describe("GET all pages signed in", () => {
  test("Home Page", async () => {
    const req = await fetch(`${url}/home`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "same-origin",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/home`);
  });
  test("Landing Page redirects to home", async () => {
    const req = await fetch(`${url}/`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "include",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/home`);
  });
  test("Sign In redirects Home Page", async () => {
    const req = await fetch(`${url}/sign-in`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "same-origin",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/home`);
  });
  test("Signup redirects to Home Page", async () => {
    const req = await fetch(`${url}/sign-up`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "same-origin",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/home`);
  });
  test("Messages Page", async () => {
    const req = await fetch(`${url}/messages`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "same-origin",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/messages`);
  });
  test("Invite Page", async () => {
    const req = await fetch(`${url}/project/25/invite`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "same-origin",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/project/25/invite`);
  });
  test("Notifications Page", async () => {
    const req = await fetch(`${url}/notifications`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "same-origin",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/notifications`);
  });
  test("Project Page", async () => {
    const req = await fetch(`${url}/project/25`, {
      headers: {
        Cookie: cookie,
      },
      credentials: "same-origin",
    });
    expect(req.status).toBe(200);
    expect(req.url).toBe(`${url}/project/25`);
  });
});
