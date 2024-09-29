<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
  export let href: string = '';
  export let variant: 'light' | 'dark' | 'accent' | 'outline' = 'light';
  export let external: boolean = false;
</script>

<button
  on:click
  class={cn(
    'flex items-center justify-center gap-3 text-sm md:text-base rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-7 leading-none relative',
    className,
    {
      'bg-white text-dark': variant === 'light',
      'bg-dark text-white': variant === 'dark',
      'bg-gradient-to-br from-gr-start via-gr-middle to-gr-end text-dark':
        variant === 'accent',
      'border border-accent': variant === 'outline',
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
