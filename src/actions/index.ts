import { defineAction } from "astro:actions";
import { db, User } from "astro:db";
import { z } from "astro:schema";

const maxLength = 50;

export const server = {
  addUser: defineAction({
    input: z.object({
      first_name: z.string().trim().min(1).max(maxLength),
      last_name: z.string().trim().min(1).max(maxLength),
      email: z.string().trim().email().min(1).max(maxLength),
      password: z.string().trim().min(4).max(maxLength),
    }),
    handler: async (input) => {
      await db.insert(User).values(input);
      return {
        message: "User added successfully",
      };
    },
  }),
};
