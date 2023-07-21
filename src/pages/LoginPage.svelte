<script lang="ts">
  import { FormGroup, Input } from "sveltestrap";
  import { APIService, type LoginData } from "../services/APIService";
  import { TokenCache } from "../services/TokenCache";
  import { TokenStore } from "../stores/token";

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

    const token = await APIService.Login(loginData);

    TokenCache.Save(token);
    TokenStore.set(token);
  };
</script>

<main>
  <form on:submit|preventDefault={login} action="">
    <FormGroup floating label="Usuário">
      <Input type="text" name="username" />
    </FormGroup>
    <FormGroup floating label="Senha">
      <Input type="password" name="password" />
    </FormGroup>
    <hr />
    <Input class="login" type="submit" value="Login" />
  </form>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
