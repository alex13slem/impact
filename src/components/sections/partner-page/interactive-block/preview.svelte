<script lang="ts">
  import { cn } from '@/lib/utils';
  import { fade } from 'svelte/transition';
  //@ts-ignore
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { targetEventSlug } from '@/lib/stores/partnerInteractiveStore';

  export let className: string = '';
  export let partner: PartnerWithRelatedData;

  $: event = partner.events?.find(item => item.slug === $targetEventSlug);
</script>

<div
  class={cn(
    'bg-white bg-opacity-60  flex-1 hidden xl:block aspect-video rounded-3xl overflow-clip mb-5 sticky top-28 transition-all',
    {
      'p-5': !event,
    },
    className,
  )}
>
  {#if event}
    <img
      transition:fade={{ duration: 100 }}
      class="w-full h-full object-cover object-center"
      src={event.image}
      alt={event.title}
    />
  {:else}
    <img
      transition:fade={{ duration: 100 }}
      src={partner.image.toString()}
      class="w-full h-full object-contain object-center"
      alt=""
    />
  {/if}
</div>
