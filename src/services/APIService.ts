import { Token } from "../lib/Token";

// const TOKEN_STORAGE_NAME = "token";
const API_ENDPOINT = "https://livraria-app.herokuapp.com/api/";

export type LoginData = {
  username: string;
  password: string;
};

export type Filtro = {
  [key: string]: any;
};

export class APIService {
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

    const timestamp = Date.now();

    const token = new Token(loginData.username, access, refresh, timestamp);

    return token;
  }

  public static async getResourceFiltered(
    token: Token,
    recurso: string,
    filtro?: Filtro
  ) {
    // transforma um mapa de filtros em uma string de parâmetros GET
    const filter_string = filtro
      ? Object.entries(filtro)
          .map((e) => e[0] + "=" + e[1])
          .reduce((p, c) => p + "&" + c)
      : "";

    if (!recurso.endsWith("/")) recurso += "/";

    const response = await this.FetchWithToken(
      token,
      API_ENDPOINT + recurso + filter_string,
      {}
    );

    if (response.ok) return await response.json();
    else return null;
  }

  // retorna um novo token de acesso
  public static async RefreshToken(refresh: string): Promise<string> {
    const body = {
      refresh,
    };

    const response = await fetch(API_ENDPOINT + "token/refresh/", {
      body: JSON.stringify(body),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data.refresh;
  }

  private static FetchWithToken(
    token: Token,
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    if (!init.headers) init.headers = {};
    init.headers["Authorization"] = `Bearer ${token.acesso()}`;
    return fetch(input, init ?? {});
  }
}
