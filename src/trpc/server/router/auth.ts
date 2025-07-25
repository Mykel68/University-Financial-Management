import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { createTRPCRouter, baseProcedure } from "../init";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { registerSchema } from "@/schema/auth";

export const authRouter = createTRPCRouter({
  register: baseProcedure
    .input(registerSchema.omit({ confirmPassword: true })) // no need to send confirmPassword to server
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

  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const foundUser = await ctx.db.query.user.findFirst({
        where: eq(user.email, input.email),
        columns: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
        },
      });

      //   console.log(user);
      if (!foundUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      //   console.log(user);
      const isPasswordValid = await bcrypt.compare(
        input.password,
        foundUser.password
      );

      if (!isPasswordValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    }),
});
