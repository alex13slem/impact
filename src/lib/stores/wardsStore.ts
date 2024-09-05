import { writable } from 'svelte/store';
import type { PointWithCoordinates } from '../data/mapNews';

export const pointsCoordinates = writable<PointWithCoordinates[]>([]);
