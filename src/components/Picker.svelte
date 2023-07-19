<script lang="ts">
  export let opcoes: any[];
  export let opcoesEscolhidas: any[];
  export let pegarNomeDaOpcao: (a: any) => string;

  function escolher(index: number) {
    const escolhida = opcoes[index];

    opcoes = [...opcoes.slice(0, index), ...opcoes.slice(index + 1)];
    opcoesEscolhidas = [...opcoesEscolhidas, escolhida];
  }

  function desescolher(index: number) {
    const escolhida = opcoesEscolhidas[index];

    opcoesEscolhidas = [
      ...opcoesEscolhidas.slice(0, index),
      ...opcoesEscolhidas.slice(index + 1),
    ];
    opcoes = [...opcoes, escolhida];
  }
</script>

<div class="picker">
  <div class="side left">
    {#each opcoes as option, i}
      <button on:click={() => escolher(i)} class="option"
        >{pegarNomeDaOpcao(option)}</button
      >
    {/each}
  </div>
  <div class="divider" />
  <div class="side right">
    {#each opcoesEscolhidas as option, i}
      <button on:click={() => desescolher(i)} class="option"
        >{pegarNomeDaOpcao(option)}</button
      >
    {/each}
  </div>
</div>

<style>
  .picker,
  .picker .side {
    display: flex;
  }

  .option {
    background-color: #00000020;

    padding: 0.3rem 0.4rem;

    border: none;
    border-bottom: 1px solid #665599;

    text-align: left;
    font-size: 1.1rem;

    cursor: pointer;
    transition: background-color 200ms ease;
  }

  .option:hover {
    background-color: #c4b9e6;
  }

  .picker {
    background-color: #dadada;

    overflow: hidden;

    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }

  .divider {
    display: block;
    height: 50%;
    width: 1px;
    background: black;
    margin: 0 1rem;
  }

  .picker .side {
    background: #cecece;

    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    gap: 0.3rem;

    border-radius: 0.3rem;
    padding: 0.5rem 1rem;

    max-height: 100%;
    overflow: hidden auto;
  }
</style>
