<script lang="ts">
  import { onMount } from "svelte";
  import type { Token } from "../lib/Token";
  import { TokenStore } from "../stores/token";

  import "../styles/tables.css";
  import type { Autor, Categoria, Livro } from "../types/LivrariaTypes";
  import Loading from "./Loading.svelte";
  import { fly } from "svelte/transition";

  export let token: Token;

  let autores: Autor[] = null;

  const carregaAutores = async () => {
    autores = await token.buscarAutores();

    if (autores == null) TokenStore.set(null);
  };

  const deletaAutor = async (autor: Autor) => {
    autores = autores.filter((a) => a != autor);
    token.deletaAutor(autor);
  };

  onMount(carregaAutores);
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
    {#if autores == null}
      <tr style="text-align: center;">
        <td colspan="7">
          <Loading />
        </td>
      </tr>
    {:else if autores.length == 0}
      <tr style="text-align: center;">
        <td colspan="7">
          <h2>Sem autores cadastrados</h2>
        </td>
      </tr>
    {:else}
      {#each autores as autor}
        <tr out:fly={{ x: 100, duration: 200 }}>
          <!-- Botar os campos de cada autor -->
          <!-- Incluir um <td> com um botão que qndo clica
              deleta o autor (vide BookList.svelte) -->
        </tr>
      {/each}
    {/if}
  </tbody>
</table>
