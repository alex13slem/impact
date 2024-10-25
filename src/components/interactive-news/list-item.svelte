<script lang="ts">
  import type { NewsItem } from '@/lib/schemas/data/newsSchema';
  import { onMount } from 'svelte';

  export let item: NewsItem;
  let currentUrl: string;

  onMount(() => {
    currentUrl = window.location.href;
  });
</script>

<article
  on:mouseenter
  class="relative group py-5 first-of-type:pt-0 last-of-type:pb-0 border-b border-white/15 last-of-type:border-0"
>
  <a
    href={`/news/${item.slug}?from=${encodeURIComponent(currentUrl)}`}
    class="absolute inset-0 opacity-0">/news/{item.slug}</a
  >
  <header class="mb-2 flex items-start gap-5">
    <time
      datetime={new Date(item.date).toString()}
      class="text-xs md:text-sm px-3 py-1 border border-current rounded-full mt-1 group-hover:text-accent transition-colors"
    >
      {new Date(item.date).toLocaleDateString('ru-RU', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })}
    </time>
    <h3
      class="text-xs xs:text-sm sm:text-base md:text-2xl font-sov-mod uppercase xl:max-w-md text-accent"
    >
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
    {item.description}
  </div>
</article>
