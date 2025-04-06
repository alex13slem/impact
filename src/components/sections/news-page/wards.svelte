<script lang="ts">
  import { WardsSlider } from "@/components/wards-slider";
  import type { WardWithRelatedData } from "@/lib/data/wards";
  import { query, wardsMatchesFilters } from ".";
  export let wards: WardWithRelatedData[] = [];
</script>

{#if $query.hasWard}
  <WardsSlider
    wards={wards.filter((item) => wardsMatchesFilters(item, $query))}
  />
{/if}
