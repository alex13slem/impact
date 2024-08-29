import { writable } from 'svelte/store';

export const targetContributionId = writable<number | null>(null);
