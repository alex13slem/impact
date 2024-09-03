<script lang="ts">
  import type { WardWithRelatedData } from '@/lib/data/wards';
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import type { WardWithCoordinates } from '@/lib/schemas/data/wardsSchema';
  import { filteredWardsCoordinates } from '@/lib/stores/filteredWardsStore';
  import { loading } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';
  import { onMount, tick } from 'svelte';
  import Nav from './nav.svelte';
  import SvgMap from './svg-map.svelte';
  import WardPoint from './ward-point.svelte';

  export let charityPrograms: CharityProgram[] = [];
  export let className: string = '';
  export let wards: WardWithRelatedData[] = [];
  let viewWardCoordinates: WardWithCoordinates[] = [];

  $: viewWardCoordinates = $filteredWardsCoordinates;

  onMount(async () => {
    await tick();
    viewWardCoordinates = $filteredWardsCoordinates;
  });
</script>

<div
  class={cn('relative z-0 overflow-x-auto lg:overflow-visible', className)}
  {...$$restProps}
>
  <Nav {charityPrograms} />
  <SvgMap
    {wards}
    className={cn({
      'drop-shadow-[0_0_2rem_hsl(209,50%,30%)] lg:drop-shadow-[0_0_18rem_hsl(209,100%,70%)] lg:pr-52':
        !$loading,
    })}
  />
  {#each viewWardCoordinates as ward (ward.id)}
    <WardPoint {ward} />
  {/each}
</div>
