<script lang="ts">
  import type { NewsItemWithRelated } from '@/lib/data/news';
  import { targetEventSlug } from '@/lib/stores/nezhieRukiInteractiveStore';
  import { cn } from '@/lib/utils';
  import { onMount } from 'svelte';

  export let className: string = '';

  export let news: NewsItemWithRelated[] = [];

  const events = news || [];
  let locationHref: string;
  onMount(() => {
    locationHref = encodeURIComponent(window.location.href);
  });
</script>

<div class={cn(className, 'xl:max-w-3xl w-full')}>
  {#each events as event, idx}
    <article
      on:mouseenter={() => targetEventSlug.set(event.slug)}
      on:mouseleave={() => targetEventSlug.set(null)}
      class="relative group"
    >
      <a
        href={`/news/${event.slug}?from=${locationHref}`}
        class="absolute inset-0 opacity-0">.</a
      >
      <header class="mb-4 flex items-start gap-5">
        <time
          datetime={new Date(event.date).toString()}
          class="text-xs md:text-sm px-3 py-1 border border-white rounded-full mt-1"
        >
          {new Date(event.date).toLocaleDateString('ru-RU', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
        <h3
          class="text-xs xs:text-sm sm:text-base md:text-2xl font-sov-mod uppercase xl:max-w-md text-accent"
        >
          {event.title}
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
        {@html event.description}
      </div>
      <svg
        class="text-3xl mt-5 ml-auto text-accent transition-colors xl:hidden"
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
    </article>

    {#if idx < events.length - 1}
      <hr class="my-7 border-white border-opacity-15" />
    {/if}
  {/each}
</div>
