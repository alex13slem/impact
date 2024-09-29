<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
  export let level: 1 | 2 | 3 | 4 | 5 | 6 = 2;

  const Tag = `h${level}`;
</script>

<svelte:element
  this={Tag}
  class={cn(
    'heading text-xl xs:text-2xl sm:text-3xl md:text-5xl font-sov-mod uppercase leading-none mb-5 md:mb-12',
    className,
  )}
>
  <slot />
</svelte:element>
