import { createStore, type SetStoreFunction } from "solid-js/store";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { createSignal } from "solid-js";

function Input(props: {
  name: "first_name" | "last_name" | "email" | "password";
  placeholder: string;
  setter: SetStoreFunction<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }>;
}) {
  return (
    <input
      class="border dark:border-slate-600 bg-transparent placeholder-slate-600 rounded px-2 py-1"
      name={props.name}
      placeholder={props.placeholder}
      onInput={(e) => props.setter(props.name, e.target.value)}
    />
  );
}

export default function AddUser() {
  const [error, setError] = createSignal<string | undefined>("");
  const [store, setStore] = createStore({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  async function add(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const { error } = await actions.addUser({ ...store });
      if (!error) {
        navigate("/");
      } else {
        setError(error.message);
      }
    }
  }

  return (
    <>
      <div
        class="border-x border-b dark:border-slate-600 grid grid-cols-4 col-span-4 rounded-b-md p-2 space-x-2"
        onKeyDown={add}
      >
        <Input name="first_name" placeholder="First Name" setter={setStore} />
        <Input name="last_name" placeholder="Last Name" setter={setStore} />
        <Input name="email" placeholder="Email" setter={setStore} />
        <Input name="password" placeholder="Password" setter={setStore} />
      </div>
      {error() && <div class="col-span-4 mt-4">{error()}</div>}
    </>
  );
}
