import { writable } from 'svelte/store';

export const targetNewsId = writable<number | null>(null);
export const targetCategoryId = writable<number | null>(null);
