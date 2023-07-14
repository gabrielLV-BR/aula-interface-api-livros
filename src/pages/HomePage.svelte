<script lang="ts">
  import { get } from "svelte/store";
  import { TokenStore } from "../stores/token";
  import BookList from "../components/BookList.svelte";
  import SideBar from "../components/SideBar.svelte";
  import EditorList from "../components/EditorList.svelte";
  import AuthorList from "../components/AuthorList.svelte";

  let selectedTab = BookList;

  const setSelectedTab = (c: any) => {
    selectedTab = c;
  };

  export const tabs = [BookList, AuthorList, EditorList];
  export const tabImages = ["", "", ""];

  let token = get(TokenStore);
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

  .container,
  .container main {
    width: 100%;
    height: 100%;
  }

  main .wrapper {
    display: none;
  }

  main .wrapper.current {
    display: block;
    background-color: green;
    height: 100%;
  }
</style>
