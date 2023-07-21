<script lang="ts">
  import { Alert, Button, FormGroup, Input, Label } from "sveltestrap";
  import type { Token } from "../../lib/Token";
  import type {
    Autor,
    Categoria,
    Editora,
    Livro,
  } from "../../types/LivrariaTypes";
  import { onMount } from "svelte";
  import Picker from "../Picker.svelte";

  import closeSVG from "../../assets/close.svg";

  export let token: Token;
  export let livro: Livro;

  export let fecharEdicao: () => void;

  let autores: Array<Autor> = [];
  let autoresEscolhidos: Array<Autor> = [];
  const pegarNomeDoAutor = (autor: Autor) => autor.nome;

  let editoras: Array<Editora> = [];
  let categorias: Array<Categoria> = [];

  let status: null | "erro";

  let form: HTMLFormElement;

  async function editarLivro(e: SubmitEvent) {
    const response = await token.editarLivro(livro);

    if (!response.ok) {
      status = "erro";
      form.parentElement.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setTimeout(() => {
      status = null;
      fecharEdicao();
    }, 0);
  }

  onMount(async () => {
    categorias = await token.buscarCategorias();
    editoras = await token.buscarEditoras();
    autores = await token.buscarAutores();
  });
</script>

<section class="edit">
  <span class="top">
    <Alert
      color="danger"
      isOpen={status == "erro"}
      toggle={() => (status = null)}
    >
      Erro ao atualizar livro
    </Alert>
    <button class="close" on:click={fecharEdicao}>
      <img src={closeSVG} alt="Fechar" />
    </button>
  </span>
  <form bind:this={form} on:submit|preventDefault={editarLivro} class="form">
    <FormGroup floating label="Título">
      <Input
        name="titulo"
        bind:value={livro.titulo}
        placeholder="Digite o título"
      />
    </FormGroup>

    <FormGroup floating label="ISBN">
      <Input name="ISBN" bind:value={livro.ISBN} placeholder="Digite o ISBN" />
    </FormGroup>

    <FormGroup floating label="Categoria">
      <Input type="select" bind:value={livro.categoria} name="categoria">
        {#each categorias as categoria}
          <option
            selected={categoria.id == livro.categoria.id}
            value={categoria.id}>{categoria.descricao}</option
          >
        {/each}
      </Input>
    </FormGroup>

    <FormGroup floating label="Preço">
      <Input
        type="number"
        bind:value={livro.preco}
        name="preco"
        placeholder="Digite o preço"
      />
    </FormGroup>

    <FormGroup floating label="Quantidade">
      <Input
        type="number"
        bind:value={livro.quantidade}
        name="quantidade"
        placeholder="Digite a quantidade"
      />
    </FormGroup>

    <FormGroup floating label="Editora">
      <Input type="select" name="editora" bind:value={livro.editora}>
        {#each editoras as editora}
          <option selected={editora.id == livro.editora.id} value={editora.id}
            >{editora.nome}</option
          >
        {/each}
      </Input>
    </FormGroup>

    <div class="campo vertical">
      <Label for="autores">Autores</Label>
      <Picker
        opcoes={autores}
        bind:opcoesEscolhidas={livro.autores}
        pegarNomeDaOpcao={pegarNomeDoAutor}
      />
    </div>

    <hr />

    <Input color="primary" type="submit" value="Editar" />
  </form>
</section>

<style>
  .edit {
    display: flex;
    flex-direction: column;
    place-items: center;

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    width: 40rem;
    max-height: 80vh;
    overflow-y: auto;

    padding: 1rem;

    background-color: white;
    border-radius: 0.5rem;
  }

  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
  }

  .close {
    background: red;
    border: none;
    border-radius: 50% !important;

    width: 2rem;
    height: 2rem;
    padding: 0.2rem;

    margin-left: auto;
    align-self: flex-end;

    display: flex;
    place-items: center;
    margin-bottom: 1rem;
  }

  .close img {
    filter: invert(1);
    height: 100%;
    width: auto;
    aspect-ratio: 1/1;
  }
</style>
