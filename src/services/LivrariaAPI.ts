import type { Token, User } from "../types/AuthTypes";
import type { Autor, Categoria, Editora, Livro } from "../types/LivrariaTypes";

const API_ENDPOINT = "https://livraria-app.herokuapp.com/api/";
const TOKEN_STORAGE_NAME = "token";

export type Filtro = {
  [key: string]: any;
};

export class LivrariaAPI {
  async autenticar(user: User): Promise<Token | null> {
    const response = await fetch(API_ENDPOINT + "token/", {
      body: JSON.stringify(user),
      method: "POST",
    });

    if (!response.ok) return null;

    const token = (await response.json()) as Token;

    localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(token));

    return token;
  }

  async getLivros(filtro?: Filtro): Promise<Autor[]> {
    return this.getRecursoComFiltro("livros", filtro);
  }

  async getEditoras(filtro?: Filtro): Promise<Autor[]> {
    return this.getRecursoComFiltro("editoras", filtro);
  }

  async getAutores(filtro?: Filtro): Promise<Autor[]> {
    return this.getRecursoComFiltro("autores", filtro);
  }

  async getCategorias(filtro?: Filtro): Promise<Categoria[]> {
    return this.getRecursoComFiltro("categorias", filtro);
  }

  async getRecursoComFiltro(recurso: string, filtro?: Filtro) {
    // transforma um mapa de filtros em uma string
    const filter_string = filtro
      ? Object.entries(filtro)
          .map((e) => e[0] + "=" + e[1])
          .reduce((p, c) => p + "&" + c)
      : "";

    if (!recurso.endsWith("/")) recurso += "/";

    const response = await this.fetch_with_token(
      API_ENDPOINT + recurso + filter_string
    );
    const data = await response.json();
    return data;
  }

  fetch_with_token(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    const item = localStorage.getItem(TOKEN_STORAGE_NAME);

    if (item) {
      const token = JSON.parse(item) as Token;

      init.headers["Authenticate"] = `Bearer ${token.access}`;
    }

    return fetch(input, init);
  }
}

export default new LivrariaAPI();
