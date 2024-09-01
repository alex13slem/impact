<script lang="ts">
  import type { NeedyWithCoordinates } from '@/lib/data/needys';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { cn } from '@/lib/utils';
  import { Popover } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';
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
        class={cn('hover:text-accent text-2xl', {
          'text-dark': $hoveredRegion === needy.regionSlug,
        })}
      >
        {#if needy.socialProgramSlug === 'nezhnie-ruki'}
          <IconHeartHands variant="ghost" />
        {:else if needy.socialProgramSlug === 'pomozj-detyam'}
          <IconPrayerHands variant="ghost" />
        {:else if needy.socialProgramSlug === 'socialnye-lifty'}
          <IconSocialUp variant="ghost" />
        {/if}
      </button>
    </Popover.Trigger>
    <Popover.Content>
      <NeedyPopap {needy} />
    </Popover.Content>
  </Popover.Root>
</div>
