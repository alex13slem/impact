<script lang="ts">
  import type { Contribution } from '@/lib/data/contributions';
  import { cn } from '@/lib/utils';
  import List from './list.svelte';
  import Preview from './preview.svelte';

  export let contributions: Contribution[] = [];
  export let className: string = '';
</script>

<div class={cn(className, 'flex gap-8 xl:gap-10 justify-center items-start')}>
  <Preview {contributions} />
  <List {contributions} />
</div>
