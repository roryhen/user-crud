import { db, User } from "astro:db";

export default async function seed() {
  await db.insert(User).values([
    {
      id: 1,
      first_name: "Leeroy",
      last_name: "Jenkins",
      email: "k5jxR@example.com",
      password: "1234",
    },
    {
      id: 2,
      first_name: "Frank",
      last_name: "Harris",
      email: "wK5u0@example.com",
      password: "1234",
    },
    {
      id: 3,
      first_name: "Hugo",
      last_name: "Gates",
      email: "ZTqY0@example.com",
      password: "1234",
    },
  ]);
}
