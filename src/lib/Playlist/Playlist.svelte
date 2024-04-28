<script lang="ts">
  import BasicPlaylistCard from "./BasicPlaylistCard.svelte";

  import PlaylistCard from "./PlaylistCard.svelte";

  import { AppState, CartierFile, Socket, TabKind } from "../../store";
  import type { Playlist } from "../../store";

  import { slide } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { circIn } from "svelte/easing";
  import { onMount } from "svelte";

  let tabSwitchDiv: HTMLDivElement;
  let tabSwitchDivConfig = {
    left: tweened(0, { duration: 50, easing: circIn }),
    width: tweened(0, { duration: 50, easing: circIn }),
  };

  let undownloadedPlaylists: Playlist[] = [];

  const getUndownloadedPlaylists = () => {
    if (!$CartierFile.playlists) {
      undownloadedPlaylists = $AppState.playlists.all;
      return;
    }
    undownloadedPlaylists = $AppState.playlists.all.filter((playlist) => {
      let isStored = false;

      for (let storedPlaylist of $CartierFile.playlists) {
        if (storedPlaylist.id == playlist.id) {
          isStored = true;
          break;
        }
      }

      return !isStored;
    });
  };

  onMount(getUndownloadedPlaylists);

  $: {
    if (tabSwitchDiv) {
      switch ($AppState.view.tab) {
        case TabKind.PLAYLISTS:
          tabSwitchDivConfig.left.set(0);
          tabSwitchDivConfig.width.set(
            (document.getElementById("playlistbtn") as HTMLDivElement)
              .clientWidth
          );
          break;
        case TabKind.DOWNLOADED:
          tabSwitchDivConfig.left.set(
            (document.getElementById("playlistbtn") as HTMLDivElement)
              .clientWidth
          );
          tabSwitchDivConfig.width.set(
            (document.getElementById("downloadedbtn") as HTMLDivElement)
              .clientWidth
          );
          break;
      }
    }
  }

  tabSwitchDivConfig.left.subscribe((left) => {
    if (tabSwitchDiv) tabSwitchDiv.style.left = `${left}px`;
  });

  tabSwitchDivConfig.width.subscribe((width) => {
    if (tabSwitchDiv) tabSwitchDiv.style.width = `${width}px`;
  });

  const handleSocketIO = () => {
    return;
    if ($Socket.loaded) return;

    const script = document.createElement("script");
    script.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";
    script.integrity =
      "sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO";
    script.crossOrigin = "anonymous";

    document.head.appendChild(script);

    script.onload = () => {
      $Socket.io = io(window["cartier-server-url"]);
      $Socket.loaded = true;

      $Socket.io.on("connect", () => {
        console.info(`live connection opened (${$Socket.io.id})`);

        $Socket.io.emit("login", {
          id: $AppState.user.id,
          name: $AppState.user.display_name,
        });
      });
      $Socket.io.on("disconnect", () => {
        console.info("live connection ended");
      });
    };
  };

  onMount(handleSocketIO);
</script>

<div
  class="h-[82vh] overflow-y-scroll w-[100vw]"
  style={$AppState.view.tab in [TabKind.PLAYLISTS, TabKind.DOWNLOADED]
    ? ""
    : "display: none"}
>
  <div
    class="stickytoggle z-10 sticky top-2 w-min flex flex-row items-center justify-between rounded-xl bg-foreground ring-1 ring-border mx-auto"
  >
    <div
      class="bg-border h-full absolute rounded-xl z-10"
      bind:this={tabSwitchDiv}
    />
    <button
      id="playlistbtn"
      on:click={() => ($AppState.view.tab = TabKind.PLAYLISTS)}
      >playlists</button
    ><button
      id="downloadedbtn"
      on:click={() => ($AppState.view.tab = TabKind.DOWNLOADED)}
      >downloaded</button
    >
  </div>
  <div
    class="flex flex-col justify-center items-center w-full space-y-2 pb-[11vh] relative"
  >
    <!-- in:slide={{ duration: 1000 }} -->
    {#if $AppState.view.tab == TabKind.DOWNLOADED}
      {#if !$CartierFile.playlists || $CartierFile.playlists.length == 0}
        <p class="pt-10">no downloads</p>
      {:else}
        {#each $CartierFile.playlists || [] as playlist}
          <BasicPlaylistCard {playlist} />
        {/each}
      {/if}
    {:else}
      {#each undownloadedPlaylists || [] as playlist}
        <PlaylistCard {playlist} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .stickytoggle > button {
    @apply text-white z-20 bg-transparent;
  }
</style>
