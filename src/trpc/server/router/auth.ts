import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { createTRPCRouter, baseProcedure } from "../init";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const registerInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["system_admin", "finance_officer", "department_head"]),
  department: z.string().optional(),
  password: z.string().min(8),
});

export const authRouter = createTRPCRouter({
  register: baseProcedure
    .input(registerInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const existingUser = await ctx.db.query.user.findFirst({
        where: eq(user.email, input.email),
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 12);

      // Create user
      const newUser = await ctx.db
        .insert(user)
        .values({
          id: uuidv4(),
          firstName: input.firstName,
          lastName: input.lastName,
          name: `${input.firstName} ${input.lastName}`,
          email: input.email,
          role: input.role,
          department: input.department || null,
          password: hashedPassword,
          emailVerified: false,
        })
        .returning();

      return {
        success: true,
        user: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
          role: newUser[0].role,
        },
      };
    }),
});
