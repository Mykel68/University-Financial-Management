import { v4 as uuidv4 } from "uuid";

import { createTRPCRouter, baseProcedure } from "../init";
import { budget, user } from "@/db/schema";
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
        })
        .returning();

      return newBudget[0]; // return the inserted row
    }),
});
