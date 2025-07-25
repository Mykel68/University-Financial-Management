import { z } from "zod";

export const budgetFormSchema = z.object({
  title: z.string().min(2),
  amount: z.string().min(1, "Amount is required"),
  userId: z.string(),
  department: z.string().optional(),
});

export type BudgetFormValues = z.infer<typeof budgetFormSchema>; // 👈 amount: string

export const budgetSchema = z.object({
  title: z.string(),
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Amount must be a positive number",
    }),
  userId: z.string(),
  department: z.string().optional(),
});

export type BudgetPayload = z.infer<typeof budgetSchema>; // 👈 amount: number
