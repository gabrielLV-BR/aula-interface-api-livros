<script lang="ts">
  import { TabContent, TabPane } from "sveltestrap";
  import BookAdd from "../components/book/BookAdd.svelte";
  import BookList from "../components/book/BookList.svelte";
  import { Token } from "../lib/Token";
  import type { Livro } from "../types/LivrariaTypes";
  import BookEdit from "../components/book/BookEdit.svelte";
  import { fade } from "svelte/transition";

  export let token: Token;

  let livroSendoEditado: Livro | null;

  let rerenderizar = false;

  const editaLivro = (livro: Livro) => {
    livroSendoEditado = livro;
  };

  const fecharEdicao = () => {
    livroSendoEditado = null;
    rerenderizar = !rerenderizar;
  };
</script>

<TabContent class="bunda">
  <TabPane class="pane" tabId="list" tab="Ver" active>
    {#key rerenderizar}
      <BookList {token} {editaLivro} />
    {/key}
  </TabPane>
  <TabPane class="pane" tabId="post" tab="Adicionar">
    <BookAdd {token} />
  </TabPane>
</TabContent>

{#if livroSendoEditado != null}
  <div
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 150 }}
    class="backdrop"
  />
  <BookEdit {fecharEdicao} {token} livro={livroSendoEditado} />
{/if}

<style>
  :global(.pane) {
    padding: 2rem;
  }

  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: #000000;
    opacity: 0.5;
  }
</style>
