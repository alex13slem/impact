<script lang="ts">
  import FilterButton from "@/components/ui/filter-button.svelte";
  import Select from "@/components/ui/select.svelte";
  import type { CharityProgram } from "@/lib/schemas/data/charityProgramsSchema";
  import type { Region } from "@/lib/schemas/data/regionsSchema";
  import { type Selected } from "bits-ui";
  import { tick } from "svelte";
  import { query } from ".";

  export let regions: Region[] = [];
  export let charityPrograms: CharityProgram[] = [];

  const categoryOptions: Selected<string>[] = charityPrograms.map((item) => ({
    value: item.slug,
    label: item.name,
  }));
  const regionOptions: Selected<string>[] = regions
    .map((item) => ({
      value: item.slug,
      label: item.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "ru"));

  $: selectedRegion = regionOptions.find(
    (item) => item.value === $query.region
  );
  $: selectedProgram = categoryOptions.find(
    (item) => item.value === $query.program
  );

  function handleFilterAction(fn: () => void) {
    window.scrollTo(0, 0);
    fn();
  }
</script>

<section class={$$props.class}>
  <div class={"container flex flex-col gap-3"}>
    <div class="flex gap-3">
      <Select
        bind:selected={selectedProgram}
        options={categoryOptions}
        onSelectedChange={(item) => {
          window.location.href = "#news";
          $query.program = item?.value;
        }}
        placeholder="Все программы"
        class="flex-1"
      />
      <Select
        bind:selected={selectedRegion}
        options={regionOptions}
        onSelectedChange={(item) => {
          window.location.href = "#news";
          $query.program = item?.value;
        }}
        placeholder="Все регионы"
        class="flex-1"
      />
    </div>
    <div class="flex gap-3">
      <FilterButton
        class="flex-1"
        on:click={async () => {
          if ($query.hasPartner === "true") {
            $query.hasPartner = null;
            window.location.href = "#news";
          } else {
            $query.hasPartner = "true";
            $query.hasWard = null;
            await tick();
            window.location.href = "#sect-partners";
          }
        }}
        isActive={$query.hasPartner === "true"}>Партнёры</FilterButton
      >
      <FilterButton
        class="flex-1"
        on:click={() => {
          handleFilterAction(async () => {
            if ($query.hasWard === "true") {
              $query.hasWard = null;
              window.location.href = "#news";
            } else {
              $query.hasWard = "true";
              $query.hasPartner = null;
              await tick();
              window.location.href = "#sect-wards";
            }
          });
        }}
        isActive={$query.hasWard === "true"}>Подопечные</FilterButton
      >
    </div>
  </div>
</section>
