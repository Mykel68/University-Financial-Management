import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  index,
} from "drizzle-orm/pg-core";

export const approvalStatusEnum = pgEnum("approval_status", [
  "pending",
  "approved",
  "rejected",
  "under_review",
]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  department: text("department"),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const budget = pgTable(
  "budget",
  {
    id: uuid("id").primaryKey(),
    title: text("title").notNull(),
    amount: integer("amount").notNull(),
    department: text("department").notNull(),
    spent: integer("spent").default(0).notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    isApproved: approvalStatusEnum("is_approved").default("pending").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIndex: index("user_index").on(table.userId),
  })
);

// export const usersTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
// });

// export const user = pgTable("user", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   emailVerified: boolean("email_verified")
//     .$defaultFn(() => false)
//     .notNull(),
//   image: text("image"),
//   createdAt: timestamp("created_at")
//     .$defaultFn(() => /* @__PURE__ */ new Date())
//     .notNull(),
//   updatedAt: timestamp("updated_at")
//     .$defaultFn(() => /* @__PURE__ */ new Date())
//     .notNull(),
// });

// export const session = pgTable("session", {
//   id: text("id").primaryKey(),
//   expiresAt: timestamp("expires_at").notNull(),
//   token: text("token").notNull().unique(),
//   createdAt: timestamp("created_at").notNull(),
//   updatedAt: timestamp("updated_at").notNull(),
//   ipAddress: text("ip_address"),
//   userAgent: text("user_agent"),
//   userId: text("user_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
// });

// export const account = pgTable("account", {
//   id: text("id").primaryKey(),
//   accountId: text("account_id").notNull(),
//   providerId: text("provider_id").notNull(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
//   accessToken: text("access_token"),
//   refreshToken: text("refresh_token"),
//   idToken: text("id_token"),
//   accessTokenExpiresAt: timestamp("access_token_expires_at"),
//   refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
//   scope: text("scope"),
//   password: text("password"),
//   createdAt: timestamp("created_at").notNull(),
//   updatedAt: timestamp("updated_at").notNull(),
// });

// export const verification = pgTable("verification", {
//   id: text("id").primaryKey(),
//   identifier: text("identifier").notNull(),
//   value: text("value").notNull(),
//   expiresAt: timestamp("expires_at").notNull(),
//   createdAt: timestamp("created_at").$defaultFn(
//     () => /* @__PURE__ */ new Date()
//   ),
//   updatedAt: timestamp("updated_at").$defaultFn(
//     () => /* @__PURE__ */ new Date()
//   ),
// });
