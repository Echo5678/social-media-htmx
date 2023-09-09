import { InferSelectModel } from "drizzle-orm";
import {
  serial,
  pgTable,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).unique(),
  email: varchar("email", { length: 320 }).unique(),
  emailverified: boolean("emailverified").default(false),
  password: varchar("password", { length: 60 }),
  joined: timestamp("joined").defaultNow(),
});

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferSelectModel<typeof users>;
