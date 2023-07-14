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

  .container .logout {
    margin-top: auto;
    margin-bottom: 2rem;

    border-radius: 50%;
    border: none;
  }

  .tab {
    width: 3rem;
    height: 3rem;
    background-color: white;

    border: none;
    border-radius: 0.5rem;

    cursor: pointer;
    user-select: none;

    transition: box-shadow 400ms ease, transform 150ms ease,
      border-radius 200ms ease;
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

  .tab img {
    height: 60%;
    width: auto;
  }
</style>
