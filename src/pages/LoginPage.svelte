<script lang="ts">
  import { Token } from "../lib/Token";
  import { TokenStore } from "../stores/token";
  import type { LoginData } from "../types/LivrariaTypes";

  let token = {} as Token;

  TokenStore.subscribe((t) => (token = t));

  const login = async (e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);

    let loginData: LoginData = {
      username: "",
      password: "",
    };

    // extrai os dados do formulário
    for (const [key, value] of formData) {
      if (key in loginData) loginData[key] = value;
      else return; // bizarrice ocorreu
    }

    let token = await Token.Login(loginData);

    TokenStore.set(token);
  };
</script>

<form on:submit|preventDefault={login} action="">
  <label for="username">Usuário</label>
  <input type="text" name="username" id="username" />
  <label for="password">Senha</label>
  <input type="password" name="password" id="password" />

  <hr />

  <input type="submit" value="Login" />
</form>

{#if token}
  {token.username}
{/if}
