<script lang="ts">
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  import type { NewsItem } from '@/lib/schemas/data/newsSchema';
  import { cn } from '@/lib/utils';

  export let className: string = '';

  export let viewItem: NewsItem | undefined;
</script>

<div class={cn(className, 'rounded-3xl overflow-clip mb-5 aspect-[4/3] h-fit')}>
  {#if !viewItem}
    <img
      class="w-full h-full object-cover object-center"
      src={bg.src}
      alt={'bg'}
    />
  {:else}
    <img
      class="w-full h-full object-cover object-center"
      src={viewItem.image}
      alt={viewItem.title}
    />
  {/if}
</div>
