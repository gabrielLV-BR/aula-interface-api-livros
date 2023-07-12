<script lang="ts">
  import LivrariaAPI, { type LoginData } from "../services/LivrariaAPI";
  import { TokenStore } from "../stores/token";
  import { Token } from "../types/AuthTypes";

  const authenticate = async (e: SubmitEvent) => {
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

    console.log(token);
  };
</script>

<form on:submit|preventDefault={authenticate} action="">
  <label for="username">Usuário</label>
  <input type="text" name="username" id="username" />
  <label for="password">Senha</label>
  <input type="text" name="password" id="password" />

  <hr />

  <input type="submit" value="Login" />
</form>
