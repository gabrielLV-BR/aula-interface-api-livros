<script lang="ts">
  import { get } from "svelte/store";
  import { TokenStore } from "../stores/token";
  import BookList from "../components/BookList.svelte";
  import SideBar from "../components/SideBar.svelte";

  const components = [BookList];

  let index = 0;
  const setIndex = (i: number) => {
    if (index < components.length) index = i;
  };

  let token = get(TokenStore);
</script>

<div class="container">
  <SideBar {index} {setIndex} />
  <div class="wrapper">
    <svelte:component this={components[index]} {token} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .container,
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
