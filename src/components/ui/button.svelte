<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
  export let href: string = '';
  export let variant: 'light' | 'dark' | 'accent' | 'outline' | 'ghost' =
    'light';
  export let external: boolean = false;
</script>

<button
  on:click
  class={cn(
    'flex items-center justify-center gap-3 text-sm md:text-base  leading-none relative',
    className,
    {
      'rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-7':
        variant !== 'ghost',
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
  {#if variant === 'ghost'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
      />
    </svg>
  {/if}
  <slot />
</button>
