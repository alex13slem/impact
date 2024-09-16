<script lang="ts">
  import { targetNewsId } from '@/lib/stores/newsInteractiveStore';
  import { cn } from '@/lib/utils';
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  import ButtonBack from '@/components/ui/button-back.svelte';
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
    <ButtonBack href="/">На главную</ButtonBack>

    <CategorySelect {charityPrograms} />
  </div>
</div>
