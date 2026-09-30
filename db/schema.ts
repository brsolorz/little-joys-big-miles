import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
export const fundraiserState = sqliteTable("fundraiser_state", { id: integer("id").primaryKey(), revision: integer("revision").notNull(), value: text("value").notNull() });
