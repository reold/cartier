<script lang="ts">
  import { requests } from "../server";
  import { notify } from "../App.svelte";
</script>

<div
  class="w-full h-[15%] bg-gray-950 text-xs flex flex-col items-center justify-center"
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
