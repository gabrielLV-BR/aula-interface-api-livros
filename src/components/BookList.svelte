<script lang="ts">
  import type { Token } from "../lib/Token";
  import { TokenStore } from "../stores/token";

  import "../styles/tables.css";
  import Loading from "./Loading.svelte";

  export let token: Token;

  const getLivros = async () => {
    const livros = await token.buscarLivros();

    if (livros == null) TokenStore.set(null);

    return livros;
  };
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
  </thead>
  <tbody>
    {#await getLivros()}
      <tr style="text-align: center;">
        <td colspan="7">
          <Loading />
        </td>
      </tr>
    {:then livros}
      {#each livros as livro}
        <tr>
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
        </tr>
      {/each}
    {:catch}
      <h1>Erro carregando os livros.</h1>
    {/await}
  </tbody>
</table>
