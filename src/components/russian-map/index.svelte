<script lang="ts">
  import type { NewsPoint } from '@/lib/data/mapNews';
  import type { Region } from '@/lib/schemas/data/regionsSchema';
  import { filteredWardsCoordinates } from '@/lib/stores/filteredWardsStore';
  import { hoveredRegion } from '@/lib/stores/hoveredRegionStore';
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
    <div class="container relative">
      <p
        transition:fade={{ duration: 500 }}
        class="absolute right-0 bottom-8 bg-gradient-to-br from-gr-start via-gr-middle to-gr-end text-3xl font-sov-mod text-dark px-8 py-4 rounded-3xl drop-shadow-[0_0_2rem_hsl(209,50%,30%)]"
      >
        {targetRegion.name}
      </p>
    </div>
  {/if}
  <!-- drop-shadow-[0_0_2rem_hsl(209,50%,30%)]  -->
  {#each $filteredWardsCoordinates as point}
    <Point
      {point}
      style={`--i: ${Math.random() * $filteredWardsCoordinates.length};`}
    />
  {/each}
</div>
