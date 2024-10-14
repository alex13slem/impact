<script lang="ts">
  import { cn } from '@/lib/utils';
  export let className: string = '';
</script>

<div class={cn(className, 'w-full')}>
  <slot />
</div>
