import { writable } from 'svelte/store';

export const hoveredRegion = writable<string | null>(null);
export const targetPopap = writable<string | null>(null);
export const zoomLevel = writable(0.8);
export const isPanning = writable(false);
export const offset = writable({ x: 0, y: 0 });
