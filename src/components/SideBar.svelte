<script lang="ts">
  import AuthorList from "./AuthorList.svelte";
  import BookList from "./BookList.svelte";
  import EditorList from "./EditorList.svelte";

  import LogoutSVG from "../assets/poweroff.svg";
  import { TokenCache } from "../services/TokenCache";
  import { TokenStore } from "../stores/token";

  export let selectedTab;
  export let setSelectedTab: (c: any) => void;
  export let tabs = [];
  export let tabImages = [];

  const logout = () => {
    TokenCache.Clear();
    TokenStore.set(null);
  };
</script>

<section class="container">
  {#each tabs as tab, i}
    <button
      class="tab"
      on:click={() => setSelectedTab(tab)}
      class:selected={tab == selectedTab}
    >
      <img draggable="false" src={tabImages[i]} alt="Aba" />
    </button>
  {/each}

  <button class="tab logout" on:click={logout}>
    <img src={LogoutSVG} alt="" />
  </button>
</section>

<style>
  .container {
    height: 100vh;

    position: fixed;
    left: 0;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;

    gap: 0.2rem;
    padding-top: 0.4rem;

    background-color: #232323;
    width: 3rem;
  }

  .container .logout {
    margin-top: auto;
    margin-bottom: 2rem;

    border-radius: 50%;
    border: none;
  }

  .tab {
    width: 90%;
    aspect-ratio: 1/1;
    margin: 0;
    background-color: white;

    margin: 0 auto;

    border: none;
    border-radius: 0.5rem;

    cursor: pointer;
    user-select: none;

    padding: 0.4rem;

    transition: box-shadow 200ms ease, scale 50ms linear,
      border-radius 100ms ease;
  }

  .tab:hover:not(.selected) {
    box-shadow: 0px 0px 10px #ffffff45;
    scale: 1.1;
  }

  .tab.selected {
    margin-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .tab img {
    width: 100%;
    height: auto;
  }

  .logout {
    padding: 0.4rem;
  }
</style>
