<script lang="ts">
  import { onMount } from "svelte";
  import type { Token } from "../lib/Token";

  export let token: Token;

  const getLivros = async () => {
    return token.getLivros();
  };

  onMount(() => {
    token.getLivros().then(console.log);
  });
</script>

{#await getLivros() then livros}
  {#each livros as livro}
    <p>{livro.categoria.nome}</p>
  {/each}
{/await}
