import { createTRPCRouter } from "../init";
import { authRouter } from "./auth";
import { budgetRouter } from "./budget";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  budget: budgetRouter,
});

export type AppRouter = typeof appRouter;
