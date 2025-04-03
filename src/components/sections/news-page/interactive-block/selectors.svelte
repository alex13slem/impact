<script lang="ts">
  import FilterButton from "@/components/ui/filter-button.svelte";
  import Select from "@/components/ui/select.svelte";
  import type { CharityProgram } from "@/lib/schemas/data/charityProgramsSchema";
  import type { Region } from "@/lib/schemas/data/regionsSchema";
  import { cn } from "@/lib/utils";
  import { type Selected } from "bits-ui";
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

<div class={cn("flex flex-col gap-3", $$props.class)}>
  <div class="flex gap-3">
    <Select
      bind:selected={selectedProgram}
      options={categoryOptions}
      onSelectedChange={(item) =>
        handleFilterAction(() => ($query.program = item?.value))}
      placeholder="Все программы"
      class="flex-1"
    />
    <Select
      bind:selected={selectedRegion}
      options={regionOptions}
      onSelectedChange={(item) =>
        handleFilterAction(() => ($query.region = item?.value))}
      placeholder="Все регионы"
      class="flex-1"
    />
  </div>
  <div class="flex gap-3">
    <FilterButton
      class="flex-1"
      on:click={() => {
        handleFilterAction(() => {
          if ($query.hasPartner === "true") {
            $query.hasPartner = null;
          } else {
            $query.hasPartner = "true";
            $query.hasWard = null;
          }
        });
      }}
      isActive={$query.hasPartner === "true"}>Партнёры</FilterButton
    >
    <FilterButton
      class="flex-1"
      on:click={() => {
        handleFilterAction(() => {
          if ($query.hasWard === "true") {
            $query.hasWard = null;
          } else {
            $query.hasWard = "true";
            $query.hasPartner = null;
          }
        });
      }}
      isActive={$query.hasWard === "true"}>Подопечные</FilterButton
    >
  </div>
</div>
