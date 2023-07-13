import { writable } from "svelte/store";
import { Token } from "../types/AuthTypes";

export const TokenStore = writable<Token>(Token.TryGetCachedLogin());
