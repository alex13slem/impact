<script lang="ts">
  import { needys } from '@/lib/data/needys';
  import { filterCategory } from '@/lib/stores/categoryStore';
  import { needysCoordinates } from '@/lib/stores/needysStore';
  import { loading } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';
  import Nav from './nav.svelte';
  import NeedyPoint from './needy-point.svelte';
  import SvgMap from './svg-map.svelte';

  export let className: string = '';

  $: viewNeedyCoordinates = $needysCoordinates.filter(
    needy => $filterCategory === null || needy.categorySlug === $filterCategory,
  );
</script>

<div
  class={cn('relative z-0 overflow-x-auto lg:overflow-visible', className)}
  {...$$restProps}
>
  <Nav />
  <SvgMap
    {needys}
    className={cn({
      'drop-shadow-[0_0_2rem_hsl(209,50%,30%)] lg:drop-shadow-[0_0_18rem_hsl(209,100%,70%)]':
        !$loading,
    })}
  />
  {#each viewNeedyCoordinates as needy (needy.id)}
    <NeedyPoint {needy} />
  {/each}
</div>
