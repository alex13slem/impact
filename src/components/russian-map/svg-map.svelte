<script lang="ts">
  import type { NewsPoint } from '@/lib/data/mapNews';
  import { regionsPaths } from '@/lib/data/regionsPaths';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
  import { loading, mapVisible } from '@/lib/stores/pageLoadingStore';
  import { pointsCoordinates } from '@/lib/stores/wardsStore';
  import { cn } from '@/lib/utils';
  import { calculatePointsCoordinates } from '@/lib/utils/coordinateUtils';
  import { onMount, tick } from 'svelte';

  export let className: string = '';
  export let mapNews: NewsPoint[] = [];

  let svg: SVGSVGElement;

  function handleMouseOver(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    $hoveredRegion = el.getAttribute('data-region');
    const gradientId = el
      .getAttribute('fill')!
      .match(/url\(#(svg-gradient-\d+)\)/)![1]; // Получаем ID градиента
    const gradient = svg.getElementById(gradientId) as SVGGElement;

    const stop1 = gradient.childNodes[0] as SVGStopElement;
    const stop2 = gradient.childNodes[1] as SVGStopElement;
    stop1.setAttribute('stop-color', '#c3963c');
    stop2.setAttribute('stop-color', '#fadb9e');
  }

  function handleMouseOut(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    $hoveredRegion = null;
    const gradientId = el
      .getAttribute('fill')!
      .match(/url\(#(svg-gradient-\d+)\)/)![1];
    const gradient = svg.getElementById(gradientId) as SVGGElement;
    const stop1 = gradient.childNodes[0] as SVGStopElement;
    const stop2 = gradient.childNodes[1] as SVGStopElement;
    stop1.setAttribute('stop-color', '#164264');
    stop2.setAttribute('stop-color', '#033455');
  }
  function updateCoordinates() {
    if (svg && mapNews.length > 0) {
      pointsCoordinates.set(
        calculatePointsCoordinates(svg, mapNews, regionsPaths),
      );
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
    {#each regionsPaths as path, i (path.d)}
      <linearGradient id="svg-gradient-{i}">
        <stop class="transition-all" offset="0" stop-color="#164264" />
        <stop class="transition-all" offset="1" stop-color="#033455" />
      </linearGradient>
    {/each}
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
          'stroke-accent stroke-[0.3px] transition-all cursor-default outline-none ease-in-out  hover:stroke-[1.5px] hover:drop-shadow-2xl',
        )}
        d={path.d}
        fill="url(#svg-gradient-{i})"
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:focus={handleMouseOver}
        on:blur={handleMouseOut}
        role="button"
        tabindex="0"
      />
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
