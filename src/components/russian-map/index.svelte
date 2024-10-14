<script lang="ts">
  import type { NewsPoint } from '@/lib/data/mapNews';
  import type { Region } from '@/lib/schemas/data/regionsSchema';
  import { filteredMapPointsCoordinates } from '@/lib/stores/filteredMapPointsStore';
  import { hoveredRegion, zoomLevel } from '@/lib/stores/hoveredRegionStore';
  import { loading } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';
  import { fade } from 'svelte/transition';
  import Point from './point-v.1.svelte';
  import SvgMap from './svg-map.svelte';

  export let className: string = '';
  export let mapNews: NewsPoint[] = [];
  export let regions: Region[] = [];

  // $: displayedWards = $filteredWardsCoordinates.reduce((acc, currWard) => {
  //   if (
  //     !acc.find(
  //       w =>
  //         w.charityProgramSlug === currWard.charityProgramSlug &&
  //         w.region.slug === currWard.region.slug,
  //     ) ||
  //     $zoomLevel > 3
  //   ) {
  //     acc.push(currWard);
  //   }
  //   return acc;
  // }, [] as PointWithCoordinates[]);

  $: targetRegion = regions.find(region => region.slug === $hoveredRegion);
</script>

<div class={cn('relative', className)} {...$$restProps}>
  {#if !$loading}
    <SvgMap
      {mapNews}
      className={cn('h-full xl:drop-shadow-[0_0_18rem_hsl(209,100%,70%)]')}
    />
  {/if}
  {#if targetRegion}
    <div transition:fade={{ duration: 500 }} class="xl:container relative">
      <p
        class={cn(
          'z-40 absolute left-6 xl:right-0 xl:left-auto bottom-36 md:bottom-48 xl:bottom-8 bg-gradient-to-br from-gr-start via-gr-middle to-gr-end md:text-xl font-sov-mod text-dark px-4 py-1 md:px-6 md:py-2 rounded-xl md:rounded-2xl xl:drop-shadow-[0_0_2rem_hsl(209,50%,30%)]',
          { 'bottom-8': $zoomLevel > 1 },
        )}
      >
        {targetRegion.name}
      </p>
    </div>
  {/if}
  <!-- drop-shadow-[0_0_2rem_hsl(209,50%,30%)]  -->
  {#each $filteredMapPointsCoordinates as point (point.id)}
    <Point
      {point}
      style={`--i: ${Math.random() * $filteredMapPointsCoordinates.length};`}
    />
  {/each}
</div>
