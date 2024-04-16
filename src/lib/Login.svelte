<script lang="ts">
  import WakeUp from "./WakeUp.svelte";

  import { notify } from "../App.svelte";

  const onWakeup = () => {
    // auto login if userid in localstorage
    const userid = localStorage.getItem("cartier-userid");

    if (userid) {
      console.info("performing auto login for", userid);
      notify("performing auto-login", true, 5, async (destroy) => {
        await handleUsername(userid);
        destroy();
      });
    }
  };

  export let handleUsername: (username: string) => void;
  let urlInput: string = "";
  let doPerist: boolean = true;

  const handleUseClipboard = async () => {
    if (navigator.clipboard.readText)
      urlInput = await navigator.clipboard.readText();
    else notify("unable to use the clipboard", false, 0.5);
  };

  const handleLogin = () => {
    let profileUrl;

    try {
      profileUrl = new URL(urlInput);
    } catch {
      urlInput = "";
      return;
    }

    const userid = profileUrl.pathname.split("/")[2];

    if (doPerist) {
      localStorage.setItem("cartier-userid", userid);
      notify("login information saved!");
    }

    handleUsername(userid);
  };
</script>

<WakeUp handleWakeup={onWakeup} />
<div class="flex flex-col justify-center items-center">
  <div
    class="flex flex-col items-center text-center justify-center bg-foreground ring-1 ring-border rounded-md w-11/12 space-y-7 p-3 max-w-[90vw] h-full"
  >
    <p
      class="text-3xl font-black text-white border-border border-b-2 rounded-xl px-2 pb-1"
    >
      Welcome aboard!
    </p>

    <div class="flex flex-col items-center justify-center">
      <div class="w-full flex flex-row items-center justify-center space-x-2">
        <label for="spotifyprofilelinkinput">
          <input
            id="spotifyprofilelinkinput"
            type="text"
            class="w-full"
            placeholder="type Spotify profile link"
            bind:value={urlInput}
            autocomplete="url"
            aria-label="type spotify profile link"
          />
        </label>

        <button
          class="bg-background text-white ring-1 ring-border"
          on:click={handleUseClipboard}
          aria-label="paste spotify profile link from clipboard"
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

      <p class="text-xs svg-icon mt-[0.5em]">
        copy your Spotify profile link from your account page
      </p>
    </div>
    <div class="flex flex-col space-x-[0.5em]">
      <div class="flex flex-row items-center justify-center space-x-3">
        <label
          for="dopersistbtn"
          class="text-base flex flex-row space-x-2 bg-black p-2 rounded-md"
        >
          <input
            type="checkbox"
            id="dopersistbtn"
            class="inline"
            bind:checked={doPerist}
          />
          <span class="align-middle">save</span>
        </label>
        <button class="hover:scale-110" on:click={handleLogin}>continue</button>
      </div>
      <details class="text-xs w-11/12">
        <summary class="font-bold mb-2">
          Know Cartier Manager, The Free Spotify Playlist Downloader
        </summary>
        <p class="mb-4">
          Mobile-friendly, free-to-use Spotify playlist downloader. Share your
          Spotify profile link to effortlessly download all your public
          playlists.
        </p>
        <p>
          Powered by <code>spotify-dl</code> on our servers, Cartier finds and downloads
          songs from YouTube and Deezer based on Spotify data.
        </p>
      </details>
    </div>
  </div>
</div>
