import { Token } from "../lib/Token";

const TOKEN_STORAGE_NAME = "token";

export class TokenCache {
  public static Save(token: Token) {
    localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(token));
  }

  public static Clear() {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  }

  public static TryGet() {
    const item = localStorage.getItem(TOKEN_STORAGE_NAME);

    if (!item) return null;

    const { username, access, refresh, creationTimestamp } = JSON.parse(item);

    const token = new Token(username, access, refresh, creationTimestamp);

    if (token.jaExpirou()) return null;
    else return token;
  }
}
