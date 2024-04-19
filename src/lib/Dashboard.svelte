<script lang="ts">
  import Settings from "./Settings.svelte";
  import Playlist from "./Playlist/Playlist.svelte";
  import NavBar from "./NavBar.svelte";

  import { PlayerState, usePlayer } from "../player";
</script>

<div class="flex flex-col items-center justify-center relative">
  <Playlist />
  <Settings />
  <div
    style={$PlayerState.playback.playing ? "" : "visibility: hidden"}
    class="bg-foreground ring-1 ring-border rounded-t-md w-[95%] h-[10vh] absolute bottom-[11vh] flex flex-row items-center justify-around"
  >
    <button on:click={usePlayer.resume}>resume</button><button
      on:click={usePlayer.pause}>pause</button
    ><button on:click={usePlayer.next}>skip</button>
  </div>
  <NavBar />
</div>
