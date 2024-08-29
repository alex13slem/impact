<script lang="ts">
  import type { Contribution } from '@/lib/data/contributions';
  import { cn } from '@/lib/utils';
  import { fade } from 'svelte/transition';
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  import { targetContributionId } from '@/lib/stores/partnerInteractiveStore';

  export let className: string = '';
  export let contributions: Contribution[] = [];

  $: contribution = contributions.find(
    item => item.id === $targetContributionId,
  );
</script>

<div
  class={cn(
    'flex-1 hidden xl:block aspect-video rounded-3xl overflow-clip mb-5 sticky top-28',
    className,
  )}
>
  {#if contribution}
    <img
      transition:fade={{ duration: 300 }}
      class="w-full h-full object-cover object-center bg-white bg-opacity-60"
      src={contribution.image}
      alt={contribution.name}
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
