<script lang="ts">
  import ListItem from "@/components/interactive-news/list-item.svelte";
  import List from "@/components/interactive-news/list.svelte";
  import Preview from "@/components/interactive-news/preview.svelte";
  import type { NewsItem } from "@/lib/schemas/data/newsSchema";
  import { cn } from "@/lib/utils";
  import { query } from ".";

  export let className: string = "";
  export let news: NewsItem[];

  const sortedNews = [...news].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  sortedNews.forEach((newsItem) => {
    console.log(newsItem.date);
    console.log(new Date(newsItem.date).getTime());
  });

  $: viewItem = news.find((item) => item.slug === $query.item);
</script>

<div class={cn(className, "flex gap-8 xl:gap-10 justify-between")}>
  <div class="hidden xl:contents">
    <div class="max-w-lg sticky top-32 flex flex-col h-fit w-full">
      <Preview {viewItem} />
    </div>
  </div>
  <List className="xl:max-w-3xl">
    {#each sortedNews as item (item.id)}
      <ListItem {item} on:mouseenter={() => ($query.item = item.slug)} />
    {/each}
  </List>
</div>
