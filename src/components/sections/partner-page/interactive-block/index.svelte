<script lang="ts">
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { cn } from '@/lib/utils';
  import List from './list.svelte';
  import Preview from './preview.svelte';

  export let partner: PartnerWithRelatedData;
  export let className: string = '';
</script>

<div class={cn(className, 'flex gap-8 xl:gap-10 justify-between')}>
  <Preview className="max-w-lg hidden xl:block sticky top-32" {partner} />
  <List className="xl:max-w-3xl" {partner} />
</div>
