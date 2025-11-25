import {
  boolean,
  integer,
  pgEnum,
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
  roleId: integer("role_id").references(() => roles.id, {
    onDelete: "set null",
  }),
});

export const itemCategories = pgTable("item_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  itemCategoryId: integer("item_category_id").references(
    () => itemCategories.id,
    { onDelete: "set null" },
  ),
  available: boolean("available").default(true).notNull(),
});

export const orderStatusEnum = pgEnum("order_status", [
  "IN_PROGRESS",
  "DONE",
  "DELETED",
]);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  peopleId: integer("people_id")
    .references(() => peoples.id, { onDelete: "cascade" })
    .notNull(),
  itemId: integer("item_id")
    .references(() => items.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  deliverTime: timestamp("deliver_time", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  deliverPlace: text("delivery_place").notNull(),
  status: orderStatusEnum("status").default("IN_PROGRESS").notNull(),
});

export const accessRequests = pgTable("access_requests", {
  id: serial("id").primaryKey(),
  peopleId: integer("people_id")
    .references(() => peoples.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  done: boolean("done").default(false).notNull(),
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
  accessRequests: many(accessRequests),
}));

export const itemCategoryRelations = relations(itemCategories, ({ many }) => ({
  items: many(items),
}));

export const itemRelations = relations(items, ({ one, many }) => ({
  itemCategory: one(itemCategories, {
    fields: [items.itemCategoryId],
    references: [itemCategories.id],
  }),
  orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one }) => ({
  people: one(peoples, {
    fields: [orders.peopleId],
    references: [peoples.id],
  }),
  item: one(items, {
    fields: [orders.itemId],
    references: [items.id],
  }),
}));

export const accessRequestRelations = relations(accessRequests, ({ one }) => ({
  people: one(peoples, {
    fields: [accessRequests.peopleId],
    references: [peoples.id],
  }),
}));
