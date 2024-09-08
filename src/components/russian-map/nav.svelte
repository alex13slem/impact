<script lang="ts">
  import { filterCharityProgram } from '@/lib/stores/charityProgramsStore';
  import { cn } from '@/lib/utils';
  import { handleFilterCharityProgram } from '@/lib/utils/eventHandlers';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';

  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';

  export let charityPrograms: CharityProgram[] = [];
</script>

<nav class="flex flex-col items-start gap-2 w-fit sticky left-0 pl-4">
  {#each charityPrograms as c}
    <button
      on:click={handleFilterCharityProgram}
      class={cn(
        {
          'text-accent': c.slug === $filterCharityProgram,
        },
        'relative group lg:hover:text-accent transition-colors',
      )}
      data-charity-program={c.slug}
    >
      {#if c.slug === 'nezhnie-ruki'}
        <IconHeartHands
          className="text-4xl"
          variant={c.slug === $filterCharityProgram ? 'fill' : 'outline'}
        />
      {:else if c.slug === 'pomozj-detyam'}
        <IconPrayerHands
          className="text-4xl"
          variant={c.slug === $filterCharityProgram ? 'fill' : 'outline'}
        />
      {:else if c.slug === 'socialnye-lifty'}
        <IconSocialUp
          className="text-4xl"
          variant={c.slug === $filterCharityProgram ? 'fill' : 'outline'}
        />
      {/if}

      <span
        class={cn(
          'absolute pointer-events-none left-full top-1/2 -translate-y-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity w-max translate-x-2 ',
          {
            'opacity-100': c.slug === $filterCharityProgram,
          },
        )}>{c.name}</span
      >
    </button>
  {/each}
</nav>
