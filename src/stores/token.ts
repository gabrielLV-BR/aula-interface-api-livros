import { writable } from "svelte/store";
import { Token } from "../lib/Token";
import { TokenCache } from "../services/TokenCache";

export const TokenStore = writable<Token>(TokenCache.TryGet());
