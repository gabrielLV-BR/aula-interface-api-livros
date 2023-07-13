import { writable } from "svelte/store";
import { Token } from "../lib/Token";

export const TokenStore = writable<Token>(Token.TryGetCachedLogin());
