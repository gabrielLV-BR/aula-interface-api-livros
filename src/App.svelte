<script>
  import { Styles } from "sveltestrap";
  import HomePage from "./pages/HomePage.svelte";
  import LoginPage from "./pages/LoginPage.svelte";
  import { TokenStore } from "./stores/token";

  // import "./app.css";

  let estaLogado = false;

  TokenStore.subscribe((t) => {
    estaLogado = t != null;
  });
</script>

<Styles />

{#if estaLogado}
  <HomePage />
{:else}
  <LoginPage />
{/if}
