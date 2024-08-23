<script lang="ts">
  import type { NeedyWithCoordinates } from '@/lib/data/needys';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { cn } from '@/lib/utils';
  import { Popover } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import NeedyPopap from './needy-popap.svelte';
  import SvgHandHeart from '../ui/svg-hand-heart.svelte';
  import SvgPrayer from '../ui/svg-prayer.svelte';
  export let needy: NeedyWithCoordinates;
</script>

<div
  transition:fade={{ duration: 100 }}
  class="absolute"
  style="top: {needy.y}px; left: {needy.x}px; transform: translate(-50%, -50%);"
>
  <Popover.Root>
    <Popover.Trigger>
      <button
        class={cn('hover:text-accent', {
          'text-dark': $hoveredRegion === needy.regionSlug,
        })}
      >
        {#if needy.categorySlug === 'category2'}
          <SvgPrayer />
        {:else if needy.categorySlug === 'category1'}
          <SvgHandHeart />
        {:else if needy.categorySlug === 'category3'}
          <SvgHandHeart />
        {/if}
      </button>
    </Popover.Trigger>
    <Popover.Content>
      <NeedyPopap {needy} />
    </Popover.Content>
  </Popover.Root>
</div>
