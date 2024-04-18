<script lang="ts">
  import Settings from "./Settings.svelte";
  import Playlist from "./Playlist/Playlist.svelte";
  import NavBar from "./NavBar.svelte";
</script>

<div class="flex flex-col items-center justify-center">
  <Playlist />
  <Settings />
  <NavBar />
</div>
