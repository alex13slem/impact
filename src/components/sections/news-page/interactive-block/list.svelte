<script lang="ts">
  import { news } from '@/lib/data/news';
  import {
    targetCategoryId,
    targetNewsId,
  } from '@/lib/stores/newsInteractiveStore';
  import { cn } from '@/lib/utils';

  export let className: string = '';

  $: viewedNews = $targetCategoryId
    ? news.filter(item => item.categoryId === $targetCategoryId)
    : news;
</script>

<div class={cn(className, 'xl:max-w-3xl w-full')}>
  {#each viewedNews as item, idx}
    <article
      on:mouseenter={() => targetNewsId.set(item.id)}
      class="relative group"
    >
      <a href="/news/{item.slug}" class="absolute inset-0 opacity-0"
        >/news/{item.slug}</a
      >
      <header class="mb-4 flex items-start gap-5">
        <time
          datetime={item.time.toString()}
          class="text-sm px-3 py-1 border border-white rounded-full mt-1"
        >
          {item.time.toLocaleDateString('ru-RU', {
            month: 'numeric',
            day: 'numeric',
          })}
        </time>
        <h3 class="text-base lg:text-2xl font-sov-mod uppercase xl:max-w-md">
          {item.title}
        </h3>
        <svg
          class="self-baseline text-3xl mt-1 ml-auto group-hover:text-accent transition-colors hidden xl:block"
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
      </header>
      <div class="xl:max-w-xl text-sm md:text-base lg:text-lg font-thin">
        {@html item.description}
      </div>
    </article>

    {#if idx < news.length - 1}
      <hr class="my-7 border-white border-opacity-15" />
    {/if}
  {/each}
</div>
