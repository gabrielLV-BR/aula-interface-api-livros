import { Token } from "../lib/Token";

const TOKEN_STORAGE_NAME = "token";

export class TokenCache {
  public static Save(token: Token) {
    localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(token));
  }

  public static TryGet() {
    const item = localStorage.getItem(TOKEN_STORAGE_NAME);

    if (!item) return null;

    const { username, access, refresh } = JSON.parse(item);

    return new Token(username, access, refresh);
  }
}
