<script lang="ts">
  import { TokenStore } from "../stores/token";

  import LivroSVG from "../assets/livros.svg";
  import AutoresSVG from "../assets/autores.svg";
  import EditorasSVG from "../assets/editoras.svg";
  import logoutSVG from "../assets/poweroff.svg";

  import type { Token } from "../lib/Token";
  import BookPage from "./BookPage.svelte";
  import AuthorPage from "./AuthorPage.svelte";
  import EditorPage from "./EditorPage.svelte";
  import { TabContent, TabPane } from "sveltestrap";
  import { TokenCache } from "../services/TokenCache";

  let selectedTab = BookPage;

  const setSelectedTab = (c: any) => {
    selectedTab = c;
  };

  export const tabs = [BookPage, AuthorPage, EditorPage];
  export const tabImages = [LivroSVG, AutoresSVG, EditorasSVG];

  const logout = () => {
    TokenCache.Clear();
    TokenStore.set(null);
  };

  let token: Token;

  TokenStore.subscribe((t) => (token = t));
</script>

<div class="container">
  <TabContent class="sidebar" vertical pills selected>
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

  <button class="logout" on:click={logout}>
    <img src={logoutSVG} alt="" />
  </button>
</div>

<style>
  .container {
    position: relative;
    padding: 0;
    margin: 0;
  }

  .container :global(.sidebar) {
    width: 100vw;
  }
  .container :global(.sidebar .tab-pane) {
    width: 100%;
  }

  .container :global(.sidebar li.nav-item > a) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .container :global(.sidebar > ul.nav) {
    border-right: 1px solid #cdcdcd;
    height: 100vh;
  }

  .logout {
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;

    position: absolute;
    left: 1.5rem;
    bottom: 1rem;
    z-index: 2;
  }

  .logout img {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }
</style>
