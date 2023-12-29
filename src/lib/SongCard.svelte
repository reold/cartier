<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import { requests } from "../server";
  import { notify } from "../App.svelte";

  interface Playlist {
    tracks: { items: any[]; total: number };
  }

  let playlistInfo: Playlist = {} as Playlist;
  let storedBlobs: Blob[] = [];
  export let track: any;
  const downloadInfo = {
    is: false,
    id: "",
  };
  let showMore = false;
  let progress = tweened(0, { duration: 1000, easing: cubicInOut });

  const toggleShowMore = () => {
    if (showMore == false) {
      if (Object.keys(playlistInfo).length == 0) loadPlaylistInfo();
      showMore = true;
    } else {
      showMore = false;
    }
  };

  const loadPlaylistInfo = async () => {
    const playlistLink = track["external_urls"]["spotify"];
    const playlistUrl = new URL(playlistLink);
    const playlistId = playlistUrl.pathname.split("/")[2];

    notify("loading playlist info", true, 1);

    let data = await requests.getPlaylistInfo(playlistId);
    playlistInfo = data;
  };

  const handleSave = () => {
    storedBlobs.forEach((blob, bi) => {
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${track["name"]}-${bi + 1}.mp3`;
      a.click();
    });
  };

  const handleDownloadPlaylist = async () => {
    if (Object.keys(playlistInfo).length == 0) await loadPlaylistInfo();

    if (!playlistInfo["tracks"]) return;

    if (playlistInfo["tracks"]["items"].length == 0) {
      notify("nothing to download");
      return;
    }

    downloadInfo["is"] = true;

    progress.set(0, { duration: 100 });
    progress.set(100, { duration: 10_000 });

    let fTrack = playlistInfo["tracks"]["items"][0]["track"];

    requests
      .getDownloadTrack(fTrack["external_urls"]["spotify"], "", true)
      .then(async (data) => {
        if (data["success"] == false) {
          $progress = 0;
          downloadInfo["is"] = false;
          notify(`serverErr: ${data["info"]}`);
          return;
        }

        $progress = (1 / playlistInfo["tracks"]["total"]) * 100;

        const unique_code = data["data"]["unique_code"];

        for (const [ti, { track }] of playlistInfo["tracks"]["items"]
          .splice(1)
          .entries()) {
          if (track) {
            downloadInfo["id"] = track["id"];
          }
          const data = await requests.getDownloadTrack(
            track["external_urls"]["spotify"],
            unique_code,
            false
          );
          if (data["success"] == false) {
            notify(`failed downloading track (${track["name"]})`);
          }

          $progress = ((ti + 2) / playlistInfo["tracks"]["total"]) * 100;
        }

        await progress.set(100);
        await progress.set(0, { delay: 500 });
        progress.set(100, { duration: 10_000 });

        for (let i = 0; i < playlistInfo["tracks"]["total"]; i++) {
          let [ok, blob] = await requests.getStreamPlaylist(unique_code);

          if (!ok) {
            notify(`failed streaming track (${track["name"]})`);
            continue;
          }

          storedBlobs = [...storedBlobs, blob];
        }

        downloadInfo["is"] = false;
      });
  };
</script>

<div
  class="bg-gray-950 ring-1 ring-zinc-500 py-2 rounded-md w-[90vw] text-center relative transition-all duration-150"
>
  <div
    class="h-full absolute backdrop-invert brightness-50 left-0 top-0 rounded-md"
    style="width: {($progress / 100) * 90}vw"
    hidden={!downloadInfo["is"]}
  ></div>
  <div class="grid grid-cols-4 w-full gap-1">
    <div class="col-span-1 flex flex-col items-center justify-center">
      {#if track["images"].length > 0}
        <img
          loading="lazy"
          src={track["images"][0]["url"]}
          class="rounded-full max-h-[10vh] shadow-black shadow-lg ring-1 ring-black"
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
    <div class="col-span-3 flex flex-col justify-center items-start">
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
      <div class="flex flex-row space-x-2">
        <button
          class="bg-transparent text-white ring-1 p-1 ring-zinc-500"
          on:click={toggleShowMore}
        >
          {#if showMore}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="w-[1.2em] aspect-square text-xs"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="4"
              stroke="currentColor"
              class="w-[1.2em] text-xs aspect-square"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          {/if}
        </button>
        <button
          class="text-xs bg-aodPurple p-1"
          disabled={downloadInfo["is"] || storedBlobs.length > 0}
          on:click={handleDownloadPlaylist}
        >
          {#if downloadInfo["is"]}
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
        {#if storedBlobs.length > 0 && !downloadInfo["is"]}
          <button class="text-xs p-1" on:click={handleSave}>save</button>
        {/if}
      </div>
    </div>
    {#if showMore && Object.keys(playlistInfo).length > 0}
      <div
        class="col-span-4 bg-zinc-500/10 rounded-md mx-2 text-xs
        flex flex-row justify-center"
      >
        <div
          class="overflow-hidden overflow-x-scroll flex flex-row items-center space-x-2 p-1 relative"
        >
          <div class="bg-zinc-950 rounded-full text-white p-2">
            {playlistInfo["tracks"]["total"]} tracks
          </div>
          {#each playlistInfo["tracks"]["items"] as track}
            {#if track["track"]}
              <img
                loading="lazy"
                src={track["track"]["album"]["images"][0]["url"]}
                class="aspect-square h-[5vh] rounded-full ring-1 ring-black shadow-md shadow-black {track[
                  'track'
                ]['id'] == downloadInfo['id'] && downloadInfo['is']
                  ? 'animate-spin'
                  : ''}"
                alt="album"
              />
            {:else}
              <div
                class="ring-1 ring-black shadow-md shadow-black rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-[5vh] h-[5vh]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
