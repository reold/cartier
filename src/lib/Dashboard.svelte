<script lang="ts">
  import SongCard from "./SongCard.svelte";
  import { slide } from "svelte/transition";
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
          class="rounded-full h-[10vh] ring-aodBg ring-1 shadow-sm shadow-black aspect-square"
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
        <div class="flex flex-row justify-center items-center text-xs">
          <p>
            {$appState["user"]["followers"]["total"]}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-[1em] inline ml-[0.5ch]"
          >
            <path
              fill-rule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
              clip-rule="evenodd"
            />
            <path
              d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"
            />
          </svg>
          <p class="mx-[1ch]">and</p>

          <p>
            {$appState["playlists"]["total"]} playlists
          </p>
        </div>

        <p class="text-xs select-text text-ellipsis">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-[1em] inline mr-[0.5ch]"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
              clip-rule="evenodd"
            />
          </svg>{$appState["user"]["id"]}
        </p>
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

  <div class="h-[70vh] overflow-y-scroll w-[100vw]">
    <div
      class="flex flex-col justify-center items-center w-full space-y-2 pb-1"
      transition:slide={{ duration: 1000 }}
    >
      {#each $appState["playlists"]["items"] as track}
        <SongCard {track} />
      {/each}
    </div>
  </div>
  <div
    class="backdrop-opacity-100 rounded-full backdrop-blur-sm w-[95vw] h-5 absolute bottom-0 left-auto right-auto"
  />
</div>
