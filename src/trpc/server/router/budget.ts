import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, baseProcedure } from "../init";
import { budget, user } from "@/db/schema";
import { budgetFormSchema, updateBudgetSchema } from "@/schema/budget";
import { eq, and } from "drizzle-orm";

export const budgetRouter = createTRPCRouter({
  addBudget: baseProcedure
    .input(budgetFormSchema)
    .mutation(async ({ ctx, input }) => {
      const newBudget = await ctx.db
        .insert(budget)
        .values({
          id: uuidv4(),
          title: input.title,
          amount: Number(input.amount),
          userId: input.userId,
          department: input.department ?? "",
        })
        .returning();
      return newBudget[0];
    }),

  getApprovedBudgets: baseProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.budget.findMany({
      where: (budget, { eq }) => eq(budget.isApproved, "approved"),
    });
  }),

  getBudgetById: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.budget.findFirst({
        where: (budget, { eq }) => eq(budget.id, input.id),
      });
    }),

  getUserBudgets: baseProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.budget.findMany({
        where: (budget, { eq }) => eq(budget.userId, input.userId),
      });
    }),

  getBudgets: baseProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.budget.findMany();
  }),

  getDepartmentBudgets: baseProcedure
    .input(z.object({ department: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.budget.findMany({
        where: (budget, { eq, and }) =>
          and(
            eq(budget.department, input.department),
            eq(budget.isApproved, "approved")
          ),
      });
    }),

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
        .where(eq(budget.id, input.id))
        .returning();
    }),

  deleteBudget: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(budget)
        .where(eq(budget.id, input.id))
        .returning();
    }),

  approveBudget: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(budget)
        .set({
          isApproved: "approved",
          updatedAt: new Date(),
        })
        .where(eq(budget.id, input.id))
        .returning();
    }),

  rejectBudget: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(budget)
        .set({
          isApproved: "rejected",
          updatedAt: new Date(),
        })
        .where(eq(budget.id, input.id))
        .returning();
    }),

  setUnderReview: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(budget)
        .set({
          isApproved: "under_review",
          updatedAt: new Date(),
        })
        .where(eq(budget.id, input.id))
        .returning();
    }),

  budgetOverview: baseProcedure.query(async ({ ctx }) => {
    const allBudgets = await ctx.db.query.budget.findMany({
      with: {
        user: {
          columns: {
            name: true,
          },
        },
      },
      columns: {
        id: true,
        title: true,
        amount: true,
        department: true,
        isApproved: true,
        spent: true,
        createdAt: true,
      },
    });

    const total = allBudgets.length;
    const approved = allBudgets.filter(
      (b) => b.isApproved === "approved"
    ).length;
    const pending = allBudgets.filter((b) => b.isApproved === "pending").length;
    const rejected = allBudgets.filter(
      (b) => b.isApproved === "rejected"
    ).length;
    const underReview = allBudgets.filter(
      (b) => b.isApproved === "under_review"
    ).length;

    return {
      total,
      approved,
      pending,
      rejected,
      underReview,
      budgets: allBudgets.map((b) => ({
        ...b,
        submittedBy: b.user.name || "Unknown",
        submittedDate: b.createdAt || new Date(),
      })),
    };
  }),
});
