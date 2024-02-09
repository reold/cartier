<script lang="ts">
  import { onMount } from "svelte";
  import Dialog from "./Dialog.svelte";
  import { notify } from "../App.svelte";

  export let hidden: boolean;
  let settings = {};

  const purgeOpfs = () => {
    notify(
      "deleting all downloads and refreshing",
      true,
      10,
      async (destroy) => {
        const root = await navigator.storage.getDirectory();
        await root.remove({ recursive: true });
        destroy();
        window.location.reload();
      }
    );
  };

  const loadSettings = () => {
    notify("loading settings", true, 5, async (destroy) => {
      const opfsEstimate = await navigator.storage.estimate();
      let opfsUsed = 0;

      if (opfsEstimate) opfsUsed = opfsEstimate["usage"] / 1024 ** 2;

      settings = {
        rsaved_userid: localStorage.getItem("cartier-userid") || "not saved",
        rserver_url: window["cartier-server-url"],
        ropfs_used: `${opfsUsed.toFixed(1)} MB`,
      };

      destroy();
    });
  };

  onMount(loadSettings);
</script>

<Dialog {hidden}>
  <div class="text-xl mb-2 svg-icon">
    <svg
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
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
    <h1>Settings</h1>
  </div>

  <table class="text-sm ring-1 ring-zinc-500 rounded-md">
    <thead class="border-b-2 border-gray-900"
      ><th>parameter</th><th>value</th></thead
    >
    <tbody>
      {#each Object.entries(settings) as [name, value]}
        <tr class="odd:bg-gray-900 even:bg-gray-950">
          <td class="svg-icon p-2">
            {#if name.startsWith("r")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[1em]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            {/if}
            {name.slice(1).split("_").join(" ")}
          </td>
          <td class="bg-gray-950 border-l-2 border-gray-900">{value}</td></tr
        >
      {/each}
    </tbody>
  </table>
  <div class="grid grid-cols-10 gap-1 mt-2 btns-tab font-bold">
    <button
      class="bg-blue-500 text-black svg-icon col-span-3"
      on:click={loadSettings}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-[1em]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
      <p>refresh</p>
    </button>
    <button
      class="bg-red-500 text-white svg-icon col-span-5"
      on:click={purgeOpfs}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-[1em]"
      >
        <path
          fill-rule="evenodd"
          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="">delete downloads</p></button
    >
    <button class="col-span-2" on:click={() => (hidden = true)}>close</button>
  </div>
</Dialog>

<style>
  * {
    @apply select-text;
  }

  .btns-tab button {
    @apply p-0.5 py-2 text-sm;
  }
</style>
