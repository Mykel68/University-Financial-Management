import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

import { createTRPCRouter, baseProcedure } from "../init";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { loginSchema, registerSchema } from "@/schema/auth";

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
          department: newUser[0].department,
        },
      };
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const foundUser = await ctx.db.query.user.findFirst({
      where: eq(user.email, input.email),
      columns: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        department: true,
      },
    });

    if (!foundUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

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

    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        department: foundUser.department,
        name: foundUser.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        department: foundUser.department,
      },
    };
  }),

  user: baseProcedure.query(async () => {
    const cookieStore = await cookies(); // no need for await here
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        name: string;
        email: string;
        role: string;
        department?: string;
      };

      return {
        success: true,
        user: decoded,
      };
    } catch (err) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
    }
  }),

  signOut: baseProcedure.mutation(async () => {
    const cookieStore = await cookies();
    cookieStore.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return {
      success: true,
    };
  }),
});
