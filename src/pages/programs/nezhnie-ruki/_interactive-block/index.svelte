<script lang="ts">
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { cn } from '@/lib/utils';
  import List from './list.svelte';
  import Preview from './preview.svelte';
  import type { NewsItemWithRelated } from '@/lib/data/news';

  export let news: NewsItemWithRelated[] = [];
  export let className: string = '';
</script>

<div class={cn(className, 'flex gap-8 xl:gap-10 justify-center items-start')}>
  <Preview {news} />
  <List {news} />
</div>
