import { writable } from 'svelte/store';
import type { WardWithCoordinates } from '../schemas/data/wardsSchema';

export const wardsCoordinates = writable<WardWithCoordinates[]>([]);
