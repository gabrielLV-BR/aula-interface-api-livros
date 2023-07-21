<script lang="ts">
  import type {
    Autor,
    Categoria,
    Editora,
    Livro,
  } from "../../types/LivrariaTypes";

  import closeSVG from "../../assets/close.svg";

  export let livro: Livro;
  export let fechar: () => void;
</script>

<section class="edit">
  <button class="close" on:click={fechar}>
    <img src={closeSVG} alt="Fechar" />
  </button>
  <div class="content">
    <span>
      <h1>ID</h1>
      <p>{livro.id}</p>
    </span>
    <span>
      <h1>Título</h1>
      <p>{livro.titulo}</p>
    </span>
    <span>
      <h1>ISBN</h1>
      <p>{livro.ISBN}</p>
    </span>
    <span>
      <h1>Categoria</h1>
      <p>{livro.categoria.nome}</p>
    </span>
    <span>
      <h1>Preço</h1>
      <p>R$ {livro.preco.toString()}</p>
    </span>
    <span>
      <h1>Quantidade</h1>
      <p>{livro.quantidade}</p>
    </span>
    <span>
      <h1>Autores</h1>
      <ul>
        {#each livro.autores as autor}
          <li>
            {autor.nome}
          </li>
        {/each}
      </ul>
    </span>
    <span>
      <h1>Editora</h1>
      <p>{livro.editora.nome}</p>
    </span>
  </div>
</section>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 100%;
    padding: 1rem;
  }

  .content span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    width: 100%;
  }

  .content span h1 {
    display: block;
    font-size: 1rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-weight: bold;
  }

  .content span p {
    font-size: 1.6rem;
  }

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
