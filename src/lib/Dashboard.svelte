<script lang="ts">
  import Settings from "./Settings.svelte";
  import Playlist from "./Playlist/Playlist.svelte";
  import NavBar from "./NavBar.svelte";

  import { AppState, TabKind } from "../store";

  let openSettings: boolean = false;
</script>

<div class="flex flex-col items-center justify-center">
  {#if $AppState.view.tab in [TabKind.DOWNLOADED, TabKind.PLAYLISTS]}
    <Playlist />
  {:else if $AppState.view.tab == TabKind.SETTINGS}
    <Settings />
  {/if}
  <NavBar />
</div>
