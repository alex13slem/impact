import { writable } from 'svelte/store';
import type { NeedyWithCoordinates } from '../data/needys';

export const needysCoordinates = writable<NeedyWithCoordinates[]>([]);
