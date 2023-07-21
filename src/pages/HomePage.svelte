<script lang="ts">
  import { TokenStore } from "../stores/token";

  import LivroSVG from "../assets/livros.svg";
  import AutoresSVG from "../assets/autores.svg";
  import EditorasSVG from "../assets/editoras.svg";

  import type { Token } from "../lib/Token";
  import BookPage from "./BookPage.svelte";
  import AuthorPage from "./AuthorPage.svelte";
  import EditorPage from "./EditorPage.svelte";
  import { TabContent, TabPane } from "sveltestrap";

  let selectedTab = BookPage;

  const setSelectedTab = (c: any) => {
    selectedTab = c;
  };

  export const tabs = [BookPage, AuthorPage, EditorPage];
  export const tabImages = [LivroSVG, AutoresSVG, EditorasSVG];

  let token: Token;

  TokenStore.subscribe((t) => (token = t));
</script>

<div class="container">
  <TabContent class="sidebar" vertical pills>
    <TabPane tabId="book" tab="Livros">
      <BookPage {token} />
    </TabPane>
    <TabPane tabId="author" tab="Autores">
      <AuthorPage {token} />
    </TabPane>
    <TabPane tabId="editor" tab="Editoras">
      <EditorPage {token} />
    </TabPane>
  </TabContent>
</div>

<style>
  .container {
    margin: 0;
    position: relative;
  }
  .container :global(.sidebar li.nav-item > a) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .container :global(.sidebar > ul.nav) {
    border-right: 1px solid #cdcdcd !important;
    height: 100vh !important;
  }
</style>
