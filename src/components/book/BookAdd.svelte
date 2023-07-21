<script lang="ts">
  import { onMount } from "svelte";
  import type { Token } from "../../lib/Token";
  import type { Autor, Categoria, Editora } from "../../types/LivrariaTypes";
  import Picker from "../Picker.svelte";
  import { Alert, FormGroup, Input, Label } from "sveltestrap";

  export let token: Token;

  let autores: Array<Autor> = [];
  let autoresEscolhidos: Array<Autor> = [];
  const pegarNomeDoAutor = (autor: Autor) => autor.nome;

  let editoras: Array<Editora> = [];
  let categorias: Array<Categoria> = [];

  let disabled = false;
  let status: null | "sucesso" | "erro";

  let form: HTMLFormElement;

  async function adicionarLivro(e: SubmitEvent) {
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

    form.parentElement.scrollTo({ top: 0, behavior: "smooth" });

    const response = await token.adicionarLivro(livro);

    if (response.ok) {
      status = "sucesso";
    } else {
      status = "erro";
    }

    setTimeout(() => (status = null), 3000);
  }

  onMount(async () => {
    categorias = await token.buscarCategorias();
    editoras = await token.buscarEditoras();
    autores = await token.buscarAutores();
  });
</script>

<form bind:this={form} on:submit|preventDefault={adicionarLivro} class="form">
  <Alert
    color="success"
    isOpen={status == "sucesso"}
    toggle={() => (status = null)}
  >
    Livro adicionado com sucesso
  </Alert>

  <Alert
    color="danger"
    isOpen={status == "erro"}
    toggle={() => (status = null)}
  >
    Erro ao adicionar livro
  </Alert>
  <FormGroup floating label="Título">
    <Input {disabled} name="titulo" placeholder="Digite o título" />
  </FormGroup>

  <FormGroup floating label="ISBN">
    <Input {disabled} name="ISBN" placeholder="Digite o ISBN" />
  </FormGroup>

  <FormGroup floating label="Categoria">
    <Input {disabled} type="select" name="categoria">
      {#each categorias as categoria}
        <option value={categoria.id}>{categoria.descricao}</option>
      {/each}
    </Input>
  </FormGroup>

  <FormGroup floating label="Preço">
    <Input {disabled} type="number" name="preco" placeholder="Digite o preço" />
  </FormGroup>

  <FormGroup floating label="Quantidade">
    <Input
      {disabled}
      type="number"
      name="quantidade"
      placeholder="Digite a quantidade"
    />
  </FormGroup>

  <FormGroup floating label="Editora">
    <Input {disabled} type="select" name="editora">
      {#each editoras as editora}
        <option value={editora.id}>{editora.nome}</option>
      {/each}
    </Input>
  </FormGroup>

  <div class="campo vertical">
    <Label for="autores">Autores</Label>
    <Picker
      opcoes={autores}
      bind:opcoesEscolhidas={autoresEscolhidos}
      pegarNomeDaOpcao={pegarNomeDoAutor}
    />
  </div>

  <hr />

  <Input color="primary" {disabled} type="submit" value="Adicionar" />
</form>
