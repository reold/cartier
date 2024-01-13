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
  class="bg-black opacity-75 p-1 rounded-md w-[80vw] max-w-[90vw] z-50"
  style="display: none"
  bind:this={notifyDummy}
/>

<main class="w-screen h-screen text-white text-xl select-none text-center">
  <div
    class="flex flex-row items-center justify-evenly font-bold h-[10vh] pb-2 bg-gray-950 ring-1 ring-zinc-500 shadow-xl"
  >
    <div
      class="bg-aodPurple shadow-sm text-gray-950 shadow-gray-950 rounded-b-md p-2 ml-2 h-full flex flex-col items-center justify-center"
    >
      <span>reold's</span>
    </div>
    <p class="text-3xl">Cartier Manager</p>
  </div>
  <div
    class="relative w-full flex flex-col items-center justify-center h-[85vh] bg-gradient-to-t from-gray-950 via-[#203A43] to-gray-950"
  >
    <div
      class="absolute left-0 top-0 w-full flex flex-col items-center justify-center space-y-1 text-xs"
      bind:this={notifyEle}
    />

    {#if $appState["loggedIn"] == false}
      <Login {handleUsername} />
    {:else}
      <Dashboard />
    {/if}
  </div>
  <div
    class="w-full h-[5vh] bg-gray-950 text-sm flex flex-col items-center justify-center"
  >
    <p>
      {#if import.meta.env.DEV}
        <span class="rounded-sm p-0.5 bg-red-600">DEV</span>
      {:else}
        <span class="rounded-sm p-0.5 bg-blue-600">PROD</span>
      {/if}
      Built with ❤️ by
      <a href="https://github.com/reold" target="_blank" class="text-blue-600"
        >reold</a
      >.
      <a href="https://x.com/redicrafty" target="_blank" class="text-blue-600"
        >Report an error</a
      >
    </p>
  </div>
</main>
