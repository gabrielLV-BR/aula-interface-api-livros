<script lang="ts">
  import { onMount } from "svelte";
  import type { Token } from "../lib/Token";
  import type { Autor, Categoria, Editora } from "../types/LivrariaTypes";
  import Picker from "./Picker.svelte";

  export let token: Token;

  let autores: Array<Autor> = [];
  let autoresEscolhidos: Array<Autor> = [];
  const pegarNomeDoAutor = (autor: Autor) => autor.nome;

  let categorias: Array<Categoria> = [];
  let categoriasEscolhidas: Array<Categoria> = [];
  const pegarNomeDaCategoria = (categoria: Categoria) => categoria.descricao;

  let editoras: Array<Editora> = [];

  function adicionarLivro(e: SubmitEvent) {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const titulo = formData.get("titulo").toString();
    const ISBN = formData.get("ISBN").toString();
    const categoria = formData.get("categoria").toString();
    const preco = +formData.get("preco").valueOf();
    const quantidade = +formData.get("quantidade").valueOf();
    const autores = formData.get("autores").valueOf();
    const editora = +formData.get("editora").valueOf();

    const livro = {
      id: 0,
      titulo,
      ISBN,
      categoria,
      preco,
      quantidade,
      autores,
      editora,
    };

    token.adicionarLivro(livro);
  }

  onMount(async () => {
    categorias = await token.buscarCategorias();
    editoras = await token.buscarEditoras();
    autores = await token.buscarAutores();
  });
</script>

<form on:submit|preventDefault={adicionarLivro} class="add">
  <span class="campo">
    <label for="titulo">Titulo</label>
    <input type="text" name="titulo" placeholder="Digite o título" />
  </span>
  <span class="campo">
    <label for="ISBN">ISBN</label>
    <input type="text" name="ISBN" placeholder="Digite o ISBN" />
  </span>
  <span class="campo vertical">
    <label for="categoria">Categoria</label>
    <Picker
      opcoes={categorias}
      opcoesEscolhidas={categoriasEscolhidas}
      pegarNomeDaOpcao={pegarNomeDaCategoria}
    />
  </span>
  <span class="campo">
    <label for="preco">Preco</label>
    <input
      class="preco"
      type="number"
      name="preco"
      placeholder="Digite o preço"
    />
  </span>
  <span class="campo">
    <label for="quantidade">Quantidade</label>
    <input type="number" name="quantidade" placeholder="Digite a quantidade" />
  </span>
  <span class="campo vertical">
    <label for="autores">Autores</label>
    <Picker
      opcoes={autores}
      opcoesEscolhidas={autoresEscolhidos}
      pegarNomeDaOpcao={pegarNomeDoAutor}
    />
    <input type="text" name="autores" />
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
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }

  .campo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-radius: 1rem;
    background-color: #dadadc;

    min-width: 8rem;
    height: 3rem;

    overflow: hidden;

    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }

  .campo.vertical {
    flex-direction: column;
    height: 20rem;
  }

  .campo label {
    justify-self: flex-start;
    margin: 0.4rem;
    margin-left: 0.5rem;

    width: fit-content;
  }

  .campo input[type="text"],
  .campo input[type="number"] {
    justify-self: flex-end;
    margin: 0;
    border: none;

    height: 100%;
    width: 70%;
    background-color: transparent;

    padding: 0.5rem;
    overflow-x: auto;

    transition: background-color 200ms ease;
  }

  .campo input:hover {
    background-color: #00000020;
  }

  .campo input:focus {
    background-color: #00000040;
    outline: none;
  }

  .campo select {
    padding: 0.5rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #bdadfd;
  }
</style>
