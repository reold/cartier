<script lang="ts">
  import Login from "./lib/Login.svelte";
  import Dashboard from "./lib/Dashboard.svelte";
  import { requests } from "./server";

  import { appState } from "./store";

  const handleUsername = (username: string) => {
    requests.getUserInfo(username).then((data) => {
      if (data["success"] == false) {
        alert("something went wrong!");
        return;
      }

      $appState = { ...data["data"] };
      $appState["loggedIn"] = true;
    });
  };
</script>

<main class="w-screen h-screen text-white text-xl select-none">
  <div
    class="flex flex-row items-center justify-evenly font-bold h-[10vh] pb-2 bg-gray-950 ring-2 ring-zinc-500 shadow-xl"
  >
    <div
      class="bg-aodPurple shadow-sm shadow-gray-950 rounded-b-md p-2 ml-2 h-full flex flex-col items-center justify-center"
    >
      <span>reold's</span>
    </div>
    <p class="text-3xl">Cartier Manager</p>
  </div>
  <div
    class="w-full flex flex-col items-center justify-center h-[85vh] bg-gradient-to-t from-gray-950 via-aodBg to-aodBg"
  >
    {#if $appState["loggedIn"] == false}
      <Login {handleUsername} />
    {:else}
      <Dashboard />
    {/if}
  </div>
  <div
    class="w-full h-[5vh] bg-gray-950 text-sm flex flex-col items-center justify-center"
  >
    <p>
      {#if import.meta.env.DEV}
        <span class="rounded-sm p-0.5 bg-red-600">DEV</span>
      {:else}
        <span class="rounded-sm p-0.5 bg-blue-600">PROD</span>
      {/if}
      Built with ❤️ by
      <a href="https://github.com/reold" target="_blank" class="text-blue-600"
        >reold</a
      >.
      <a href="https://x.com/redicrafty" target="_blank" class="text-blue-600"
        >Report an error</a
      >
    </p>
  </div>
</main>
