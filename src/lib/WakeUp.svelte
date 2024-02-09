<script lang="ts">
  import { onMount } from "svelte";
  import { requests } from "../server";
  import { writable } from "svelte/store";
  import { notify } from "../App.svelte";

  import Dialog from "./Dialog.svelte";

  const wakeUpInfo = writable({ step: "trying to make contact", is: true });

  export let handleWakeup: () => void;

  onMount(() => {
    $wakeUpInfo["step"] = "waking up servers";
    requests
      .getRoot()
      .then((data) => {
        $wakeUpInfo["is"] = false;
        $wakeUpInfo["step"] = "servers are running!";
        handleWakeup();
      })
      .catch((err) => {
        notify(`unable to reach servers. err: ${err}`);
        $wakeUpInfo["step"] = "servers unreachable (reload?)";
      });
  });
</script>

<Dialog hidden={!$wakeUpInfo["is"]}>
  <h1 class="text-xl">Waking up servers!</h1>
  <p class="text-xs text-gray-500 inline">
    Our servers take a little break every 5 minutes when things quiet down.
    We're in the process of waking them up for you. It's automatic, so no need
    to stress!
  </p>
  <p class:text-green-500={!$wakeUpInfo["is"]} class="inline">
    {#if $wakeUpInfo["is"]}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="aspect-square w-[1.2em] animate-spin inline"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    {/if}

    {$wakeUpInfo["step"]}
  </p>
</Dialog>
