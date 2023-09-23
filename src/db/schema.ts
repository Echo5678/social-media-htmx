import { InferSelectModel } from "drizzle-orm";
import {
  serial,
  pgTable,
  varchar,
  timestamp,
  boolean,
  text,
  json,
  integer,
  primaryKey,
  foreignKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }),
  last_name: varchar("last_name", { length: 50 }),
  username: varchar("username", { length: 20 }).unique(),
  email: varchar("email", { length: 320 }).unique(),
  emailverified: boolean("emailverified").default(false),
  password: varchar("password", { length: 60 }).notNull(),
  bio: varchar("bio", { length: 250 }).default(""),
  verified: boolean("verified").default(false),
  joined: text("joined"),
  jwt: text("jwt"),
  badges: text("badges").array().default([]),
  profilePicture: varchar("profilepicture").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 2000 }),
  privacy: varchar("privacy", { length: 8 }).notNull(),
  languages: text("languages").array(),
  username: text("username")
    .notNull()
    .references(() => users.username),
  image: varchar("image").notNull(),
  collaborators: text("collaborators").array().default([]),
  stars: text("stars").array().default([]),
});

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
      userReferences: foreignKey({
        columns: [table.user_id, table.follower_id],
        foreignColumns: [users.id, users.id],
      }),
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
  posted: timestamp("posted").defaultNow(),
});

export type SelectFollower = InferSelectModel<typeof followers>;
export type InsertFollower = InferSelectModel<typeof followers>;

export type SelectBlog = InferSelectModel<typeof blogs>;
export type InsertBlog = InferSelectModel<typeof blogs>;

export type SelectProject = InferSelectModel<typeof projects>;
export type InsertProject = InferSelectModel<typeof projects>;

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferSelectModel<typeof users>;
