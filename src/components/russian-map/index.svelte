<script lang="ts">
  import type { NewsPoint, PointWithCoordinates } from '@/lib/data/mapNews';
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import { filteredWardsCoordinates } from '@/lib/stores/filteredWardsStore';
  import { loading } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';
  import { onMount, tick } from 'svelte';
  import Nav from './nav.svelte';
  import MapPoint from './point.svelte';
  import SvgMap from './svg-map.svelte';

  export let charityPrograms: CharityProgram[] = [];
  export let className: string = '';
  export let mapNews: NewsPoint[] = [];
  let viewNewsPoints: PointWithCoordinates[] = [];

  $: viewNewsPoints = $filteredWardsCoordinates;

  onMount(async () => {
    await tick();
    viewNewsPoints = $filteredWardsCoordinates;
  });
</script>

<div
  class={cn('relative z-0 overflow-x-auto lg:overflow-visible', className)}
  {...$$restProps}
>
  <Nav {charityPrograms} />
  <SvgMap
    {mapNews}
    className={cn({
      'drop-shadow-[0_0_2rem_hsl(209,50%,30%)] lg:drop-shadow-[0_0_18rem_hsl(209,100%,70%)] lg:pr-52':
        !$loading,
    })}
  />
  {#each viewNewsPoints as point}
    <MapPoint
      {point}
      style={`--i: ${Math.random() * viewNewsPoints.length};`}
    />
  {/each}
</div>
