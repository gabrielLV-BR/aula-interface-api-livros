import { writable } from "svelte/store";
import type { Token } from "../types/AuthTypes";

export const TokenStore = writable<Token>();
