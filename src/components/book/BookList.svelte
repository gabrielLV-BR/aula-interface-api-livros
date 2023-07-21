<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { TokenStore } from "../../stores/token";

  import Loading from "../Loading.svelte";
  import { Button, Spinner, Styles, Table } from "sveltestrap";

  import refreshSVG from "../../assets/refresh.svg";
  import editSVG from "../../assets/lapis.svg";

  import { Token } from "../../lib/Token";
  import type { Livro } from "../../types/LivrariaTypes";

  export let token: Token;

  let livros: Livro[] = null;

  export let editaLivro: (livro: Livro) => void;

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
<Table class="table table-striped table-bordered table-condensed table-hover">
  <thead>
    <tr>
      <th>ISBN</th>
      <th>Título</th>
      <th>Categoria</th>
      <th>Preço</th>
      <th>Quantidade</th>
      <th>Autores</th>
      <th>Editora</th>
      <th class="refresh-col">
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
          <Spinner color="primary" />
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
        <tr
          class="book-item"
          out:fade={{ duration: 150 }}
          on:dblclick={() => editaLivro(livro)}
        >
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
          <td class="refresh-col">
            <Button on:click={() => deletaLivro(livro)}>X</Button>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</Table>

<style>
  :global(.table) {
    margin: 1rem 0.5rem;
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

  .book-item {
    cursor: pointer;
    user-select: none;
  }

  .refresh-col {
    width: 2rem;
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
</style>
