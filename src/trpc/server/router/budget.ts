import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, baseProcedure } from "../init";
import { budget } from "@/db/schema";
import { budgetFormSchema, updateBudgetSchema } from "@/schema/budget";
import { eq } from "drizzle-orm";

export const budgetRouter = createTRPCRouter({
  addBudget: baseProcedure
    .input(budgetFormSchema)
    .mutation(async ({ ctx, input }) => {
      const newBudget = await ctx.db
        .insert(budget)
        .values({
          id: uuidv4(),
          title: input.title,
          amount: Number(input.amount), // Ensure it's a number
          userId: input.userId,
          department: input.department ?? "", // fallback if optional
        })
        .returning();

      return newBudget[0];
    }),

  // ✅ Get all budgets
  getApprovedBudgets: baseProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.budget.findMany({
      where: (budget, { eq }) => eq(budget.isApproved, true),
    });
  }),
  // ✅ Get budget by id
  getBudgetById: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.budget.findMany({
        where: (budget, { eq }) => eq(budget.id, input.id),
      });
    }),

  // ✅ Get budget by user
  getUserBudgets: baseProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.budget.findMany({
        where: (budget, { eq }) => eq(budget.userId, input.userId),
      });
    }),

  // ✅ Get all budgets
  getBudgets: baseProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.budget.findMany();
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

  // ✅ Update budget
  updateBudget: baseProcedure
    .input(updateBudgetSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(budget)
        .set({
          title: input.title,
          amount: input.amount,
          userId: input.userId,
          department: input.department,
          updatedAt: new Date(),
        })
        .where(eq(budget.id, input.id)) // ✅ not a callback
        .returning();
    }),

  // ✅ Delete budget
  deleteBudget: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(budget) // ✅ Pass the table directly
        .where(eq(budget.id, input.id)); // ✅ Use eq directly
    }),
  // ✅ Approve budget
  approveBudget: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(budget)
        .set({
          isApproved: true,
          updatedAt: new Date(),
        })
        .where(eq(budget.id, input.id))
        .returning();
    }),

  // ✅ Reject budget
  rejectBudget: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(budget)
        .set({
          isApproved: false,
          updatedAt: new Date(),
        })
        .where(eq(budget.id, input.id))
        .returning();
    }),
});
