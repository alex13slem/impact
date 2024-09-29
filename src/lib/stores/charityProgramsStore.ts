import { writable } from 'svelte/store';

export const filterCharityProgram = writable<string | null>(null);
