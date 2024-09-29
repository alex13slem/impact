<script lang="ts">
  import type { NewsPoint } from '@/lib/data/mapNews';
  import { regionsPaths } from '@/lib/data/regionsPaths';
  import {
    setNewTransform,
    updateCoordinates,
    zoomPan,
  } from '@/lib/hooks/zoomPan';
  import {
    hoveredRegion,
    isPanning,
    offset,
    zoomLevel,
  } from '@/lib/stores/hoveredRegionStore';
  import { loading, mapVisible } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';
  import { breakpointsTw } from '@/lib/utils/tailwind';
  import { breakpoints } from '@sveu/browser';
  import { navigate } from 'astro:transitions/client';
  import { onMount, tick } from 'svelte';

  // const { platform, brands } = useragent();
  // const { gte } = breakpoints(breakpointsTw);
  // const isDesktopPlus = gte('lg');
  // const isTabletPlus = gte('md');
  // function updateGradientColors(
  //   el: SVGElement,
  //   svg: SVGSVGElement,
  //   colors: { from: string; to: string },
  // ) {
  //   const gradientId = el
  //     .getAttribute('fill')!
  //     .match(/url\(#(svg-gradient-\d+)\)/)![1];
  //   if (gradientId) {
  //     const gradient = svg.getElementById(gradientId) as SVGGElement;
  //     const stop1 = gradient.childNodes[0] as SVGStopElement;
  //     const stop2 = gradient.childNodes[1] as SVGStopElement;
  //     stop1.setAttribute('stop-color', colors.from);
  //     stop2.setAttribute('stop-color', colors.to);
  //   }
  // }

  export let className: string = '';
  export let mapNews: NewsPoint[] = [];

  let svg: SVGSVGElement;
  let content: SVGGElement;

  function handleMouseOver(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    $hoveredRegion = el.getAttribute('data-region');
    // updateGradientColors(el, svg, { from: '#c3963c', to: '#fadb9e' });
  }

  function handleMouseOut(event: MouseEvent | FocusEvent) {
    const el = event.target as SVGElement;
    $hoveredRegion = null;
    // updateGradientColors(el, svg, { from: '#164264', to: '#033455' });
  }
  function handleUpdateCoordinates() {
    updateCoordinates(svg, { mapNews, regionsPaths });
  }

  const { gte } = breakpoints(breakpointsTw);
  const isDesktopPlus = gte('lg');
  const isTabletPlus = gte('md');

  onMount(() => {
    if ($loading) return;
    $isDesktopPlus
      ? ($offset = {
          x: (svg.clientWidth / 100) * 3,
          y: (svg.clientHeight / 100) * 10,
        })
      : $isTabletPlus
        ? ($offset = { x: 0, y: (svg.clientHeight / 100) * 10 })
        : ($offset = {
            x: (svg.clientWidth / 100) * -5,
            y: (svg.clientHeight / 100) * 10,
          });
    !$isDesktopPlus && ($zoomLevel = 1);

    tick().then(() => {
      setNewTransform(content);
      updateCoordinates(svg, { mapNews, regionsPaths });
    });
  });

  $: if ($zoomLevel || $isPanning || $offset) {
    updateCoordinates(svg, { mapNews, regionsPaths });
  }
</script>

<svelte:window on:resize={handleUpdateCoordinates} />
<svg
  class={cn(
    'transition-opacity duration-1000 cursor-default outline-none block w-full h-full',
    className,
    {
      'opacity-0': $loading && !$mapVisible,
    },
  )}
  bind:this={svg}
  viewBox="0 0 1192 730"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- {#if !isWebKit}
      <defs>
        {#each regionsPaths as path, i (path.d)}
          <linearGradient id="svg-gradient-{i}">
            <stop class="transition-all" offset="0" stop-color="#164264" />
            <stop class="transition-all" offset="1" stop-color="#033455" />
          </linearGradient>
        {/each}
      </defs>
    {/if} -->

  <g
    role="button"
    tabindex="0"
    bind:this={content}
    use:zoomPan={{ mapNews, regionsPaths }}
  >
    {#each regionsPaths as path, i (path.d)}
      <path
        style="animation-delay: {i * 50}ms;"
        data-region={path.name || 'region' + i + 1}
        class={cn(
          {
            'highlight-anim': $loading && $mapVisible,
          },
          ' stroke-accent stroke-[0.3px] transition-all duration-500 outline-none ease-in-out  hover:stroke-[1.5px] hover:drop-shadow-2xl hover:fill-accent ',
        )}
        d={path.d}
        fill={'#164264'}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:focus={handleMouseOver}
        on:blur={handleMouseOut}
        on:click={() => {
          if (path.name.startsWith('path')) return;
          navigate('/news?region=' + path.name);
        }}
        on:keypress={event => {
          if (path.name.startsWith('path')) return;
          if (event.key === 'Enter') {
            navigate('/news?region=' + path.name);
          }
        }}
        on:pointerdown={() => {
          if (path.name.startsWith('path')) return;
          navigate('/news?region=' + path.name);
        }}
        role="button"
        tabindex="0"
      />
    {/each}
  </g>
</svg>

<style lang="postcss">
  .highlight-anim {
    fill: #033455;
    animation: highlight 1s ease-in-out infinite alternate;
  }
  @keyframes highlight {
    0% {
      fill: #164264;
      opacity: 0.8;
      filter: drop-shadow(0 0 15px #164264);
      stroke-width: 0.5px;
    }
    100% {
      fill: #fbcb6a;
      opacity: 0.8;
      filter: drop-shadow(0 0 15px #fbcb6a);
      stroke-width: 1.5px;
    }
  }
</style>
