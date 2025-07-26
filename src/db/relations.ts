import { relations } from "drizzle-orm";
import { budget, user } from "./schema";

export const budgetRelations = relations(budget, ({ one }) => ({
  user: one(user, {
    fields: [budget.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  budgets: many(budget),
}));
