<script lang="ts">
  import { Button, Styles, Table } from "sveltestrap";

  import { onMount } from "svelte";
  import { TokenStore } from "../../stores/token";

  import Loading from "../Loading.svelte";
  import { Token } from "../../lib/Token";
  import type { Livro } from "../../types/LivrariaTypes";

  import { fade, fly } from "svelte/transition";

  import refreshSVG from "../../assets/refresh.svg";

  export let token: Token;

  let livros: Livro[] = null;

  const carregaLivros = async () => {
    livros = await token.buscarLivros();

    if (livros == null) TokenStore.set(null);
  };

  const deletaLivro = async (livro: Livro) => {
    livros = livros.filter((l) => l != livro);
    token.deletaLivro(livro);
  };

  onMount(carregaLivros);
</script>

<Styles />
<Table class="table">
  <thead>
    <tr>
      <th>ISBN</th>
      <th>Título</th>
      <th>Categoria</th>
      <th>Preço</th>
      <th>Quantidade</th>
      <th>Autores</th>
      <th>Editora</th>
      <th>
        <button class="refresh" on:click={carregaLivros}>
          <img src={refreshSVG} alt="" />
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    {#if livros == null}
      <tr style="text-align: center;">
        <td colspan="7">
          <Loading />
        </td>
      </tr>
    {:else if livros.length == 0}
      <tr style="text-align: center;" in:fade={{ delay: 150, duration: 100 }}>
        <td colspan="7">
          <h2 class="no-books">Sem livros cadastrados</h2>
        </td>
      </tr>
    {:else}
      {#each livros as livro}
        <tr out:fade={{ duration: 150 }}>
          <td>{livro.ISBN}</td>
          <td>{livro.titulo}</td>
          <td>{livro.categoria.nome}</td>
          <td>R$ {livro.preco.toString().replace(".", ",")}</td>
          <td>{livro.quantidade}</td>
          <td>
            <ul>
              {#each livro.autores as autor}
                <li>{autor.nome}</li>
              {/each}
            </ul>
          </td>
          <td>{livro.editora.nome}</td>
          <td>
            <Button on:click={() => deletaLivro(livro)}>X</Button>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</Table>

<style>
  :global(.table) {
    min-width: 55rem;
  }

  .no-books {
    font-size: 0.9rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }

  .refresh {
    border: none;
    background-color: transparent;
    width: 1.5rem;
  }

  .refresh img {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;

    transition: rotate 0ms ease;
  }

  .refresh img:hover {
    rotate: 360deg;
    transition: rotate 200ms ease;
  }

  @keyframes rotate {
    from {
      rotation: 0deg;
    }
    to {
      rotation: 360deg;
    }
  }
</style>
