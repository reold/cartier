<script lang="ts">
  export let handleUsername: Function;
  let profileLink: string = "";

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
    const username = profileUrl.pathname.split("/")[2];

    handleUsername(username);
  };
</script>

<div
  class="flex flex-col items-center text-center justify-center bg-aodFg ring-2 ring-zinc-500 rounded-md w-11/12 py-5 space-y-7 px-5"
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
        placeholder="spotify profile link"
        bind:value={profileLink}
      />
      <button class="bg-zinc-500" on:click={handleUseClipboard}
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

    <p class="text-sm">copy your profile link from your spotify account page</p>
  </div>
  <button class="hover:scale-110" on:click={handleLogin}>continue</button>
</div>
