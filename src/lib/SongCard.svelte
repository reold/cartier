<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import { requests } from "../server";

  let storedBlobs: Blob[] = [];
  export let track: any;
  let isDownloading = false;
  let progress = tweened(0, { duration: 100, easing: cubicInOut });

  const handleSave = () => {
    storedBlobs.forEach((blob, bi) => {
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${track["name"]}-${bi + 1}.mp3`;
      a.click();
    });
  };

  const handleDownloadPlaylist = () => {
    isDownloading = true;

    const playlistLink = track["external_urls"]["spotify"];
    const playlistUrl = new URL(playlistLink);
    const playlistId = playlistUrl.pathname.split("/")[2];

    let totalTracks = 0;

    progress.set(25, { duration: 10_000 });

    requests.getPlaylistInfo(playlistId).then((data) => {
      totalTracks = data["tracks"]["total"];
      $progress = 25;
      const eta = totalTracks * 20 + 0.001;

      if (totalTracks > 20) {
        alert(
          `There are ${totalTracks} tracks in the playlist. It will take about ${
            eta / 60
          } minutes`
        );
      }

      progress.set(50, { duration: eta * 1000 });
      requests.getDownloadPlaylist(playlistLink).then(async (data) => {
        $progress = 50;
        progress.set(75, { duration: 10_000 });
        for (let i = 0; i < totalTracks; i++) {
          let [ok, blob] = await requests.getStreamPlaylist(
            data["data"]["unique_code"]
          );

          $progress = 75 + (i / totalTracks) * 25;
          if (!ok) {
            alert("something went wrong");
            return;
          }
          storedBlobs = [...storedBlobs, blob];
        }
        isDownloading = false;
      });
    });
  };
</script>

<div
  class="bg-gray-950 ring-2 ring-zinc-500 p-2 rounded-md w-[90vw] text-center relative"
>
  <div
    class="h-full absolute backdrop-invert brightness-50 left-0 top-0 rounded-md"
    style="width: {($progress / 100) * 90}vw"
    hidden={!isDownloading}
  ></div>
  <div class="grid grid-cols-3 w-full gap-2 p-2">
    <div class="col-span-1">
      {#if track["images"].length > 0}
        <img
          src={track["images"][0]["url"]}
          class="rounded-full max-h-[10vh]"
          alt="playlist's cover"
        />
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[10vh] h-[10vh]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      {/if}
    </div>
    <div class="col-span-2 flex flex-col justify-center items-start">
      <a
        class="hover:scale-110 duration-75 text-left line-clamp-1"
        href={track["external_urls"]["spotify"]}
        target="_blank"
        >{track["name"]}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </a>
      <p class="text-xs line-clamp-1">
        {track["description"]}
      </p>
      <div>
        <button
          class="text-xs bg-aodPurple"
          disabled={isDownloading || storedBlobs.length > 0}
          on:click={handleDownloadPlaylist}
        >
          {#if isDownloading}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 inline animate-spin"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            downloading
          {:else if storedBlobs.length > 0}
            downloaded
          {:else}
            download
          {/if}
        </button>
        {#if storedBlobs.length > 0 && !isDownloading}
          <button class="text-xs" on:click={handleSave}>save</button>
        {/if}
      </div>
    </div>
  </div>
</div>
