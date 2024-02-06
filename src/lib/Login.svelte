<script lang="ts">
  import WakeUp from "./WakeUp.svelte";

  import { onMount } from "svelte";
  import { notify } from "../App.svelte";

  onMount(() => {
    const userid = localStorage.getItem("cartier-userid");
    console.log("performing auto login");
    if (userid) {
      notify("performing auto-login", true, 5, (destroy) => {
        handleUsername(userid, () => {
          destroy();
        });
      });
    }
  });

  export let handleUsername: Function;
  let profileLink: string = "";
  let doPersistId: boolean = true;

  const handleUseClipboard = async () => {
    if (navigator.clipboard.readText)
      profileLink = await navigator.clipboard.readText();
  };

  const handleLogin = () => {
    let profileUrl;
    try {
      profileUrl = new URL(profileLink);
    } catch {
      profileLink = "";
      return;
    }
    const userid = profileUrl.pathname.split("/")[2];

    if (doPersistId) {
      localStorage.setItem("cartier-userid", userid);
      notify("login information saved!");
    }

    handleUsername(userid);
  };
</script>

<WakeUp />
<div class="flex flex-col justify-center items-center w-full h-full">
  <div
    class="flex flex-col items-center text-center justify-center bg-zinc-950/50 ring-1 ring-zinc-500 rounded-md w-11/12 space-y-7 p-3"
  >
    <p class="text-2xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 inline"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
        />
      </svg>
      fill-in to continue
    </p>

    <div class="flex flex-col items-center justify-center">
      <div class="w-full flex flex-row items-center justify-center space-x-2">
        <input
          type="text"
          class="w-full"
          placeholder="type Spotify profile link"
          bind:value={profileLink}
          autocomplete="url"
          aria-label="type spotify profile link"
        />

        <button
          class="bg-zinc-500"
          on:click={handleUseClipboard}
          aria-label="paste from clipboard"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 inline rounded-full"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg></button
        >
      </div>

      <p class="text-xs">
        you can copy your <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-[1em] inline"
          viewBox="-33.4974 -55.829 290.3108 334.974"
          ><path
            d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"
            fill="#1DB954"
          /></svg
        >Spotify profile link from your account page
      </p>
    </div>
    <div class="flex flex-row items-center justify-center space-x-3">
      <label
        for="persisting userid"
        class="text-base flex flex-row space-x-2 bg-gray-950 p-3 rounded-md"
      >
        <input type="checkbox" class="inline" bind:checked={doPersistId} />
        <span class="align-middle">persist</span>
      </label>
      <button class="hover:scale-110" on:click={handleLogin}>continue</button>
    </div>
  </div>
  <details class="text-sm w-11/12">
    <summary class="font-bold mb-2">
      Cartier Manager: Free Spotify Playlist Downloader
    </summary>
    <p class="mb-4">
      Mobile-friendly, free-to-use Spotify playlist downloader. Share your
      Spotify profile link to effortlessly download all your public playlists.
    </p>
    <p>
      Powered by <code>spotify-dl</code> on our servers, Cartier finds and downloads
      songs from YouTube based on Spotify data.
    </p>
  </details>
</div>
