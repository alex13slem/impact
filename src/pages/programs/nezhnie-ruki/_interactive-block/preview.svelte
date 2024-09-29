<script lang="ts">
  import bg from '@/assets/img/bg.webp';
  import { cn } from '@/lib/utils';
  //@ts-ignore
  import type { NewsItemWithRelated } from '@/lib/data/news';
  import { targetEventSlug } from '@/lib/stores/nezhieRukiInteractiveStore';

  export let className: string = '';
  export let news: NewsItemWithRelated[] = [];

  $: event = news?.find(item => item.slug === $targetEventSlug);
</script>

<div
  style="background-image: url({bg.src});"
  class={cn(
    '[background-image:var(--bg)] bg-cover flex-1 hidden xl:block aspect-video rounded-3xl overflow-clip mb-5 sticky top-28 transition-all',
    {
      'p-5': !event,
    },
    className,
  )}
>
  {#if event}
    <img
      class="w-full h-full object-cover object-center"
      src={event.image}
      alt={event.title}
    />
  {/if}
</div>
