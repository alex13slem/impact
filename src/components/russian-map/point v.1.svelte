<script lang="ts">
  import type { PointWithCoordinates } from '@/lib/data/mapNews';
  import {
    hoveredRegion,
    targetPopap,
    zoomLevel,
  } from '@/lib/stores/hoveredRegionStore';
  import { cn } from '@/lib/utils';
  import { Popover } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';
  import Popap from './popap.svelte';

  export let point: PointWithCoordinates;
  export let className: string = '';
  export let style = '';
</script>

<div
  transition:fade={{ duration: 100 }}
  class="absolute"
  style={`top: ${point.y}px; left: ${point.x}px; transform: translate(-50%, -50%);` +
    style}
>
  <Popover.Root
    onOpenChange={open => {
      if (open) {
        $targetPopap = point.id;
        $hoveredRegion = point.region.slug;
      } else {
        $targetPopap = null;
        $hoveredRegion = null;
      }
    }}
  >
    <Popover.Trigger asChild let:builder>
      <button
        use:builder.action
        {...builder}
        style={`font-size: ${100 + ($zoomLevel - 10) * 8.89}px;`}
        class={cn(
          'text-white animate-pulse [animation-delay:calc(var(--i)*.1s)] transition-opacity',
          className,
          {
            'text-accent  animate-none': $targetPopap === point.id,
          },
        )}
        {...$$restProps}
      >
        {#if point.charityProgramSlug === 'nezhnie-ruki'}
          <IconHeartHands variant="ghost" />
        {:else if point.charityProgramSlug === 'pomozj-detyam'}
          <IconPrayerHands variant="ghost" />
        {:else if point.charityProgramSlug === 'socialnye-lifty'}
          <IconSocialUp variant="ghost" />
        {/if}
      </button>
    </Popover.Trigger>
    <Popover.Content>
      <Popap {point} />
    </Popover.Content>
  </Popover.Root>
</div>
