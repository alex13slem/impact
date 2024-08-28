<script lang="ts">
  import { needys, type NeedyWithCoordinates } from '@/lib/data/needys';
  import { filteredNeedysCoordinates } from '@/lib/stores/filteredNeedysStore';
  import { loading } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';
  import { onMount, tick } from 'svelte';
  import Nav from './nav.svelte';
  import NeedyPoint from './needy-point.svelte';
  import SvgMap from './svg-map.svelte';

  export let className: string = '';
  let viewNeedyCoordinates: NeedyWithCoordinates[] = [];

  $: viewNeedyCoordinates = $filteredNeedysCoordinates;

  onMount(async () => {
    await tick();
    viewNeedyCoordinates = $filteredNeedysCoordinates;
  });
</script>

<div
  class={cn('relative z-0 overflow-x-auto lg:overflow-visible', className)}
  {...$$restProps}
>
  <Nav />
  <SvgMap
    {needys}
    className={cn({
      'drop-shadow-[0_0_2rem_hsl(209,50%,30%)] lg:drop-shadow-[0_0_18rem_hsl(209,100%,70%)] lg:pr-52':
        !$loading,
    })}
  />
  {#each viewNeedyCoordinates as needy (needy.id)}
    <NeedyPoint {needy} />
  {/each}
</div>
