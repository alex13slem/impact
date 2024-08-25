<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
  export let href: string = '';
  export let variant: 'light' | 'dark' = 'light';
</script>

<button
  on:click
  class={cn('rounded-2xl py-5 px-7 leading-none relative', className, {
    'bg-white text-dark': variant === 'light',
    'bg-dark text-white': variant === 'dark',
  })}
>
  {#if href}
    <a {href} class="absolute inset-0 opacity-0">link</a>
  {/if}
  <slot />
</button>
