// db/index.ts
import { drizzle } from "drizzle-orm/neon-http";
import { budget, user } from "./schema";
import { budgetRelations, userRelations } from "./relations";

export const db = drizzle(process.env.DATABASE_URL! as string, {
  schema: {
    budget,
    user,
    budgetRelations,
    userRelations,
  },
});
