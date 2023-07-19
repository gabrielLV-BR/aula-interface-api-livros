<script lang="ts">
  import { onMount } from "svelte";
  import type { Token } from "../lib/Token";
  import type { Autor, Categoria, Editora } from "../types/LivrariaTypes";
  import Picker from "./Picker.svelte";

  import "../styles/forms.css";

  export let token: Token;

  let autores: Array<Autor> = [];
  let autoresEscolhidos: Array<Autor> = [];
  const pegarNomeDoAutor = (autor: Autor) => autor.nome;

  let editoras: Array<Editora> = [];
  let categorias: Array<Categoria> = [];

  function adicionarLivro(e: SubmitEvent) {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const titulo = formData.get("titulo").toString();
    const ISBN = formData.get("ISBN").toString();
    const preco = +formData.get("preco").valueOf();
    const quantidade = +formData.get("quantidade").valueOf();
    const editora = +formData.get("editora").valueOf();
    const categoria = +formData.get("categoria").valueOf();

    const livro = {
      titulo,
      ISBN,
      categoria,
      preco,
      quantidade,
      autores: autoresEscolhidos.map((a) => a.id),
      editora,
    };

    console.log(livro);

    token.adicionarLivro(livro);
  }

  onMount(async () => {
    categorias = await token.buscarCategorias();
    editoras = await token.buscarEditoras();
    autores = await token.buscarAutores();
  });
</script>

<form on:submit|preventDefault={adicionarLivro} class="form">
  <span class="campo">
    <label for="titulo">Titulo</label>
    <input
      type="text"
      minlength="1"
      name="titulo"
      placeholder="Digite o título"
    />
  </span>
  <span class="campo">
    <label for="ISBN">ISBN</label>
    <input type="text" minlength="1" name="ISBN" placeholder="Digite o ISBN" />
  </span>
  <span class="campo">
    <label for="categoria">Categoria</label>
    <select name="categoria">
      {#each categorias as categoria}
        <option value={categoria.id}>{categoria.descricao}</option>
      {/each}
    </select>
  </span>
  <span class="campo">
    <label for="preco">Preço</label>
    <input
      class="preco"
      type="number"
      min="0"
      name="preco"
      placeholder="Digite o preço"
    />
  </span>
  <span class="campo">
    <label for="quantidade">Quantidade</label>
    <input
      type="number"
      min="0"
      name="quantidade"
      placeholder="Digite a quantidade"
    />
  </span>
  <span class="campo vertical">
    <label for="autores">Autores</label>
    <Picker
      opcoes={autores}
      bind:opcoesEscolhidas={autoresEscolhidos}
      pegarNomeDaOpcao={pegarNomeDoAutor}
    />
  </span>
  <span class="campo">
    <label for="editora">Editora</label>
    <select name="editora">
      {#each editoras as editora}
        <option value={editora.id}>{editora.nome}</option>
      {/each}
    </select>
  </span>
  <input type="submit" value="Adicionar" />
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }
</style>
