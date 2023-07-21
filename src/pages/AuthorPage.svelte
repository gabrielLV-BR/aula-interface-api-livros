<script lang="ts">
  import {
    Button,
    FormGroup,
    Input,
    ListGroup,
    ListGroupItem,
    Spinner,
  } from "sveltestrap";
  import type { Token } from "../lib/Token";

  export let token: Token;
</script>

<div class="container">
  <h1>Autores</h1>
  <ListGroup class="list-group">
    {#await token.buscarAutores()}
      <ListGroupItem>
        Carregando autores
        <Spinner size="sm" />
      </ListGroupItem>
    {:then autores}
      {#each autores as autor}
        <ListGroupItem>
          {autor.nome}
        </ListGroupItem>
      {/each}
    {:catch}
      <ListGroupItem>Erro ao carregar autores.</ListGroupItem>
    {/await}
  </ListGroup>
  <hr />
  <form action="">
    <FormGroup class="form-group" floating label="Nome do autor">
      <Input label="Nome do autor" />
    </FormGroup>
    <Input type="submit" value="Adicionar autor" />
  </form>
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;

    height: 90vh;
  }

  .container h1 {
    align-self: flex-start;
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  hr {
    width: 100%;
    height: 2px;
    background-color: black;
  }

  :global(.list-group) {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  form {
    align-self: flex-start;
  }
</style>
