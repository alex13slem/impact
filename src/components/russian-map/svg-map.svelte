<script lang="ts">
  import type { Needy } from '@/lib/data/needys';
  import { regionsPaths } from '@/lib/data/regionsPaths';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { needysCoordinates } from '@/lib/stores/needysStore';
  import { cn } from '@/lib/utils';
  import { calculateNeedysCoordinates } from '@/lib/utils/coordinateUtils';
  import { onMount, tick } from 'svelte';

  export let className: string = '';
  export let needys: Needy[] = [];

  let svg: SVGSVGElement;

  onMount(async () => {
    await tick(); // Ждем, пока DOM полностью отрендерится

    if (svg && needys.length > 0) {
      $needysCoordinates = calculateNeedysCoordinates(
        svg,
        needys,
        regionsPaths,
      );
    }
  });

  export function handleMouseOver(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    el.setAttribute('fill', 'url(#hover)');
    $hoveredRegion = el.getAttribute('data-region');
  }

  export function handleMouseOut(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    el.setAttribute('fill', 'url(#default)');
    $hoveredRegion = null;
  }
</script>

<svelte:window
  on:resize={() => {
    if (svg && needys.length > 0) {
      $needysCoordinates = calculateNeedysCoordinates(
        svg,
        needys,
        regionsPaths,
      );
    }
  }}
/>

<svg
  class={cn(
    'absolute inset-0 px-10 h-full lg:w-full -z-10 transition-[filter] duration-1000 overflow-auto',
    className,
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
    <linearGradient id="hover">
      <stop offset="0" stop-color="var(--accent)" />
      <stop offset="0.425" stop-color="#FAF1A9" />
      <stop offset="1" stop-color="var(--accent)" />
    </linearGradient>
    <linearGradient id="default">
      <stop offset="0.135" stop-color="#164264" />
      <stop offset="1" stop-color="#033455" />
    </linearGradient>
  </defs>

  <g class="relative">
    {#each regionsPaths as path, i (path.d)}
      <path
        data-region={path.name || 'region' + i + 1}
        class="stroke-accent stroke-[0.3px] transition-all cursor-default outline-none"
        fill="url(#default)"
        d={path.d}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:focus={handleMouseOver}
        on:blur={handleMouseOut}
        role="button"
        tabindex="0"
      />
      <!-- hover:stroke-[1.5px] hover:drop-shadow-2xl -->
    {/each}
  </g>
</svg>
