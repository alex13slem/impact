<script lang="ts">
  import { cn } from '@/lib/utils';

  export let isActive: boolean = false;
</script>

<button
  {...$$restProps}
  on:click
  class={cn(
    'border text-left border-current text-accent rounded-xl px-3 py-2 md:py-3 md:px-4 leading-none backdrop-blur bg-dark/30  xl:hover:bg-accent xl:hover:text-dark transition-colors',
    {
      'bg-gradient-to-br from-gr-start via-gr-middle to-gr-end text-dark':
        isActive,
    },
    $$props.class,
  )}
>
  <slot />
</button>
