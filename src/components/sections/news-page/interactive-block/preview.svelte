<script lang="ts">
  import { cn } from '@/lib/utils';
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  import type { NewsItemWithRelated } from '@/lib/data/news';
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import type { Region } from '@/lib/schemas/data/regionsSchema';
  import { query } from '.';
  import CategorySelect from './category-select.svelte';
  import RegionSelect from './region-select.svelte';

  export let className: string = '';
  export let news: NewsItemWithRelated[] = [];
  export let charityPrograms: CharityProgram[] = [];
  export let regions: Region[] = [];

  let newsItem: NewsItemWithRelated | undefined;

  $: newsItem = news.find(item => item.slug === $query.item);
</script>

<div
  class={cn(
    className,
    'hidden xl:flex flex-col flex-1 self-start sticky top-32',
  )}
>
  <div>
    <div class="rounded-3xl overflow-clip mb-5 aspect-video">
      {#if !newsItem}
        <img
          class="w-full h-full object-cover object-center"
          src={bg.src}
          alt={'bg'}
        />
      {:else}
        <img
          class="w-full h-full object-cover object-center"
          src={newsItem.image}
          alt={newsItem.title}
        />
      {/if}
    </div>
  </div>

  <div class="flex gap-4">
    <CategorySelect {charityPrograms} />
    <RegionSelect {regions} />
  </div>
</div>
