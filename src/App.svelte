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
  import BasicPlaylistCard from "./lib/Playlist/BasicPlaylistCard.svelte";

  import { slide } from "svelte/transition";

  import { AppState, useApp, CartierFile } from "./store";
  import { PlayerState, usePlayer } from "./player";
  import { onMount } from "svelte";

  const handleUsername = async (username: string) => {
    await useApp.login(username);
  };

  onMount(() => {
    if (!window.navigator.onLine) {
      notify("Cartier is running offline", false, 5);
      console.info("Client is offline");
    } else {
      $AppState.offline = false;
    }

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
    {#if !$AppState.logged && !$AppState.offline}
      <Tab>
        <Login {handleUsername} />
      </Tab>
    {:else if $AppState.offline}
      <div class="h-[82vh] overflow-y-scroll w-[100vw] rounded-xl">
        <div
          class="rounded-xl flex flex-col justify-center items-center w-full space-y-2 pb-[15vh] relative"
        >
          {#each $CartierFile.playlists || [] as playlist}
            <BasicPlaylistCard {playlist} />
          {:else}
            <p class="">Nothing here!</p>
            <p class="text-sm">
              There is nothing downloaded for offline use. Download content next
              time you are online.
            </p>
          {/each}
        </div>
      </div>
      <div
        style={$PlayerState.loaded ? "" : "visibility: hidden"}
        class="ring-1 ring-border rounded-md w-[95%] h-[10vh] absolute bottom-[11vh]"
      >
        <div
          class="bg-foreground rounded-t-md w-full h-full grid grid-cols-10 items-center justify-center gap-1"
        >
          <p class="truncate col-span-8">{$PlayerState.playback.name}</p>
          {#if $PlayerState.playback.playing}
            <button on:click={usePlayer.pause} class="col-span-1 svg-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          {:else}
            <button on:click={usePlayer.resume} class="col-span-1 svg-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          {/if}
          <button
            on:click={() => {
              usePlayer.next() == false
                ? notify("queue is empty")
                : usePlayer.play();
            }}
            class="col-span-1 svg-icon"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          class="bottom-0 h-[2px] bg-primary"
          style="width: {($PlayerState.playback.time /
            $PlayerState.playback.dur) *
            100}%"
        />
      </div>
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

<style>
  .svg-icon {
    @apply bg-transparent h-[100%] text-white;
  }
</style>
