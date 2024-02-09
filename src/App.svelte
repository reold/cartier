<script context="module" lang="ts">
  let notifyEle: HTMLDivElement;
  let notifyDummy: HTMLDivElement;

  export const notify = (
    message: string,
    loading: boolean = false,
    duration: number = 3,
    destroyHandler?: ((destroy: () => void) => void) | undefined
  ) => {
    const newNotify: HTMLDivElement = notifyDummy.cloneNode(
      true
    ) as HTMLDivElement;

    newNotify.innerHTML = loading
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[1.2em] animate-spin inline aspect-square mr-1" > <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /> </svg>${message}`
      : message;
    newNotify.style.display = "block";

    notifyEle.appendChild(newNotify);

    if (destroyHandler) {
      destroyHandler(() => {
        notifyEle.removeChild(newNotify);
      });
    } else {
      setTimeout(() => {
        notifyEle.removeChild(newNotify);
      }, duration * 1000);
    }
  };
</script>

<script lang="ts">
  import Login from "./lib/Login.svelte";
  import Dashboard from "./lib/Dashboard.svelte";
  import { requests } from "./server";

  import { slide } from "svelte/transition";

  import { appState } from "./store";
  import { onMount } from "svelte";
  import PlaylistCard from "./lib/PlaylistCard.svelte";

  const handleUsername = (
    username: string,
    callback?: () => void | undefined
  ) => {
    requests.getUserInfo(username).then((data) => {
      if (data["success"] == false) {
        notify("something went wrong!");
        return;
      }

      $appState = { ...$appState, ...data["data"] };
      $appState["loggedIn"] = true;

      if (callback) callback();
    });
  };

  onMount(async () => {
    const root = await navigator.storage.getDirectory();

    const cartierFile = await root.getFileHandle("cartier.json", {
      create: true,
    });

    const readableCF = await cartierFile.getFile();

    // create empty json cartier file
    if (readableCF.size == 0) {
      console.log("cartier file is empty!");

      const writableCF = await cartierFile.createWritable();
      writableCF.write(
        JSON.stringify({
          info: { type: "cartier-file", version: 1 },
          playlists: [],
        })
      );
      writableCF.close();
    }
  });
</script>

<div
  class="bg-black opacity-75 p-1 rounded-md w-[80vw] max-w-[90vw] z-[1000]"
  style="display: none"
  bind:this={notifyDummy}
/>

<main class="w-screen h-screen text-white text-xl select-none text-center">
  <div
    class="flex flex-row items-center justify-evenly font-bold h-[10vh] bg-gray-950 ring-1 ring-zinc-500 shadow-xl"
  >
    <a
      href="https://github.com/reold"
      target="_blank"
      aria-label="goto reold's page"
      class="bg-aodPurple shadow-sm text-gray-950 shadow-gray-950 rounded-md p-2 ml-2 h-11/12 flex flex-col items-center justify-center"
    >
      <svg
        class="h-[0.75em]"
        viewBox="0 0 146 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.028144 14.6351C0.00946983 14.5455 0.00319455 14.4537 0.00949413 14.3623L0.935779 0.931198C0.971941 0.406861 1.40783 0 1.93341 0H27.6172C28.1215 0 28.5469 0.375536 28.6095 0.875965L29.8983 11.1865C29.9574 11.6595 29.6745 12.1085 29.2223 12.2592L26.8461 13.0513C25.7699 13.41 26.0279 15 27.1623 15H27.7891C28.2147 15 28.5937 15.2694 28.7336 15.6715L32.5 26.5L32.0196 1.51923C32.0088 0.959521 32.4596 0.5 33.0194 0.5H58.8672C59.4687 0.5 59.9341 1.02718 59.8595 1.62403L59.0947 7.7421C59.0388 8.18957 58.6903 8.54424 58.2439 8.60802L52.7135 9.39807C52.2874 9.45894 51.8702 9.24032 51.6777 8.85533L49.8879 5.27573C49.6653 4.83062 49.1493 4.61689 48.6772 4.77426L47.0077 5.33076C46.6905 5.43649 46.4472 5.69375 46.3592 6.01633L45.3445 9.73688C45.171 10.373 45.6499 11 46.3093 11H54.0723C54.7663 11 55.2493 11.6896 55.0121 12.3417L53.7538 15.8021C53.6031 16.2165 53.1988 16.4833 52.7585 16.4588L45.464 16.0536C44.9262 16.0237 44.4614 16.4251 44.4126 16.9615L44.1056 20.3387C44.0501 20.9492 44.552 21.4655 45.1638 21.4273L51.3857 21.0384C51.7624 21.0148 52.0938 20.7812 52.2425 20.4343L53.2161 18.1625C53.3856 17.7669 53.7893 17.5241 54.2183 17.5599L59.5 18L58.1458 25.6738C58.0615 26.1516 57.6463 26.5 57.161 26.5H32.5H19.3346C18.8513 26.5 18.4372 26.1544 18.3507 25.6789L17.5502 21.2759C17.5174 21.0954 17.4356 20.9275 17.3137 20.7904L15.2474 18.4658C14.6365 17.7786 13.5 18.2107 13.5 19.1302V25.5C13.5 26.0523 13.0523 26.5 12.5 26.5H3.31314C2.83946 26.5 2.43077 26.1677 2.33416 25.704L0.028144 14.6351Z"
          fill="url(#paint0_linear_2_5)"
        />
        <path
          d="M59.5 18V11.3124C59.5 11.109 59.562 10.9104 59.6778 10.7432L63.8477 4.71999C63.9475 4.57586 64.0834 4.4605 64.2418 4.38546L73.2968 0.0962621C73.4306 0.0328787 73.5768 0 73.7249 0H84.4064C84.7723 0 85.109 0.199887 85.2843 0.521148L88 5.5L88.826 1.78307C88.9277 1.32553 89.3335 1 89.8022 1H101.839C102.45 1 102.918 1.54374 102.828 2.14834L100.149 20.0041C100.067 20.553 100.447 21.0639 100.997 21.1424L106.376 21.9109C106.757 21.9653 107.136 21.796 107.35 21.4756L109.67 17.9951C109.873 17.69 110.227 17.5207 110.593 17.5539L115.5 18V1.93112C115.5 1.40648 115.905 0.971039 116.429 0.93366L129.388 0.00801164C129.462 0.00268732 129.537 0.00573536 129.611 0.0170986L141.886 1.90548C142.262 1.96336 142.573 2.22978 142.687 2.59273L145.354 11.0381C145.446 11.3298 145.4 11.6477 145.228 11.9008L136.288 25.0761C136.107 25.3423 135.809 25.5053 135.488 25.5142L118.757 25.979C118.309 25.9914 117.908 25.7049 117.774 25.2776L115.5 18L113.689 25.2425C113.578 25.6877 113.178 26 112.719 26H89.905C89.3912 26 88.9611 25.6107 88.91 25.0995L88 16L81.673 23.7871C81.5598 23.9265 81.4111 24.0328 81.2426 24.0948L72.2892 27.3934C72.1008 27.4629 71.8958 27.474 71.701 27.4252L64.4018 25.6005C64.1445 25.5361 63.9233 25.3722 63.7869 25.1448L59.5 18Z"
          fill="url(#paint1_linear_2_5)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2_5"
            x1="72.75"
            y1="0"
            x2="72.75"
            y2="27.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2_5"
            x1="72.75"
            y1="0"
            x2="72.75"
            y2="27.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </a>
    <p class="text-3xl">Cartier Manager</p>
  </div>
  <div
    class="flex flex-col space-y-1 items-center relative h-[85vh] bg-gradient-to-t from-gray-950 via-[#203A43] to-gray-950"
  >
    <div
      class="absolute left-0 top-0 w-full flex flex-col items-center justify-center space-y-1 text-xs"
      bind:this={notifyEle}
      transition:slide={{ duration: 10000 }}
    />

    {#if $appState["loggedIn"] == false}
      <Login {handleUsername} />
    {:else}
      <Dashboard />
    {/if}
  </div>
  <div
    class="w-full h-[5vh] bg-gray-950 text-xs flex flex-col items-center justify-center"
  >
    <p>
      {#if import.meta.env.DEV}
        <span class="rounded-sm p-0.5 bg-red-600">dev</span>
      {:else}
        <span class="rounded-sm p-0.5 bg-blue-600">prod</span>
      {/if}
      built by
      <a href="https://github.com/reold" target="_blank" class="text-blue-600"
        >reold</a
      >.
      <button
        aria-label="use alternative render service servers"
        class="p-0 bg-transparent text-orange-600 text-xs disabled:animate-pulse"
        on:click={async ({ target }) => {
          window["cartier-server-url"] = "https://cartier-backend.onrender.com";
          if (target) {
            target.disabled = true;
            target.innerText = "using render";
          }
          notify(
            "switching & waking alternate (render)server",
            true,
            5,
            async (destroy) => {
              await requests.getRoot();
              destroy();
              notify("(render)server running");
            }
          );
        }}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[1em] inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
          />
        </svg>
        use render</button
      >
      <a
        href="https://github.com/reold/cartier/issues/new"
        target="_blank"
        class="text-blue-600"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[1em] inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <span> report issue</span></a
      >
    </p>
  </div>
</main>
