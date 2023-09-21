import { InferSelectModel } from "drizzle-orm";
import {
  serial,
  pgTable,
  varchar,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).unique(),
  email: varchar("email", { length: 320 }).unique(),
  emailverified: boolean("emailverified").default(false),
  password: varchar("password", { length: 60 }).notNull(),
  joined: timestamp("joined").defaultNow(),
  jwt: text("jwt"),
  badges: text("badges").array().default([])
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 2000 }),
  privacy: varchar("privacy", { length: 8 }).notNull(),
  languages: text("languages").array(),
  username: text("username"),
  stars: text("stars").array().default([])
});

export type SelectProject = InferSelectModel<typeof projects>;
export type InsertProject = InferSelectModel<typeof projects>;

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferSelectModel<typeof users>;
