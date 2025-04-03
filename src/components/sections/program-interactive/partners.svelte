<script lang="ts">
  import { PartnersSlider } from "@/components/partners-slider";
  import SectHeadingAccent from "@/components/ui/sect-heading-accent.svelte";
  import SectHeading from "@/components/ui/sect-heading.svelte";
  import type { PartnerWithRelatedData } from "@/lib/data/partners";
  import type { CharityProgram } from "@/lib/schemas/data/charityProgramsSchema";

  export let program: CharityProgram;
  export let partners: PartnerWithRelatedData[] = [];
  // let showMore = false;
</script>

<SectHeading className="!text-4xl !mt-16 !mb-8 "
  >Наши <SectHeadingAccent>партнёры</SectHeadingAccent></SectHeading
>
{#if !!partners.length}
  <PartnersSlider {partners} />
  <!-- {#each partners.slice(0, showMore ? partners.length : 2) as partner (partner.id)}
    <div in:fade class="mt-10 first-of-type:mt-20">
      <PartnerEventsItem {partner} />
    </div>
  {/each}
  <button
    on:click={() => (showMore = !showMore)}
    class="mt-14 flex gap-2 items-center transition-colors hover:text-accent text-white/90"
  >
    {#if !showMore}
      Показать еще
    {:else}
      Скрыть
    {/if}
    <IconAngleDown
      class="{cn({ 'rotate-180': showMore }, 'transition-transform')}}"
    />
  </button> -->
{:else}
  <div class="text-center prose border border-white/90 rounded-3xl p-6">
    <p>
      В рамках программы «{program.name}» скоро появятся наши первые партнёры
    </p>
  </div>
{/if}
