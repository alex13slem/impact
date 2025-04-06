<script lang="ts">
  import { PartnerEventsItem } from "@/components/partner-events-item";
  import type { PartnerWithRelatedData } from "@/lib/data/partners";
  import { partnersMatchesFilters, query } from ".";
  export let partners: PartnerWithRelatedData[];
</script>

{#if $query.hasPartner}
  <section class="my-8 md:my-20 flex flex-col gap-5" id="sect-partners">
    <div class="container">
      {#each partners
        .sort((a, b) => +!a.image - +!b.image)
        .filter( (p) => partnersMatchesFilters(p, $query) ) as partner (partner.id)}
        <PartnerEventsItem {partner} />
      {/each}
    </div>
  </section>
{/if}
