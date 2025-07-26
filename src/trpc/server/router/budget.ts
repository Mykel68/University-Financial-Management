import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, baseProcedure } from "../init";
import { budget } from "@/db/schema";
import { budgetSchema } from "@/schema/budget";

export const budgetRouter = createTRPCRouter({
  addBudget: baseProcedure
    .input(budgetSchema)
    .mutation(async ({ ctx, input }) => {
      const newBudget = await ctx.db
        .insert(budget)
        .values({
          id: uuidv4(),
          title: input.title,
          amount: input.amount,
          userId: input.userId,
          department: input.department,
          spent: 0,
        })
        .returning();

      return newBudget[0];
    }),

  // ✅ Get all budgets
  getBudgets: baseProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.budget.findMany({
      where: (budget, { eq }) => eq(budget.isApproved, true),
    });
  }),

  // ✅ Get budgets by department
  getDepartmentBudgets: baseProcedure
    .input(z.object({ department: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.budget.findMany({
        where: (budget, { eq, and }) =>
          and(
            eq(budget.department, input.department),
            eq(budget.isApproved, true)
          ),
      });
    }),
});
