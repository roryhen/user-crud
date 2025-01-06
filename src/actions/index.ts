import { defineAction } from "astro:actions";
import { db, eq, User } from "astro:db";
import { z } from "astro:schema";

const maxLength = 50;

export const server = {
  getUser: defineAction({
    input: z.object({
      email: z.string().trim().email().min(1).max(maxLength),
    }),
    handler: async (input) => {
      const users = await db
        .select()
        .from(User)
        .where(eq(User.email, input.email))
        .limit(1);
      return users[0];
    },
  }),
  updateUser: defineAction({
    input: z.object({
      first_name: z.string().trim().min(1).max(maxLength),
      last_name: z.string().trim().min(1).max(maxLength),
      email: z.string().trim().email().min(1).max(maxLength),
      password: z.string().trim().min(4).max(maxLength),
    }),
    handler: async (input) => {
      const users = await db
        .select()
        .from(User)
        .where(eq(User.email, input.email))
        .limit(1);
      const user = users[0];

      if (user) {
        await db.update(User).set(input).where(eq(User.email, input.email));

        return {
          message: "User updated",
        };
      }

      await db.insert(User).values(input);

      return {
        message: "User created",
      };
    },
  }),
  removeUser: defineAction({
    input: z.object({
      email: z.string().trim().email().min(1).max(maxLength),
    }),
    handler: async (input) => {
      await db.delete(User).where(eq(User.email, input.email));
      return {
        message: "User removed",
      };
    },
  }),
};
