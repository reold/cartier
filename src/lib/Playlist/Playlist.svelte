<script lang="ts">
  import PlaylistCard from "./PlaylistCard.svelte";

  import { slide } from "svelte/transition";
  import { AppState, TabKind } from "../../store";
  import { tweened } from "svelte/motion";
  import { circIn } from "svelte/easing";

  let tabSwitchDiv: HTMLDivElement;
  let tabSwitchDivConfig = {
    left: tweened(0, { duration: 50, easing: circIn }),
    width: tweened(0, { duration: 50, easing: circIn }),
  };

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
</script>

<div class="h-[82vh] overflow-y-scroll w-[100vw]">
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
    class="flex flex-col justify-center items-center w-full space-y-2 pb-1 relative"
    in:slide={{ duration: 1000 }}
  >
    {#if $AppState.view.tab == TabKind.PLAYLISTS}
      {#each $AppState["playlists"]["all"] || [] as playlist}
        <PlaylistCard {playlist} />
      {/each}
    {:else if $AppState.view.tab == TabKind.DOWNLOADED}
      {#if !$AppState["playlists"]["downloaded"] || $AppState["playlists"]["downloaded"].length == 0}
        <p class="pt-10">no downloads</p>
      {:else}
        {#each $AppState["playlists"]["downloaded"] || [] as playlist}
          <PlaylistCard {playlist} />
        {/each}
      {/if}
    {/if}
  </div>
</div>

<style>
  .stickytoggle > button {
    @apply text-white z-20 bg-transparent;
  }
</style>
