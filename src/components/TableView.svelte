<script lang="ts">
  export let columns: Array<string>;
  export let rows: Array<Array<string>>;
</script>

<table>
  <thead>
    {#each columns as col}
      <th>{col}</th>
    {/each}
  </thead>
  <tbody>
    {#each rows as row}
      <td>
        {#each row as cell}
          <td>{cell}</td>
        {/each}
      </td>
    {/each}
  </tbody>
</table>
