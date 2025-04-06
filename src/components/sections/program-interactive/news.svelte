<script lang="ts">
  import ListItem from "@/components/interactive-news/list-item.svelte";
  import List from "@/components/interactive-news/list.svelte";
  import Preview from "@/components/interactive-news/preview.svelte";
  import { PROGRAMS } from "@/lib/data/hash-tables";
  import type { NewsItemWithRelated } from "@/lib/data/news";
  import { cn } from "@/lib/utils";
  import { query } from ".";

  export let className: string = "";
  export let news: NewsItemWithRelated[];
  export let program: string;

  const sortedAndFilteredNews = [...news]
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .filter(
      (n) =>
        !!n.body &&
        program === PROGRAMS["огонь жизни"] &&
        n.charityProgram.slug === program
    );

  $: viewItem = news.find((item) => item.slug === $query.item);
  let showMore = false;
</script>

<div class={cn(className, "flex gap-8 xl:gap-10 justify-between")}>
  <div class="hidden xl:contents">
    <div class="max-w-lg sticky top-32 flex flex-col h-fit w-full">
      <Preview {viewItem} />
    </div>
  </div>
  <List className="xl:max-w-3xl">
    {#each sortedAndFilteredNews.slice(0, showMore ? sortedAndFilteredNews.length : 4) as item (item.id)}
      <ListItem {item} on:mouseenter={() => ($query.item = item.slug)} />
    {/each}
    <a
      aria-label="Все новости"
      href="/news?program={program}"
      class="mt-14 flex gap-10 items-center transition-colors hover:text-accent text-white/90"
    >
      <span>Все новости</span>
      <svg
        class="self-baseline text-3xl mt-1 group-hover:text-accent transition-colors hidden xl:block"
        width="1em"
        height="0.5em"
        viewBox="0 0 35 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.1364 1L33.5 8.5M33.5 8.5L26.1364 16M33.5 8.5L-3.27835e-07 8.5"
          stroke="currentColor"
        />
      </svg>
    </a>
  </List>
</div>
