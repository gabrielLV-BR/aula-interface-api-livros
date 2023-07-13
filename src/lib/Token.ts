import { TokenStore } from "../stores/token";
import type {
  Autor,
  Categoria,
  Editora,
  Filtro,
  Livro,
  LoginData,
} from "../types/LivrariaTypes";

const API_ENDPOINT = "https://livraria-app.herokuapp.com/api/";
const TOKEN_STORAGE_NAME = "token";

//TODO expirar token, refrescá-lo se e quando possível
export class Token {
  private constructor(
    public readonly username: string,
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

    const { access, refresh } = await response.json();

    const token = new Token(loginData.username, access, refresh);

    localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(token));

    TokenStore.set(token);

    return token;
  }

  public static TryGetCachedLogin(): Token | null {
    const item = localStorage.getItem(TOKEN_STORAGE_NAME);

    if (!item) return null;

    const { username, access, refresh } = JSON.parse(item);

    return new Token(username, access, refresh);
  }

  public static Logout() {
    TokenStore.set(null);
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  }

  public async getLivros(filtro?: Filtro): Promise<Livro[]> {
    return this.getRecursoComFiltro("livros", filtro);
  }

  public async getEditoras(filtro?: Filtro): Promise<Editora[]> {
    return this.getRecursoComFiltro("editoras", filtro);
  }

  public async getAutores(filtro?: Filtro): Promise<Autor[]> {
    return this.getRecursoComFiltro("autores", filtro);
  }

  public async getCategorias(filtro?: Filtro): Promise<Categoria[]> {
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
      API_ENDPOINT + recurso + filter_string,
      {}
    );
    const data = await response.json();
    return data;
  }

  private fetch_with_token(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    if (!init.headers) init.headers = {};
    init.headers["Authorization"] = `Bearer ${this.access}`;
    return fetch(input, init ?? {});
  }
}
