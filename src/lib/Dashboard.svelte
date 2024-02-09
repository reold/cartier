<script lang="ts">
  import PlaylistCard from "./PlaylistCard.svelte";
  import Settings from "./Settings.svelte";

  import { slide } from "svelte/transition";
  import { appState } from "../store";

  import DotSVG from "../svg/Dot.svelte";

  let openSettings: boolean = true;

  const handleLogout = () => {
    localStorage.removeItem("cartier-userid");
    $appState["loggedIn"] = false;
  };
</script>

<div class="flex flex-col items-center -space-y-1">
  <div
    class="flex flex-row justify-center items-center h-[13vh] space-x-5 bg-gradient-to-t from-gray-950/50 backdrop-blur-sm to-zinc-500 w-[90vw] rounded-t-md ring-1 ring-zinc-500 z-50"
  >
    <div class="flex flex-row items-center justify-center space-x-2">
      {#if $appState["user"]["images"].length == 2}
        <img
          loading="lazy"
          src={$appState["user"]["images"][1]["url"]}
          alt={`${$appState["user"]["display_name"]}'s profile picture`}
          class="rounded-full w-[15vw] max-w-[10vh] ring-aodBg ring-1 shadow-sm shadow-black aspect-square"
        />
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[15vw] max-w-[10vh] aspect-square rounded-full ring-aodBg ring-2"
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
        <div
          class="flex flex-row justify-center items-center space-x-2 text-xs text-gray-300"
        >
          <div class="svg-icon">
            <p>
              {$appState["user"]["followers"]["total"]}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[1em] inline"
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
          </div>
          <DotSVG />

          <p>
            {$appState["playlists"]["total"]} playlists
          </p>
        </div>

        <div class="text-xs select-text svg-icon text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-[1em] inline"
            viewBox="-33.4974 -55.829 290.3108 334.974"
            ><path
              d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"
              fill="#1DB954"
            /></svg
          >
          <span class="text-ellipsis">{$appState["user"]["id"]}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center space-x-1 px-1">
      <button
        class="bg-gray-950 text-white svg-icon {openSettings ? 'invert' : ''}"
        aria-label="settings"
        on:click={() => {
          openSettings = !openSettings;
        }}
      >
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
      </button>
      <button
        class="bg-red-500 text-black svg-icon"
        aria-label="logout"
        on:click={handleLogout}
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
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
      </button>
    </div>
  </div>

  <div class="h-[70vh] overflow-y-scroll w-[100vw]">
    <div
      class="flex flex-col justify-center items-center w-full space-y-2 pb-1"
      transition:slide={{ duration: 1000 }}
    >
      {#each $appState["playlists"]["items"] as playlist}
        <PlaylistCard {playlist} />
      {/each}
    </div>
  </div>
  <div
    class="backdrop-opacity-100 rounded-full backdrop-blur-sm w-[95vw] h-5 absolute bottom-0 left-auto right-auto"
  />
</div>

<Settings hidden={!openSettings} />
