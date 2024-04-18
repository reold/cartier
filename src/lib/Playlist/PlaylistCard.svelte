<script lang="ts">
  import { OPFS, CartierFile } from "../../store";

  import { requests } from "../../server";
  import { notify } from "../../App.svelte";

  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  interface Track {
    images: { url: string; width: number; height: number }[];
    id: string;
    name: string;
    url: string;
  }

  export let playlist: any;

  const info = writable({
    showMore: false,
    detailedLoaded: false,
    id: undefined,
    tracks: [] as Track[],

    download: {
      stage: "" as string,
      status: {} as { [id: string]: string },
      done: false,
    },

    downloading: false,

    memblobs: [] as { blob: Blob; id: string }[],
  });

  let progress = tweened(0, { duration: 1000, easing: cubicInOut });

  const toggleShowMore = async () => {
    if ($info.showMore) {
      $info.showMore = false;
    } else {
      if (!$info.detailedLoaded) await loadPlaylistInfo();
      $info.showMore = true;
    }
  };

  const loadPlaylistInfo = async () => {
    const playlistUrl = new URL(playlist["external_urls"]);
    const playlistId = playlistUrl.pathname.split("/")[2];

    notify("loading playlist information", true, 1, async (destroy) => {
      let data = await requests.getPlaylistInfo(playlistId);

      $info.tracks = data;
      $info.detailedLoaded = true;

      destroy();
    });
  };

  // save blobs in memory to user fs
  const handleSaveFs = () => {
    $info.memblobs.forEach(({ blob, id }, bi) => {
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${id}.mp3`;
      a.click();
    });
  };

  // save blobs in memory to OPFS
  const handleSave = () => {
    notify("saving to Cartier", true, 10, (destroy) => {
      const tracksDir = $OPFS.handle.tracksDir;

      $info.memblobs.forEach(async ({ blob, id }) => {
        const track = await tracksDir.getFileHandle(`${id}.mp3`, {
          create: true,
        });

        const writable = await track.createWritable();
        await writable.write(blob);
        await writable.close();
      });

      $CartierFile["playlists"] = [
        ...$CartierFile["playlists"],
        {
          name: playlist["name"],
          url: playlist["external_urls"],
          desc: playlist["description"],
          owner: playlist["owner"]["display_name"],
          tracks: [...$info.tracks.map((track) => track["id"])],
          id: playlist["id"],
        },
      ];

      destroy();
      notify("saved to Cartier!", false, 2);
    });
  };

  const handleDownloadPlaylist = async () => {
    if (!$info.detailedLoaded) await loadPlaylistInfo();
    if (!$info.tracks) return;

    if ($info.tracks.length == 0) {
      notify("nothing to download");
      return;
    }

    $info.downloading = true;
    $info.download.stage = "converting";

    progress.set(0, { duration: 1 });
    progress.set(10, { duration: 10_000 });

    let fTrack = $info.tracks[0];

    // add first song for downloading
    // and getting unique container id for tracking
    requests.getDownloadTrack(fTrack["url"], "", true).then(async (data) => {
      if (data["success"] == false) {
        $progress = 0;
        $info.downloading = false;
        notify(`serverErr: ${data["info"]}`);
        return;
      }

      const key = data["data"]["key"];
      $info.download.status[fTrack["id"]] = "downloading";

      // add remaining songs for downloading
      for (const [ti, track] of [...$info.tracks].splice(1).entries()) {
        $info.download.status[track["id"]] = "downloading";

        const data = await requests.getDownloadTrack(track["url"], key, false);

        if (data["success"] == false) {
          notify(`failed downloading track (${track["name"]})`);
        }
      }

      await progress.set(10);

      // poll server for download status of songs
      const refreshHandler = async () => {
        let data = await requests.getDownloadStatus(key);

        const convertedTracks = data["data"].filter(
          (track: { status: string; id: string }) =>
            track["status"] !== "downloading"
        );

        data["data"].forEach((track: { status: string; id: string }) => {
          $info.download.status[track["id"]] = track["status"];
        });

        $progress = (convertedTracks.length / data["data"].length) * 40 + 10;

        // download songs from server
        // when conversion is complete
        if (convertedTracks.length == data["data"].length) {
          $info.download.stage = "downloading";

          for (let i = 0; i < convertedTracks.length; i++) {
            let [ok, blob, trackid] = await requests.getStreamPlaylist(key);

            if (!ok) {
              notify(`failed downloading a track (in "${playlist["name"]}")`);
              continue;
            }

            // store song as blob in memory
            $info.memblobs = [...$info.memblobs, { blob, id: trackid }];
            $progress = ((i + 1) / convertedTracks.length) * 50 + 50;
          }
          await progress.set(100, { duration: 500 });
          $info.downloading = false;
          $info.download.done = true;

          return;
        }
        setTimeout(refreshHandler, 7500);
      };

      setTimeout(refreshHandler, 5000);
    });
  };
</script>

<div class="w-[95%]">
  <div
    class="w-full h-[15vh] rounded-md relative overflow-hidden ring-1 ring-border"
  >
    <div
      class="absolute w-full h-full rounded-md blur-[2px]"
      style={playlist["images"] && playlist["images"][0]
        ? `background-image: url('${playlist["images"][0]["url"]}');
    background-position: center;
    background-size: cover;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.6)
    `
        : "background-color: #22272E"}
    />
    <div class="absolute w-full h-full rounded-md">
      <div
        class="grid grid-cols-12 h-full grid-rows-1 items-center justify-center"
      >
        {#if playlist["images"] && playlist["images"].length > 0}
          <img
            loading="lazy"
            src={playlist["images"][0]["url"]}
            class="rounded-full max-h-[10vh] shadow-black shadow-md col-span-3 m-auto"
            alt="playlist's cover"
          />
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[10vh] h-[10vh] col-span-3 m-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        {/if}
        <div class="flex flex-col col-span-9">
          <p class="text-left truncate font-bold -mb-1">{playlist["name"]}</p>
          <p class="text-left text-xs truncate mb-2">
            {#if playlist["description"]}
              {playlist["description"]}
            {:else}
              by {playlist["owner"]["display_name"]}
            {/if}
          </p>
          <div
            class="flex flex-row justify-start items-center space-x-2 col-span-7"
          >
            <button
              class="text-xs svg-icon bg-black/20 p-0 text-white"
              on:click={toggleShowMore}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-[4ch] origin-center transition-transform duration-500 {$info.showMore
                  ? 'rotate-180'
                  : ''}"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {#if $info.download.done}
              <button
                class="text-xs svg-icon bg-green-700 text-white"
                on:click={handleSave}
              >
                save
              </button>
              <button class="text-xs svg-icon" on:click={handleSaveFs}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-[2ch]"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clip-rule="evenodd"
                  />
                </svg>

                local mp3
              </button>
            {:else}
              <button
                class="text-xs svg-icon"
                disabled={$info.downloading || $info.download.done}
                on:click={handleDownloadPlaylist}
              >
                {#if $info.downloading}
                  downloading
                {:else}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-[2ch]"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  download
                {/if}
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-primary h-[2px]" style="width: {$progress}%" />
  {#if $info.showMore}
    <div
      class="-mt-1 w-full bg-foreground ring-1 ring-border rounded-b-md text-xs flex flex-row items-center justify-center"
      transition:slide={{ duration: 500 }}
    >
      <div
        class="overflow-hidden overflow-x-scroll flex flex-row items-center space-x-2 p-2"
      >
        <p class="bg-primary rounded-full p-2 text-black">
          {$info.tracks.length} tracks
        </p>
        {#each $info.tracks as track}
          {#if track["images"] && track["images"].length > 0}
            <img
              loading="lazy"
              src={track["images"][track["images"].length - 1]["url"]}
              class="aspect-square h-[5vh] ring-1 ring-border rounded-full shadow-sm shadow-black will-change-auto
                {$info.downloading
                ? ($info.download.status[track['id']] == 'downloading'
                    ? ' rotating-image'
                    : '') +
                  ($info.download.status[track['id']] == 'ready'
                    ? 'ring-green-500'
                    : '') +
                  ($info.download.status[track['id']] == 'failed'
                    ? ' ring-red-500'
                    : '')
                : ''}
                
                "
              alt="album art"
            />
          {:else}
            <div class="shadow-md shadow-black rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-[5vh]"
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
<!-- 
<div
  class="bg-black/60 ring-1 ring-border py-2 rounded-md w-[90%] text-center relative"
  style={playlist["images"][0]
    ? `background-image: url('${playlist["images"][0]["url"]}');
    background-position: center;
    background-size: cover;
    background-blend-mode: multiply;
    `
    : ""}
>
  <div class="grid grid-cols-4 w-full gap-1">
    <div class="col-span-1 flex flex-col items-center justify-center">
      {#if playlist["images"].length > 0}
        <img
          loading="lazy"
          src={playlist["images"][0]["url"]}
          class="rounded-full max-h-[80%] shadow-black shadow-lg ring-1 ring-black"
          alt="playlist's cover"
        />
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[10%] h-[10%]"
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
        href={playlist["external_urls"]}
        target="_blank"
        >{playlist["name"]}
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
      <p class="text-xs line-clamp-1 text-gray-300">
        {playlist["description"] || `by ${playlist["owner"]["display_name"]}`}
      </p>
      <div class="flex flex-row space-x-2 mt-1">
        <button
          class="bg-transparent text-white ring-1 p-1 ring-zinc-500 hover:scale-110"
          aria-label="show more"
          on:click={toggleShowMore}
        >
          {#if $info.showMore}
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
          class="text-xs bg-primary p-1"
          disabled={$info.downloading}
          on:click={handleDownloadPlaylist}
        >
          {#if $info.downloading}
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
            {#if $info.download.stage == "downloading"}
              downloading
            {:else}
              converting
            {/if}
          {:else if $info.download.done}
            downloaded
          {:else}
            download
          {/if}
        </button>
        {#if $info.download.done}
          <button class="text-xs p-1" on:click={handleSave}>save</button>
          <button class="text-xs p-1" on:click={handleSaveFs}
            >save as mp3</button
          >
        {/if}
      </div>
    </div>
    {#if $info.showMore && Object.keys($info.tracks).length > 0}
      <div
        class="col-span-4 bg-zinc-500/10 rounded-md mx-2 text-xs
        flex flex-row justify-center max-h-[10vh]"
        transition:slide={{ duration: 250 }}
      >
        <div
          class="overflow-hidden overflow-x-scroll flex flex-row items-center space-x-2 p-1 relative"
        >
          <div class="bg-zinc-950 rounded-full text-white p-2">
            {$info.tracks.length} tracks
          </div>
          {#each $info.tracks as track}
            {#if track && track["images"].length > 0}
              <img
                loading="lazy"
                src={track["images"][track["images"].length - 1]["url"]}
                class="aspect-square h-[10vh] rounded-full ring-1 ring-black shadow-sm shadow-black will-change-auto
                {$info.downloading
                  ? ($info.download.status[track['id']] == 'downloading'
                      ? ' rotating-image'
                      : '') +
                    ($info.download.status[track['id']] == 'ready'
                      ? ' shadow-green-500 ring-green-500'
                      : '') +
                    ($info.download.status[track['id']] == 'failed'
                      ? ' shadow-red-500 ring-red-500'
                      : '')
                  : ''}
                
                "
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
                  class="w-[5%] h-[5%]"
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
  <div
    class="h-1 absolute backdrop-opacity-50 bg-aodPurple rounded-sm left-0 bottom-0 z-50"
    style="width: {($progress / 100) * 90}%"
    hidden={!$info.downloading}
  />
</div> -->
