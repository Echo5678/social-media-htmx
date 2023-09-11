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
});

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferSelectModel<typeof users>;
