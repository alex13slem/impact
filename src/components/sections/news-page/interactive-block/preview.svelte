<script lang="ts">
  import { news } from '@/lib/data/news';
  import { targetNewsId } from '@/lib/stores/newsInteractiveStore';
  import { cn } from '@/lib/utils';

  import { fade } from 'svelte/transition';
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  import CategorySelect from './category-select.svelte';

  export let className: string = '';

  $: newsItem = news.find(item => item.id === $targetNewsId);
</script>

<div
  class={cn(
    className,
    'hidden xl:flex flex-col flex-1 self-start sticky top-28',
  )}
>
  <div class="aspect-video rounded-3xl overflow-clip mb-5">
    {#if newsItem}
      <img
        transition:fade={{ duration: 300 }}
        class="w-full h-full object-cover object-center bg-white bg-opacity-60"
        src={newsItem.image}
        alt={newsItem.title}
      />
    {:else}
      <img
        transition:fade={{ duration: 300 }}
        src={bg.src}
        class="w-full h-full object-cover object-center"
        alt=""
      />
    {/if}
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

    <CategorySelect />
  </div>
</div>
