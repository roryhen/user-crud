import { type SetStoreFunction } from "solid-js/store";

export function Input(props: {
  name: "first_name" | "last_name" | "email" | "password";
  placeholder: string;
  value?: string;
  setter: SetStoreFunction<{
    user: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    };
  }>;
}) {
  return (
    <input
      class="mx-2 my-2 border-0 border-b border-slate-400 bg-transparent px-2 pt-1 pb-[0.1875rem] placeholder-slate-400 dark:border-slate-600 dark:placeholder-slate-600"
      name={props.name}
      placeholder={props.placeholder}
      onInput={(e) => props.setter("user", props.name, e.target.value)}
      value={props.value || ""}
    />
  );
}
