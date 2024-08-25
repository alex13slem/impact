<script lang="ts">
  import type { NeedyWithCoordinates } from '@/lib/data/needys';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { cn } from '@/lib/utils';
  import { Popover } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import SvgHandHeart from '../ui/svg-hand-heart.svelte';
  import SvgPrayer from '../ui/svg-prayer.svelte';
  import NeedyPopap from './needy-popap.svelte';
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
        {#if needy.socialProgramSlug === 'nezhnie-ruki'}
          <SvgPrayer />
        {:else if needy.socialProgramSlug === 'pomozj-detyam'}
          <SvgHandHeart />
        {:else if needy.socialProgramSlug === 'socialnye-lifty'}
          <SvgHandHeart />
        {/if}
      </button>
    </Popover.Trigger>
    <Popover.Content>
      <NeedyPopap {needy} />
    </Popover.Content>
  </Popover.Root>
</div>
