import type { Autor, Categoria, Editora, Livro } from "../types/LivrariaTypes";

const API_ENDPOINT = "https://livraria-app.herokuapp.com/api/";
const TOKEN_STORAGE_NAME = "token";

export type LoginData = {
  username: string;
  password: string;
};

export type Filtro = {
  [key: string]: any;
};

export class Token {
  private constructor(
    private user: string,
    private access: string,
    private refresh: string
  ) {}

  public static async Login(loginData: LoginData): Promise<Token> {
    const body = JSON.stringify(loginData);

    const response = await fetch(API_ENDPOINT + "token/", {
      body,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return null;

    const token = (await response.json()) as Token;

    localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(token));

    return token;
  }

  public static TryCachedLogin(): Token | null {
    const item = localStorage.getItem(TOKEN_STORAGE_NAME);
    return item ? JSON.parse(item) : null;
  }

  async getLivros(filtro?: Filtro): Promise<Livro[]> {
    return this.getRecursoComFiltro("livros", filtro);
  }

  async getEditoras(filtro?: Filtro): Promise<Editora[]> {
    return this.getRecursoComFiltro("editoras", filtro);
  }

  async getAutores(filtro?: Filtro): Promise<Autor[]> {
    return this.getRecursoComFiltro("autores", filtro);
  }

  async getCategorias(filtro?: Filtro): Promise<Categoria[]> {
    return this.getRecursoComFiltro("categorias", filtro);
  }

  private async getRecursoComFiltro(recurso: string, filtro?: Filtro) {
    // transforma um mapa de filtros em uma string de parâmetros GET
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

  private fetch_with_token(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    init.headers["Authenticate"] = `Bearer ${this.access}`;
    return fetch(input, init);
  }
}
