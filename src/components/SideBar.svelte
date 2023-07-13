<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let index: number;
  export let setIndex: (i: number) => void;

  let names = ["A", "B", "C"];
</script>

<section class="container">
  {#each [0, 1, 2] as i}
    <button
      class="tab"
      class:selected={i == index}
      on:click={() => setIndex(i)}
    >
      <p>A</p>
    </button>
  {/each}
</section>

<style>
  .container {
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;

    gap: 0.4rem;
    padding-top: 0.4rem;
    padding-right: 0.2rem;

    background-color: #232323;
    width: 4rem;
  }

  .tab {
    width: 3rem;
    height: 3rem;
    background-color: white;

    border-radius: 0.5rem;

    cursor: pointer;
    user-select: none;

    transition: box-shadow 400ms ease, transform 150ms ease;
  }

  .tab:hover:not(.selected) {
    box-shadow: 0px 0px 10px #ffffff45;
    transform: scale(1.1);
  }

  .tab.selected {
    padding-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(5px);
  }
</style>
