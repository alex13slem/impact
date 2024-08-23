import { writable } from 'svelte/store';

export const hoveredRegion = writable<string | null>(null);
