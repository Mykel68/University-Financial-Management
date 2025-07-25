import { z } from "zod";

export const budgetSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;
