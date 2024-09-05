<script lang="ts">
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { cn } from '@/lib/utils';
  import List from './list.svelte';
  import Preview from './preview.svelte';

  export let partner: PartnerWithRelatedData = [];
  export let className: string = '';
</script>

<div class={cn(className, 'flex gap-8 xl:gap-10 justify-center items-start')}>
  <Preview {partner} />
  <List {partner} />
</div>
