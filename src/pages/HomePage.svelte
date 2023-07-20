<script lang="ts">
  import { get } from "svelte/store";
  import { TokenStore } from "../stores/token";
  import BookList from "../components/BookList.svelte";
  import SideBar from "../components/SideBar.svelte";
  import EditorList from "../components/EditorList.svelte";
  import AuthorList from "../components/AuthorList.svelte";

  import LivroSVG from "../assets/livros.svg";
  import AutoresSVG from "../assets/autores.svg";
  import EditorasSVG from "../assets/editoras.svg";
  import type { Token } from "../lib/Token";
  import BookPage from "./BookPage.svelte";

  let selectedTab = BookPage;

  const setSelectedTab = (c: any) => {
    selectedTab = c;
  };

  export const tabs = [BookPage, AuthorList, EditorList];
  export const tabImages = [LivroSVG, AutoresSVG, EditorasSVG];

  let token: Token = get(TokenStore);

  TokenStore.subscribe((t) => (token = t));
</script>

<div class="container">
  <SideBar {selectedTab} {setSelectedTab} {tabs} {tabImages} />
  <main>
    {#each tabs as tab}
      <div class="wrapper" class:current={tab == selectedTab}>
        <svelte:component this={tab} {token} />
      </div>
    {/each}
  </main>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  main .wrapper {
    display: none;
    margin-left: 3rem;
  }

  main .wrapper.current {
    display: block;
    height: 100vh;
    overflow: auto;
  }
</style>
