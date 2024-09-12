<script lang="ts">
  import { targetNewsId } from '@/lib/stores/newsInteractiveStore';
  import { cn } from '@/lib/utils';
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  import type { NewsItemWithRelated } from '@/lib/data/news';
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import { fade } from 'svelte/transition';
  import CategorySelect from './category-select.svelte';

  export let className: string = '';
  export let news: NewsItemWithRelated[] = [];
  export let charityPrograms: CharityProgram[] = [];

  $: newsItem = news.find(item => item.id === $targetNewsId);
</script>

<div
  class={cn(
    className,
    'hidden xl:flex flex-col flex-1 self-start sticky top-28',
  )}
>
  <div>
    <div class="rounded-3xl overflow-clip mb-5 aspect-video">
      {#if !newsItem}
        <img
          transition:fade={{ duration: 100 }}
          class="w-full h-full object-cover object-center"
          src={bg.src}
          alt={'bg'}
        />
      {:else}
        <img
          transition:fade={{ duration: 100 }}
          class="w-full h-full object-cover object-center"
          src={newsItem.image}
          alt={newsItem.title}
        />
      {/if}
    </div>
  </div>

  <div class="flex gap-4">
    <button
      class="relative border border-white rounded-xl py-3 px-5 leading-none font-thin flex gap-4"
    >
      <a href="/" class="absolute inset-0 opacity-0">/index</a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
        /></svg
      >
      На главную
    </button>

    <CategorySelect {charityPrograms} />
  </div>
</div>
