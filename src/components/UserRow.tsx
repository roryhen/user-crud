import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { createSignal, Match, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import checkIcon from "../assets/check-icon.svg?raw";
import closeIcon from "../assets/close-icon.svg?raw";
import editIcon from "../assets/edit-icon.svg?raw";
import plusIcon from "../assets/plus-icon.svg?raw";
import removeIcon from "../assets/remove-icon.svg?raw";
import { Input } from "./Input";

export default function AddUser(props: {
  user?: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
}) {
  let formRef: HTMLFormElement | undefined;
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
    setEditing(true);
    formRef?.querySelector("input")?.focus();
  }

  async function cancelEdit() {
    setEditing(false);
  }

  async function updateUser(e: SubmitEvent) {
    e.preventDefault();
    setError("");

    if (editing()) {
      const { error } = await actions.updateUser({ ...store.user });
      error ? setError(error.message) : navigate("/");
    }
  }

  async function removeUser() {
    setError("");

    const msg = "Are you sure you want to delete this user?";
    if (!editing() && confirm(msg)) {
      const { error } = await actions.removeUser({ email: store.user.email });
      error ? setError(error.message) : navigate("/");
    }
  }

  return (
    <>
      <form
        class="col-span-5 grid grid-cols-subgrid items-center border-t border-slate-300 dark:border-slate-600"
        onSubmit={updateUser}
        ref={formRef}
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
          <Match when={!props.user}>
            <div class="px-4 py-3">&nbsp;</div>
          </Match>
        </Switch>
        <div class="col-start-5 px-4 py-2">
          <Switch>
            <Match when={editing()}>
              <button
                class="-my-1 p-2"
                innerHTML={checkIcon}
                title="Update user"
                type="submit"
              ></button>
              <button
                class="-my-1 p-2"
                innerHTML={closeIcon}
                title="Cancel edit"
                onClick={cancelEdit}
                type="button"
              ></button>
            </Match>
            <Match when={!props.user}>
              <button
                class="-my-1 p-2"
                innerHTML={plusIcon}
                title="Add user"
                onClick={addUser}
                type="button"
              ></button>
            </Match>
            <Match when={!editing()}>
              <button
                class="-my-1 p-2"
                innerHTML={editIcon}
                title="Edit user"
                onClick={() => setEditing(true)}
                type="button"
              ></button>
              <button
                class="-my-1 p-2"
                innerHTML={removeIcon}
                title="Remove user"
                onClick={removeUser}
                type="button"
              ></button>
            </Match>
          </Switch>
        </div>
      </form>
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
