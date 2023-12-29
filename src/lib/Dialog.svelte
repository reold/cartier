<script lang="ts">
  export let hidden: boolean = false;
</script>

<div
  class="absolute top-0 left-0 w-full h-full backdrop-blur-md flex flex-col items-center justify-center text-center text-xs"
  style="visibility: {hidden ? 'hidden' : 'visible'};"
>
  <div class="bg-gray-950 p-2 rounded-md ring-1 ring-zinc-500 max-w-[90vw]">
    <slot />
  </div>
</div>
