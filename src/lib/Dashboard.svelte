<script lang="ts">
  import SongCard from "./SongCard.svelte";
  import { appState } from "../store";

  const handleLogout = () => {
    localStorage.removeItem("cartier-userid");
    $appState["loggedIn"] = false;
  };
</script>

<div class="flex flex-col items-center -space-y-1">
  <div
    class="flex flex-row justify-center items-center h-[13vh] space-x-4 bg-gradient-to-t from-gray-950/50 backdrop-blur-sm to-zinc-500 w-[90vw] rounded-t-md ring-1 ring-zinc-500 z-50"
  >
    <div class="flex flex-row items-center justify-center space-x-5">
      {#if $appState["user"]["images"].length == 2}
        <img
          loading="lazy"
          src={$appState["user"]["images"][1]["url"]}
          alt={`${$appState["user"]["display_name"]}'s profile picture`}
          class="rounded-full h-[10vh] ring-aodBg ring-1 shadow-sm shadow-black"
        />
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[10vh] h-[10vh] rounded-full ring-aodBg ring-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      {/if}

      <div class="flex flex-col justify-center items-start">
        <p
          class="font-semibold"
          style="text-shadow: 4px 3px 8px rgba(0,0,0,1);"
        >
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
    <div>
      <button
        class="text-sm p-0.5 bg-red-500 text-gray-950"
        aria-label="logout"
        on:click={handleLogout}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[1.5em] inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>logout
      </button>
    </div>
  </div>

  <div class="h-[67vh] overflow-y-scroll w-[100vw]">
    <div
      class="flex flex-col justify-center items-center w-full space-y-2 pb-1"
    >
      {#each $appState["playlists"]["items"] as track}
        <SongCard {track} />
      {/each}
    </div>
  </div>
  <div
    class="backdrop-opacity-100 rounded-full backdrop-blur-sm w-[95vw] h-7 absolute bottom-0 left-auto right-auto"
  />
</div>
