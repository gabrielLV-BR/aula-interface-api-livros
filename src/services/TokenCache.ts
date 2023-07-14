import type { Token } from "../lib/Token";

const TOKEN_STORAGE_NAME = "token";

class TokenCache {
  public static Cache(token: Token) {
    localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(token));
  }

  public static GetCached() {}
}

export default new TokenCache();
