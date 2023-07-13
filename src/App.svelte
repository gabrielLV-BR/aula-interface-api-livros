<script>
  import HomePage from "./pages/HomePage.svelte";
  import LoginPage from "./pages/LoginPage.svelte";
  import { TokenStore } from "./stores/token";

  let estaLogado = false;

  TokenStore.subscribe((t) => {
    estaLogado = t != null;
  });
</script>

{#if estaLogado}
  <HomePage />
{:else}
  <LoginPage />
{/if}
