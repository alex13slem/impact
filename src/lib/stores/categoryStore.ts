import { writable } from 'svelte/store';

export const filterCategory = writable<string | null>(null);
