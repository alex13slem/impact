import { storage } from '@sveu/browser';
import { writable } from 'svelte/store';

export const loading = writable(true);

export const mapVisible = writable(false);
export const sloganVisible = writable(false);
export const storageIntroIsSeen = storage('introIsSeen', false, {
  store: 'session',
});

export const regularLoadProcess = writable(true);
