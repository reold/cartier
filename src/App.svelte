<script context="module" lang="ts">
  let notifyEle: HTMLDivElement;
  let notifyDummy: HTMLDivElement;

  export const notify = (
    message: string,
    loading: boolean = false,
    duration: number = 3
  ) => {
    const newNotify: HTMLDivElement = notifyDummy.cloneNode(
      true
    ) as HTMLDivElement;

    newNotify.innerHTML = loading
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[1.2em] animate-spin inline aspect-square mr-1" > <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /> </svg>${message}`
      : message;
    newNotify.style.display = "block";

    notifyEle.appendChild(newNotify);

    setTimeout(() => {
      notifyEle.removeChild(newNotify);
    }, duration * 1000);
  };
</script>

<script lang="ts">
  import Login from "./lib/Login.svelte";
  import Dashboard from "./lib/Dashboard.svelte";
  import { requests } from "./server";

  import { slide } from "svelte/transition";

  import { appState } from "./store";

  const handleUsername = (username: string) => {
    requests.getUserInfo(username).then((data) => {
      if (data["success"] == false) {
        notify("something went wrong!");
        return;
      }

      $appState = { ...$appState, ...data["data"] };
      $appState["loggedIn"] = true;
    });
  };
</script>

<div
  class="bg-black opacity-75 p-1 rounded-md w-[80vw] max-w-[90vw] z-[1000]"
  style="display: none"
  bind:this={notifyDummy}
/>

<main class="w-screen h-screen text-white text-xl select-none text-center">
  <div
    class="flex flex-row items-center justify-evenly font-bold h-[10vh] bg-gray-950 ring-1 ring-zinc-500 shadow-xl"
  >
    <div
      class="bg-aodPurple shadow-sm text-gray-950 shadow-gray-950 rounded-md p-2 ml-2 h-11/12 flex flex-col items-center justify-center"
    >
      <span>reold's</span>
    </div>
    <p class="text-3xl">Cartier Manager</p>
  </div>
  <div
    class="flex flex-col space-y-1 items-center relative h-[85vh] bg-gradient-to-t from-gray-950 via-[#203A43] to-gray-950"
  >
    <div
      class="absolute left-0 top-0 w-full flex flex-col items-center justify-center space-y-1 text-xs"
      bind:this={notifyEle}
      transition:slide={{ duration: 10000 }}
    />

    {#if $appState["loggedIn"] == false}
      <Login {handleUsername} />
    {:else}
      <Dashboard />
    {/if}
  </div>
  <div
    class="w-full h-[5vh] bg-gray-950 text-xs flex flex-col items-center justify-center"
  >
    <p>
      {#if import.meta.env.DEV}
        <span class="rounded-sm p-0.5 bg-red-600">dev</span>
      {:else}
        <span class="rounded-sm p-0.5 bg-blue-600">prod</span>
      {/if}
      built by
      <a href="https://github.com/reold" target="_blank" class="text-blue-600"
        >reold</a
      >.
      <button
        aria-label="use alternative render service servers"
        class="p-0 bg-transparent text-orange-600 text-xs disabled:animate-pulse"
        on:click={async ({ target }) => {
          window["cartier-server-url"] = "https://cartier-backend.onrender.com";
          if (target) {
            target.disabled = true;
            target.innerText = "using render";
          }
          notify("switching & waking alternate (render)server", true);
          await requests.getRoot();
          notify("(render)server running");
        }}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[1em] inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
          />
        </svg>
        use render</button
      >
      <a
        href="https://github.com/reold/cartier/issues/new"
        target="_blank"
        class="text-blue-600"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[1em] inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        report issue</a
      >
    </p>
  </div>
</main>
