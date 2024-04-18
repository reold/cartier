<script lang="ts">
  import { notify } from "../../App.svelte";
  import { CartierFile } from "../../store";
  import type { BasicPlaylist } from "../../store";

  export let playlist: BasicPlaylist;

  const handleRemovePlaylist = () => {
    let playlists = $CartierFile.playlists;
    playlists.splice($CartierFile.playlists.indexOf(playlist), 1);

    $CartierFile.playlists = playlists;

    notify(`removed "${playlist.name}" from downloads`, false, 2);
  };
</script>

<div
  class="bg-green-600 ring-1 ring-border w-[95%] rounded-md min-h-[15vh] max-h-[20vh] text-xs grid grid-cols-5"
>
  <div
    class="flex flex-col items-center justify-center space-x-2 col-span-2 row-span-2"
  >
    <p class="text-xl font-bold">
      {playlist.name}
    </p>
    <p class="-mt-1">by {playlist.owner}</p>
  </div>
  <ol
    class="ring-1 ring-border col-span-3 p-2 rounded-t-md bg-foreground overflow-x-hidden overflow-y-scroll"
  >
    {#each playlist.tracks as track}
      <li class="truncate">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-[2ch] inline mr-1"
        >
          <path
            fill-rule="evenodd"
            d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
            clip-rule="evenodd"
          />
        </svg>{track.name}
      </li>
    {/each}
  </ol>
  <!-- play -->
  <button
    class="svg-icon ring-1 ring-border p-0 text-xs rounded-none rounded-bl-md"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-[2em]"
    >
      <path
        fill-rule="evenodd"
        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
  <!-- add to queue -->
  <button class="svg-icon ring-1 ring-border p-0 text-xs rounded-none"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-[2em]"
    >
      <path
        d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"
      />
    </svg>
  </button>
  <!-- remove playlist -->
  <button
    class="svg-icon ring-1 ring-border bg-red-500 text-white p-0 text-xs rounded-none rounded-br-md"
    on:click={handleRemovePlaylist}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-[2em]"
    >
      <path
        fill-rule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</div>

<style>
  .stickytoggle > button {
    @apply text-white z-20 bg-transparent;
  }
</style>
