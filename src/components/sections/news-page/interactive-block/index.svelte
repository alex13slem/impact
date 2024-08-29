<script lang="ts">
  import { cn } from '@/lib/utils';
  import List from './list.svelte';
  import Preview from './preview.svelte';

  export let className: string = '';
</script>

<div class={cn(className, 'flex gap-8 xl:gap-10 justify-center')}>
  <Preview />
  <List />
</div>
