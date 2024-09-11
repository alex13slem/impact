<script lang="ts">
  import type { NewsItemWithRelated } from '@/lib/data/news';
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import { cn } from '@/lib/utils';
  import List from './list.svelte';
  import Preview from './preview.svelte';

  export let className: string = '';
  export let news: NewsItemWithRelated[] = [];
  export let charityPrograms: CharityProgram[] = [];
</script>

<div class={cn(className, 'flex gap-8 xl:gap-10 justify-center')}>
  <Preview {news} {charityPrograms} />
  <List {news} />
</div>
