<script lang="ts">
  import SongCard from "./SongCard.svelte";
  import { appState } from "../store";

  console.log($appState);
</script>

<div class="flex flex-col items-center space-y--2">
  <div
    class="flex flex-row justify-center items-center h-[15vh] space-x-4 bg-gray-500 w-[90vw] rounded-t-xl ring-2 ring-zinc-500 py-5"
  >
    {#if $appState["user"]["images"].length == 2}
      <img
        src={$appState["user"]["images"][1]["url"]}
        alt={`${$appState["user"]["display_name"]}'s profile picture`}
        class="rounded-full h-[10vh] ring-aodBg ring-4"
      />
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-[10vh] h-[10vh] rounded-full ring-aodBg ring-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    {/if}

    <div class="flex flex-col justify-center items-start">
      <p class="font-semibold" style="text-shadow: 4px 3px 8px rgba(0,0,0,1);">
        {$appState["user"]["display_name"]}
      </p>
      <p class="text-xs">
        {$appState["user"]["followers"]["total"]} followers, {$appState[
          "playlists"
        ]["total"]} playlists
      </p>
      <p class="text-xs">{$appState["user"]["id"]}</p>
    </div>
  </div>

  <div class="h-[65vh] overflow-y-scroll w-[100vw]">
    <div
      class="flex flex-col justify-center items-center w-full space-y-2 pb-1"
    >
      {#each $appState["playlists"]["items"] as track}
        <SongCard {track} />
      {/each}
    </div>
  </div>
</div>
