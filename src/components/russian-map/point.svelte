<script lang="ts">
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { cn } from '@/lib/utils';
  import { Popover } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';
  import Popap from './popap.svelte';
  import type { PointWithCoordinates } from '@/lib/data/mapNews';

  export let point: PointWithCoordinates;
</script>

<div
  transition:fade={{ duration: 100 }}
  class="absolute"
  style="top: {point.y}px; left: {point.x}px; transform: translate(-50%, -50%);"
>
  <Popover.Root>
    <Popover.Trigger>
      <button
        class={cn('hover:text-accent text-2xl', {
          'text-dark': $hoveredRegion === point.region.slug,
        })}
      >
        {#if point.slug === 'nezhnie-ruki'}
          <IconHeartHands variant="ghost" />
        {:else if point.slug === 'pomozj-detyam'}
          <IconPrayerHands variant="ghost" />
        {:else if point.slug === 'socialnye-lifty'}
          <IconSocialUp variant="ghost" />
        {/if}
      </button>
    </Popover.Trigger>
    <Popover.Content>
      <Popap {point} />
    </Popover.Content>
  </Popover.Root>
</div>
