<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
</script>

<span
  class={cn(
    'text-transparent bg-clip-text bg-gradient-to-br from-gr-start via-gr-middle to-gr-end',
    className,
  )}
>
  <slot />
</span>
