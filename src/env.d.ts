/// <reference path="../.astro/types.d.ts" />
/// <reference types="../.astro/@astro/superforms.d.ts" />
declare module '*.webp';
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    'on:outclick'?: (event: CustomEvent<any>) => void;
  }
}
