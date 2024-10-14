<script lang="ts">
  import bg from '@/assets/img/bg.webp';
  import { cn } from '@/lib/utils';
  //@ts-ignore
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { targetEventSlug } from '@/lib/stores/partnerInteractiveStore';

  export let className: string = '';
  export let partner: PartnerWithRelatedData;

  $: event = partner.events?.find(item => item.slug === $targetEventSlug);
</script>

<div
  style="background-image: url({bg.src});"
  class={cn(
    'w-full h-fit [background-image:var(--bg)] bg-cover aspect-[4/3] rounded-3xl overflow-clip transition-all',
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
  {:else if partner.image}
    <img
      src={String(partner.image)}
      class="w-full h-full object-contain object-center"
      alt={partner.name}
    />
  {/if}
</div>
