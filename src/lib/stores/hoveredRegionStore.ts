import { writable } from 'svelte/store';

export const hoveredRegion = writable<string | null>(null);
export const targetPopap = writable<string | null>(null);
