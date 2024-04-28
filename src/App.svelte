<script context="module" lang="ts">
  let notifyEle: HTMLDivElement;
  let notifyDummy: HTMLDivElement;

  export const notify = (
    message: string,
    loading: boolean = false,
    duration: number = 3,
    destroyHandler?: ((destroy: () => void) => void) | undefined
  ) => {
    const newNotify: HTMLDivElement = notifyDummy.cloneNode(
      true
    ) as HTMLDivElement;

    newNotify.innerHTML = loading
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[1.2em] animate-spin inline aspect-square mr-1" > <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /> </svg>${message}`
      : message;
    newNotify.style.display = "block";

    notifyEle.appendChild(newNotify);

    if (destroyHandler) destroyHandler(() => notifyEle.removeChild(newNotify));
    else setTimeout(() => notifyEle.removeChild(newNotify), duration * 1000);
  };
</script>

<script lang="ts">
  import Login from "./lib/Login.svelte";
  import Dashboard from "./lib/Dashboard.svelte";
  import Tab from "./common/Tab.svelte";

  import { slide } from "svelte/transition";

  import { AppState, useApp } from "./store";
  import { onMount } from "svelte";

  const handleUsername = async (username: string) => {
    await useApp.login(username);
  };

  onMount(() => {
    useApp.initCartierFile();
  });
</script>

<div
  class="bg-foreground/90 p-1 rounded-md w-[80vw] max-w-[90vw] z-[1000]"
  style="display: none"
  bind:this={notifyDummy}
/>

<main class="w-screen h-screen text-white text-xl select-none text-center">
  <div
    class="flex flex-col justify-center items-center relative h-[100%] bg-background"
  >
    {#if $AppState["logged"] == false}
      <Tab>
        <Login {handleUsername} />
      </Tab>
    {:else}
      <Dashboard />
    {/if}

    <div
      class="absolute left-0 top-[1em] w-full flex flex-col items-center justify-center space-y-1 text-xs"
      bind:this={notifyEle}
      transition:slide={{ duration: 10000 }}
    />
  </div>
</main>
