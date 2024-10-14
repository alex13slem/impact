<script lang="ts">
  import { filterCharityProgram } from '@/lib/stores/charityProgramsStore';
  import { cn } from '@/lib/utils';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';

  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';

  export let charityPrograms: CharityProgram[] = [];
  export let className: string = '';
</script>

<nav class={cn('flex flex-col items-start gap-2 w-fit ', className)}>
  {#each charityPrograms as c (c.id)}
    <button
      on:click={() =>
        $filterCharityProgram === c.slug
          ? ($filterCharityProgram = null)
          : ($filterCharityProgram = c.slug)}
      class={cn(
        // on:click={handleFilterCharityProgram}
        {
          'text-accent': c.slug === $filterCharityProgram,
        },
        'relative group xl:hover:text-accent transition-colors',
        // data-charity-program={c.slug}
      )}
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
          'max-w-20 md:max-w-none leading-none text-xs md:text-base absolute pointer-events-none left-full top-1/2 -translate-y-1/2 opacity-0 xl:group-hover:opacity-100 transition-opacity w-max translate-x-2 ',
          {
            'opacity-100': c.slug === $filterCharityProgram,
          },
        )}>{c.name}</span
      >
    </button>
  {/each}
</nav>
