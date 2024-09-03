<script lang="ts">
  import type { WardWithCoordinates } from '@/lib/schemas/data/wardsSchema';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { cn } from '@/lib/utils';
  import { Popover } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';
  import WardPopap from './ward-popap.svelte';

  export let ward: WardWithCoordinates;
</script>

<div
  transition:fade={{ duration: 100 }}
  class="absolute"
  style="top: {ward.y}px; left: {ward.x}px; transform: translate(-50%, -50%);"
>
  <Popover.Root>
    <Popover.Trigger>
      <button
        class={cn('hover:text-accent text-2xl', {
          'text-dark': $hoveredRegion === ward.region.slug,
        })}
      >
        {#if ward.charityProgram.slug === 'nezhnie-ruki'}
          <IconHeartHands variant="ghost" />
        {:else if ward.charityProgram.slug === 'pomozj-detyam'}
          <IconPrayerHands variant="ghost" />
        {:else if ward.charityProgram.slug === 'socialnye-lifty'}
          <IconSocialUp variant="ghost" />
        {/if}
      </button>
    </Popover.Trigger>
    <Popover.Content>
      <WardPopap {ward} />
    </Popover.Content>
  </Popover.Root>
</div>
