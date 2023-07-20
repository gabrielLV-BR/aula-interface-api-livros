<script lang="ts">
  import BookAdd from "../components/BookAdd.svelte";
  import BookList from "../components/BookList.svelte";
  import { Token } from "../lib/Token";

  let tab = 0;

  export let token: Token;

  const changeTab = (i: number) => (tab = i);
</script>

<div class="container">
  <section class="tabs">
    <button class="tab" class:selected={tab == 0} on:click={() => changeTab(0)}>
      Ver
    </button>
    <button class="tab" class:selected={tab == 1} on:click={() => changeTab(1)}>
      Criar
    </button>
  </section>
  <section class="content">
    {#if tab == 0}
      <BookList {token} />
    {:else if tab == 1}
      <BookAdd {token} />
    {/if}
  </section>
</div>

<style>
  .container,
  .container .tabs {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    flex-direction: column;
  }

  .container .tabs {
    border-bottom: 1px solid gray;
    width: 50vw;
    flex-direction: row;

    margin: 1rem 0;

    gap: 0.2rem;
  }

  .container .tab {
    border: none;
    padding: 0.6rem;
    width: 7rem;
    border-radius: 0.5rem 0.5rem 0 0;
    font-size: 1.1rem;

    transition: transform 100ms ease;
  }

  .container .tab.selected {
    z-index: 2;
    transform: translateY(2px);
  }
</style>
