<script lang="ts">
  import { regionsPaths } from '@/lib/data/regionsPaths';
  import type { WardWithRelatedData } from '@/lib/data/wards';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { loading, mapVisible } from '@/lib/stores/pageLoadingStore';
  import { wardsCoordinates } from '@/lib/stores/wardsStore';
  import { cn } from '@/lib/utils';
  import { calculateWardsCoordinates } from '@/lib/utils/coordinateUtils';
  import { onMount, tick } from 'svelte';

  export let className: string = '';
  export let wards: WardWithRelatedData[] = [];

  let svg: SVGSVGElement;

  function handleMouseOver(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    // el.setAttribute('fill', 'url(#hover-gradient)');
    $hoveredRegion = el.getAttribute('data-region');
  }

  function handleMouseOut(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    // el.setAttribute('fill', 'url(#default-gradient)');
    $hoveredRegion = null;
  }
  function updateCoordinates() {
    if (svg && wards.length > 0) {
      wardsCoordinates.set(calculateWardsCoordinates(svg, wards, regionsPaths));
    }
  }

  onMount(async () => {
    await tick(); // Ждем, пока DOM полностью отрендерится
    updateCoordinates();
  });
</script>

<svelte:window on:resize={updateCoordinates} />

<svg
  class={cn(
    'absolute inset-0 px-10 h-full lg:w-full -z-10 transition-[filter] duration-1000 overflow-auto ',
    className,
    {
      'opacity-0': $loading && !$mapVisible,
    },
  )}
  bind:this={svg}
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 1140 624"
  style="enable-background:new 0 0 1140 624;"
  xml:space="preserve"
>
  <defs>
    <linearGradient id="hover-gradient">
      <stop offset="0" stop-color="#c3963c" />
      <stop offset="0.425" stop-color="#fadb9e" />
      <stop offset="1" stop-color="#c6942f" />
    </linearGradient>
    <linearGradient id="default-gradient">
      <stop offset="0.135" stop-color="#164264" />
      <stop offset="1" stop-color="#033455" />
    </linearGradient>
  </defs>

  <g class="relative">
    {#each regionsPaths as path, i (path.d)}
      <path
        style="animation-delay: {i * 20}ms;"
        data-region={path.name || 'region' + i + 1}
        class={cn(
          {
            'highlight-anim': $loading && $mapVisible,
          },
          'stroke-accent stroke-[0.3px] transition-all cursor-default outline-none ease-in-out fill-[rgba(0,30,61,0.5)] hover:fill-accent hover:stroke-[1.5px] hover:drop-shadow-2xl',
        )}
        d={path.d}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:focus={handleMouseOver}
        on:blur={handleMouseOut}
        role="button"
        tabindex="0"
      />
      <!-- fill="url(#default-gradient)" -->
      <!-- hover:stroke-[1.5px] hover:drop-shadow-2xl -->
    {/each}
  </g>
</svg>

<style lang="postcss">
  .highlight-anim {
    animation: highlight 1s ease-in-out infinite alternate;
  }
  @keyframes highlight {
    100% {
      fill: #fbcb6a3a;
      filter: drop-shadow(0 0 15px #fbcb6a);
      stroke-width: 1.5px;
    }
  }
</style>
