<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
  export let href: string = '';
  export let variant: 'light' | 'dark' = 'light';
  export let external: boolean = false;
</script>

<button
  on:click
  class={cn(
    'text-sm md:text-base rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-7 leading-none relative',
    className,
    {
      'bg-white text-dark': variant === 'light',
      'bg-dark text-white': variant === 'dark',
    },
  )}
>
  {#if href}
    <a
      {href}
      target={external ? '_blank' : '_self'}
      class="absolute inset-0 opacity-0">link</a
    >
  {/if}
  <slot />
</button>
