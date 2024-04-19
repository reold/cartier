<script lang="ts">
  import { onMount } from "svelte";
  import { notify } from "../App.svelte";
  import { requests } from "../server";
  import { AppState, useApp, OPFS, TabKind } from "../store";

  let settings = {};

  const purgeOpfs = () => {
    notify(
      "deleting all downloads and refreshing",
      true,
      10,
      async (destroy) => {
        await $OPFS.handle.root.removeEntry("tracks", { recursive: true });
        await $OPFS.handle.root.removeEntry("cartier.json");
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
        wthank_you_for: "testing our beta version!",
      };

      destroy();
    });
  };

  onMount(loadSettings);

  const handleLogout = async () => {
    await useApp.logout();
  };
</script>

<div
  class="h-[82vh] overflow-y-scroll w-[100vw] flex flex-col items-center justify-center"
  style={$AppState.view.tab == TabKind.SETTINGS ? "" : "display: none"}
>
  <table class="text-sm ring-1 ring-border rounded-md min-w-[95vw]">
    <thead class="text-xl"><th>parameter</th><th>value</th></thead>
    <tbody>
      {#each Object.entries(settings) as [name, value]}
        <tr class="odd:bg-foreground even:bg-background">
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
          <td class="bg-transparent border-l-2 border-border">{value}</td></tr
        >
      {/each}
    </tbody>
  </table>
  <div class="grid grid-cols-10 gap-2 btns-tab font-bold min-w-[95vw]">
    <button
      class="bg-black text-white svg-icon col-span-5"
      on:click={loadSettings}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-[1em]"
      >
        <path
          fill-rule="evenodd"
          d="M8.478 1.6a.75.75 0 0 1 .273 1.026 3.72 3.72 0 0 0-.425 1.121c.058.058.118.114.18.168A4.491 4.491 0 0 1 12 2.25c1.413 0 2.673.651 3.497 1.668.06-.054.12-.11.178-.167a3.717 3.717 0 0 0-.426-1.125.75.75 0 1 1 1.298-.752 5.22 5.22 0 0 1 .671 2.046.75.75 0 0 1-.187.582c-.241.27-.505.52-.787.749a4.494 4.494 0 0 1 .216 2.1c-.106.792-.753 1.295-1.417 1.403-.182.03-.364.057-.547.081.152.227.273.476.359.742a23.122 23.122 0 0 0 3.832-.803 23.241 23.241 0 0 0-.345-2.634.75.75 0 0 1 1.474-.28c.21 1.115.348 2.256.404 3.418a.75.75 0 0 1-.516.75c-1.527.499-3.119.854-4.76 1.049-.074.38-.22.735-.423 1.05 2.066.209 4.058.672 5.943 1.358a.75.75 0 0 1 .492.75 24.665 24.665 0 0 1-1.189 6.25.75.75 0 0 1-1.425-.47 23.14 23.14 0 0 0 1.077-5.306c-.5-.169-1.009-.32-1.524-.455.068.234.104.484.104.746 0 3.956-2.521 7.5-6 7.5-3.478 0-6-3.544-6-7.5 0-.262.037-.511.104-.746-.514.135-1.022.286-1.522.455.154 1.838.52 3.616 1.077 5.307a.75.75 0 1 1-1.425.468 24.662 24.662 0 0 1-1.19-6.25.75.75 0 0 1 .493-.749 24.586 24.586 0 0 1 4.964-1.24h.01c.321-.046.644-.085.969-.118a2.983 2.983 0 0 1-.424-1.05 24.614 24.614 0 0 1-4.76-1.05.75.75 0 0 1-.516-.75c.057-1.16.194-2.302.405-3.417a.75.75 0 0 1 1.474.28c-.164.862-.28 1.74-.345 2.634 1.237.371 2.517.642 3.832.803.085-.266.207-.515.359-.742a18.698 18.698 0 0 1-.547-.08c-.664-.11-1.311-.612-1.417-1.404a4.535 4.535 0 0 1 .217-2.103 6.788 6.788 0 0 1-.788-.751.75.75 0 0 1-.187-.583 5.22 5.22 0 0 1 .67-2.04.75.75 0 0 1 1.026-.273Z"
          clip-rule="evenodd"
        />
      </svg>
      <a href="https://github.com/reold/cartier/issues/new" target="_blank"
        >report a bug</a
      >
    </button>
    <button
      class="bg-orange-500 text-black svg-icon col-span-5"
      on:click={() => {
        window["cartier-server-url"] = "https://cartier-backend-1.onrender.com";
        notify("waking up Render server", true, 10, async (destroy) => {
          await requests.getRoot();
          destroy();
          loadSettings();
        });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-[1em]"
      >
        <path
          d="M4.08 5.227A3 3 0 0 1 6.979 3H17.02a3 3 0 0 1 2.9 2.227l2.113 7.926A5.228 5.228 0 0 0 18.75 12H5.25a5.228 5.228 0 0 0-3.284 1.153L4.08 5.227Z"
        />
        <path
          fill-rule="evenodd"
          d="M5.25 13.5a3.75 3.75 0 1 0 0 7.5h13.5a3.75 3.75 0 1 0 0-7.5H5.25Zm10.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm3.75-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          clip-rule="evenodd"
        />
      </svg>
      <p>use Render server</p>
    </button>
    <button
      class="bg-primary text-black svg-icon col-span-4"
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
    </button><button
      class="bg-red-500 text-white svg-icon col-span-6"
      on:click={handleLogout}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-[1em]"
      >
        <path
          fill-rule="evenodd"
          d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
          clip-rule="evenodd"
        />
      </svg>
      <p>logout</p></button
    >
    <button
      class="bg-red-500 text-white svg-icon col-span-10"
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
      <p>delete all downloads</p></button
    >
  </div>
</div>

<style>
  * {
    @apply select-text;
  }

  .btns-tab {
    @apply p-0.5 py-2 text-sm;
  }
</style>
