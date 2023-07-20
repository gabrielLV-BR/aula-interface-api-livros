<script lang="ts">
  import { onMount } from "svelte";
  import type { Token } from "../lib/Token";
  import { TokenStore } from "../stores/token";

  import "../styles/tables.css";
  import type { Livro } from "../types/LivrariaTypes";
  import Loading from "./Loading.svelte";
  import { fly } from "svelte/transition";

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

<table>
  <thead>
    <th>ISBN</th>
    <th>Título</th>
    <th>Categoria</th>
    <th>Preço</th>
    <th>Quantidade</th>
    <th>Autores</th>
    <th>Editora</th>
    <th />
  </thead>
  <tbody>
    {#if livros == null}
      <tr style="text-align: center;">
        <td colspan="7">
          <Loading />
        </td>
      </tr>
    {:else if livros.length == 0}
      <tr style="text-align: center;">
        <td colspan="7">
          <h2>Sem livros cadastrados</h2>
        </td>
      </tr>
    {:else}
      {#each livros as livro}
        <tr out:fly={{ x: 100, duration: 200 }}>
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
            <button on:click={() => deletaLivro(livro)}> X </button>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>
