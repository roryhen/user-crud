import { createStore, type SetStoreFunction } from "solid-js/store";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { createSignal, Switch, Match, Show, createEffect } from "solid-js";
import editIcon from "../../public/edit-icon.svg?raw";
import removeIcon from "../../public/remove-icon.svg?raw";
import checkIcon from "../../public/check-icon.svg?raw";
import plusIcon from "../../public/plus-icon.svg?raw";

function Input(props: {
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
      class="mx-2 my-2 border-0 border-b border-slate-400 bg-transparent px-2 pb-[0.1875rem] pt-1 placeholder-slate-400 dark:border-slate-600 dark:placeholder-slate-600"
      name={props.name}
      placeholder={props.placeholder}
      onInput={(e) => props.setter("user", props.name, e.target.value)}
      value={props.value || ""}
    />
  );
}

export default function AddUser(props: {
  user?: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
}) {
  const [error, setError] = createSignal("");
  const [editing, setEditing] = createSignal(false);
  const [store, setStore] = createStore({
    user: {
      first_name: props.user?.first_name ?? "",
      last_name: props.user?.last_name ?? "",
      email: props.user?.email ?? "",
      password: props.user?.password ?? "",
    },
  });

  async function addUser() {
    setError("");
    setEditing(true);
  }

  async function updateUser() {
    setError("");

    if (editing()) {
      const { error } = await actions.updateUser({ ...store.user });
      if (!error) {
        navigate("/");
      } else {
        setError(error.message);
      }
    }
  }

  async function removeUser() {
    setError("");
    const msg = "Are you sure you want to delete this user?";
    if (!editing() && confirm(msg)) {
      const { error } = await actions.removeUser({ email: store.user.email });
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
        class="col-span-5 grid grid-cols-subgrid items-center border-t border-slate-300 dark:border-slate-600"
        onKeyDown={updateUser}
      >
        <Switch>
          <Match when={editing()}>
            <Input
              name="first_name"
              placeholder="First Name"
              setter={setStore}
              value={props.user?.first_name}
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              setter={setStore}
              value={props.user?.last_name}
            />
            <Input
              name="email"
              placeholder="Email"
              setter={setStore}
              value={props.user?.email}
            />
            <Input
              name="password"
              placeholder="Password"
              setter={setStore}
              value={props.user?.password}
            />
          </Match>
          <Match when={props.user}>
            <div class="px-4 py-3">{props.user?.first_name}</div>
            <div class="px-4 py-3">{props.user?.last_name}</div>
            <div class="px-4 py-3">{props.user?.email}</div>
            <div class="px-4 py-3">{props.user?.password}</div>
          </Match>
        </Switch>
        <div class="col-start-5 px-4 py-2">
          <Switch>
            <Match when={editing()}>
              <button
                class="-my-1 p-2"
                innerHTML={checkIcon}
                title="Update User"
                onClick={updateUser}
              ></button>
            </Match>
            <Match when={!props.user}>
              <button
                class="-my-1 p-2"
                innerHTML={plusIcon}
                title="Add User"
                onClick={addUser}
              ></button>
            </Match>
            <Match when={!editing()}>
              <button
                class="-my-1 p-2"
                innerHTML={editIcon}
                title="Edit User"
                onClick={() => setEditing(true)}
              ></button>
              <button
                class="-my-1 p-2"
                innerHTML={removeIcon}
                title="Remove User"
                onClick={removeUser}
              ></button>
            </Match>
          </Switch>
        </div>
      </div>
      {error() && (
        <div class="fixed bottom-6 end-6 flex gap-6 rounded-md border border-slate-300 px-6 py-4 text-rose-800 dark:border-slate-600 dark:text-rose-400">
          {error()}
          <button
            class="-m-3 -mt-4 p-3 text-xl leading-none"
            onClick={() => setError("")}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
