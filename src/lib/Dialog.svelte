<script lang="ts">
  import { blur } from "svelte/transition";

  export let hidden: boolean = false;
</script>

{#if !hidden}
  <div
    class="absolute top-0 left-0 w-full h-full backdrop-blur-md flex flex-col items-center justify-center text-center text-xs"
    transition:blur={{ duration: 500 }}
  >
    <div
      class="bg-gray-950 p-2 rounded-md ring-1 ring-zinc-500 max-w-[90vw] flex flex-col"
    >
      <slot />
    </div>
  </div>
{/if}
