import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    role: z.enum(["system_admin", "finance_officer", "department_head"]),
    // role: z.enum(["system_admin", "finance_officer", "department_head"], {
    //   required_error: "Please select a role",
    // }),
    department: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "department_head") {
        return data.department && data.department.trim().length > 0;
      }
      return true;
    },
    {
      message: "Department is required for Department Head role",
      path: ["department"],
    }
  );

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginFormData = z.infer<typeof loginSchema>;
