<script lang="ts">
  import ListItem from "@/components/interactive-news/list-item.svelte";
  import List from "@/components/interactive-news/list.svelte";
  import Preview from "@/components/interactive-news/preview.svelte";
  import Button from "@/components/ui/button.svelte";
  import type { NewsItemWithRelated } from "@/lib/data/news";
  import type { CharityProgram } from "@/lib/schemas/data/charityProgramsSchema";
  import type { Region } from "@/lib/schemas/data/regionsSchema";
  import { cn } from "@/lib/utils";
  import { breakpointsTw } from "@/lib/utils/tailwind";
  import { breakpoints } from "@sveu/browser";
  import { newsMatchesFilters, query } from ".";
  import Selectors from "./selectors.svelte";

  const { gte } = breakpoints(breakpointsTw);
  const isDesktopPlus = gte("xl");

  export let className: string = "";
  export let news: NewsItemWithRelated[];
  export let charityPrograms: CharityProgram[];
  export let regions: Region[];

  $: viewedNews = news
    .filter((item) => newsMatchesFilters(item, $query))
    .slice(0, showAll ? Infinity : 6);

  $: viewItem = viewedNews.find((item) => item.slug === $query.item);

  let showAll = false;
</script>

{#if (!$query.hasPartner && !$query.hasWard && !$isDesktopPlus) || $isDesktopPlus}
  <section class={cn(className, "my-8 md:my-20")}>
    <div
      class={cn(className, "container flex gap-8 xl:gap-10 justify-between")}
    >
      <div class="hidden xl:contents">
        <div class="max-w-lg sticky top-32 flex flex-col h-fit w-full">
          <Preview {viewItem} />
          <Selectors {regions} {charityPrograms} />
        </div>
      </div>
      <List className="xl:max-w-3xl">
        {#each viewedNews as item (item.id)}
          <ListItem {item} on:mouseenter={() => ($query.item = item.slug)} />
        {/each}
        <Button
          variant="outline"
          className="mt-14 w-full"
          on:click={() => (showAll = !showAll)}
        >
          <p class="text-center uppercase font-sov-mod text-2xl text-accent">
            {#if showAll}
              Показать меньше
            {:else}
              Показать больше
            {/if}
          </p>
        </Button>
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
  </section>
{/if}
