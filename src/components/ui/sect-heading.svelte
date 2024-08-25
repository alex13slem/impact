<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
</script>

<h2
  class={cn(
    'text-2xl md:text-5xl font-sov-mod uppercase leading-none mb-5 md:mb-12',
    className,
  )}
>
  <slot />
</h2>
