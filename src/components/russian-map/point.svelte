<script lang="ts">
  import type { PointWithCoordinates } from '@/lib/data/mapNews';
  import {
    hoveredRegion,
    targetPopap,
    zoomLevel,
  } from '@/lib/stores/hoveredRegionStore';
  import { cn } from '@/lib/utils';
  import { navigate } from 'astro:transitions/client';
  import { fade } from 'svelte/transition';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';

  export let point: PointWithCoordinates;
  export let className: string = '';
  export let style = '';

  function handleMouseEnter(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    $hoveredRegion = el.getAttribute('data-region');

    // updateGradientColors(el, svg, { from: '#c3963c', to: '#fadb9e' });
  }

  function handleMouseOut(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    $hoveredRegion = null;
    // updateGradientColors(el, svg, { from: '#164264', to: '#033455' });
  }

  let link;
  if (point.charityProgramSlug === 'pomozj-detyam') {
    link = point.link;
  } else {
    const query = new URLSearchParams();
    query.set('category', point.charityProgramSlug);
    query.set('region', point.region.slug);
    link = '/news?' + query.toString();
  }
</script>

<div
  transition:fade={{ duration: 100 }}
  class="absolute"
  style={`top: ${point.y}px; left: ${point.x}px; transform: translate(-50%, -50%);` +
    style}
>
  <button
    style={`font-size: ${100 + ($zoomLevel - 10) * 8.89}px;`}
    data-region={point.region.slug}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseOut}
    on:focus={handleMouseEnter}
    on:blur={handleMouseOut}
    on:click={() => {
      navigate(link);
    }}
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
</div>
