import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").default("User").notNull(),
  hasAccess: boolean("has_access").default(false).notNull(),
  hasFullAccess: boolean("has_full_access").default(false).notNull(),
});

export const peoples = pgTable("peoples", {
  id: serial("id").primaryKey(),
  firstName: text("firstName").default("").notNull(),
  lastName: text("lastName").default("").notNull(),
  email: text("email").default("").notNull(),
  userId: text("user_id").notNull(),
  roleId: integer("role_id")
    .default(1)
    .references(() => roles.id, { onDelete: "set default" })
    .notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  peopleId: integer("people_id")
    .references(() => peoples.id, { onDelete: "cascade" })
    .notNull(),
  description: text("description").default("No description").notNull(),
  deliverTime: timestamp("deliver_time", { mode: "date", withTimezone: true }),
  done: boolean("done").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const roleRelations = relations(roles, ({ many }) => ({
  peoples: many(peoples),
}));

export const peopleRelations = relations(peoples, ({ one, many }) => ({
  role: one(roles, {
    fields: [peoples.roleId],
    references: [roles.id],
  }),
  orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one }) => ({
  people: one(peoples, {
    fields: [orders.peopleId],
    references: [peoples.id],
  }),
}));
