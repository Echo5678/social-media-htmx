import { InferSelectModel } from "drizzle-orm";
import {
  serial,
  pgTable,
  varchar,
  boolean,
  text,
  json,
  integer,
  primaryKey,
  unique,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  username: varchar("username", { length: 20 }).unique(),
  email: varchar("email", { length: 320 }).unique(),
  emailverified: boolean("emailverified").default(false),
  password: varchar("password", { length: 60 }).notNull(),
  bio: varchar("bio", { length: 250 }).default(""),
  verified: boolean("verified").default(false),
  joined: date("joined"),
  badges: text("badges").array().default([]),
  profile_picture: varchar("profile_picture").notNull(),
  roles: varchar("roles", { length: 30 }).array().notNull(),
  languages: varchar("languages", { length: 30 }).array().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 2000 }),
  languages: text("languages").array(),
  username: text("username")
    .notNull()
    .references(() => users.username),
  technologies: text("technologies").array().default([]),
  image: varchar("image").notNull(),
  categories: text("categories").array(),
  instagram_username: text("instagram_username"),
  twitter_username: text("twitter_username"),
  youtube_username: text("youtube_username"),
  brief_description: text("brief_description").notNull(),
  website_url: varchar("website_url", { length: 300 }),
  github_repo: text("github_repo"),
});

export const stars = pgTable(
  "stars",
  {
    project_id: integer("project_id")
      .primaryKey()
      .notNull()
      .references(() => projects.id),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    unq: unique().on(t.project_id, t.user_id),
  })
);

export const followers = pgTable(
  "followers",
  {
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id),
    follower_id: integer("follower_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      pk: primaryKey(table.user_id, table.follower_id),
      unq: unique().on(table.follower_id, table.user_id),
    };
  }
);

export const invites = pgTable(
  "invites",
  {
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id),
    project_id: integer("project_id")
      .notNull()
      .references(() => projects.id),
  },
  (table) => {
    return {
      pk: primaryKey(table.user_id, table.project_id),
      unq: unique().on(table.project_id, table.user_id),
    };
  }
);

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  owner: text("owner")
    .notNull()
    .references(() => users.username),
  title: varchar("title", { length: 65 }).notNull(),
  blog: json("blog").notNull(),
  posted: date("posted"),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  sent_by: text("sent_by").notNull(),
  content: text("content").notNull(),
  reference: text("reference").notNull(),
  read: boolean("read").default(false),
  type: text("type").notNull(),
  created_at: date("created_at").defaultNow(),
});

export type SelectNotification = InferSelectModel<typeof notifications>;
export type InsertNotification = InferSelectModel<typeof notifications>;

export type SelectFollower = InferSelectModel<typeof followers>;
export type InsertFollower = InferSelectModel<typeof followers>;

export type SelectBlog = InferSelectModel<typeof blogs>;
export type InsertBlog = InferSelectModel<typeof blogs>;

export type SelectProject = InferSelectModel<typeof projects>;
export type InsertProject = InferSelectModel<typeof projects>;

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferSelectModel<typeof users>;
