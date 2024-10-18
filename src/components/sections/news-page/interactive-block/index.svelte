<script lang="ts">
  import ListItem from '@/components/interactive-news/list-item.svelte';
  import List from '@/components/interactive-news/list.svelte';
  import Preview from '@/components/interactive-news/preview.svelte';
  import { PartnerEventsItem } from '@/components/partner-events-item';
  import { WardsSlider } from '@/components/wards-slider';
  import type { NewsItemWithRelated } from '@/lib/data/news';
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import type { WardWithRelatedData } from '@/lib/data/wards';
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import type { Region } from '@/lib/schemas/data/regionsSchema';
  import { cn } from '@/lib/utils';
  import { breakpointsTw } from '@/lib/utils/tailwind';
  import { breakpoints } from '@sveu/browser';
  import {
    newsMatchesFilters,
    partnersMatchesFilters,
    query,
    wardsMatchesFilters,
  } from '.';
  import Selectors from './selectors.svelte';

  const { gte } = breakpoints(breakpointsTw);
  const isDesktopPlus = gte('xl');

  export let className: string = '';
  export let news: NewsItemWithRelated[];
  export let charityPrograms: CharityProgram[];
  export let regions: Region[];
  export let partners: PartnerWithRelatedData[];
  export let wards: WardWithRelatedData[];

  $: viewedNews = news.filter(item => newsMatchesFilters(item, $query));

  $: viewItem = viewedNews.find(item => item.slug === $query.item);
</script>

{#if (!$query.hasPartner && !$query.hasWard && !$isDesktopPlus) || $isDesktopPlus}
  <div class={cn(className, 'flex gap-8 xl:gap-10 justify-between')}>
    <div class="hidden xl:contents">
      <div class="max-w-lg sticky top-32 flex flex-col h-fit w-full">
        <Preview {viewItem} />
        <Selectors {regions} {charityPrograms} />
      </div>
    </div>
    <List className="xl:max-w-3xl">
      {#each viewedNews as item (item.slug)}
        <ListItem {item} on:mouseenter={() => ($query.item = item.slug)} />
      {/each}
      {#if viewedNews.length === 0}
        <p class="text-center uppercase font-sov-mod text-2xl text-accent">
          {#if $query.hasPartner}
            Скоро появятся новости по нашим партнерам
          {:else if $query.hasWard}
            Скоро появятся новости по нашим новым подопечным
          {:else}
            Скоро появятся новости
          {/if}
        </p>
      {/if}
    </List>
  </div>
{/if}

{#if $query.hasPartner}
  <section class="mt-16 flex flex-col gap-5">
    {#each partners
      .sort((a, b) => +!a.image - +!b.image)
      .filter(p => partnersMatchesFilters(p, $query)) as partner (partner.id)}
      <PartnerEventsItem {partner} />
    {/each}
  </section>
{/if}

{#if $query.hasWard}
  <WardsSlider
    wards={wards.filter(item => wardsMatchesFilters(item, $query))}
    className="py-16"
  />
{/if}
