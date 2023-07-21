<script lang="ts">
  import { TabContent, TabPane } from "sveltestrap";
  import BookAdd from "../components/book/BookAdd.svelte";
  import BookList from "../components/book/BookList.svelte";
  import { Token } from "../lib/Token";

  export let token: Token;
</script>

<main>
  <TabContent class="bunda">
    <TabPane tabId="list" tab="Ver" active>
      <div class="container">
        <BookList {token} />
      </div>
    </TabPane>
    <TabPane tabId="post" tab="Adicionar">
      <div class="container">
        <BookAdd {token} />
      </div>
    </TabPane>
  </TabContent>
</main>

<style>
  main {
    padding: 2rem;
  }

  .container {
    padding: 2rem;
    overflow: auto;
    max-height: 90vh;
  }
</style>
