<script lang="ts">
  import { get } from "svelte/store";
  import { TokenStore } from "../stores/token";
  import BookList from "../components/BookList.svelte";

  let token = get(TokenStore);
</script>

<BookList {token} />
