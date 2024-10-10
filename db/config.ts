import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    first_name: column.text(),
    last_name: column.text(),
    email: column.text(),
    password: column.text(),
  },
});

export default defineDb({
  tables: { User },
});
