import { writable } from 'svelte/store';

export const targetEventSlug = writable<string | null>(null);
