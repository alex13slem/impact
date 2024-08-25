import { writable } from 'svelte/store';

export const filterSocialProgram = writable<string | null>(null);
