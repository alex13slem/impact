<script lang="ts">
  import { socialPrograms } from '@/lib/data/socialPrograms';
  import { filterSocialProgram } from '@/lib/stores/socialProgramStore';
  import { cn } from '@/lib/utils';
  import { handleFilterSocialProgram } from '@/lib/utils/eventHandlers';
  import IconHeartHands from '../ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '../ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '../ui/icons/icon-social-up.svelte';
</script>

<nav class="flex flex-col items-start gap-2 w-fit sticky left-0 pl-4">
  {#each socialPrograms as c}
    <button
      on:click={handleFilterSocialProgram}
      class={cn(
        {
          'text-accent': c.slug === $filterSocialProgram,
        },
        'relative group lg:hover:text-accent transition-colors',
      )}
      data-social-program={c.slug}
    >
      {#if c.slug === 'nezhnie-ruki'}
        <IconHeartHands
          className="text-4xl"
          variant={c.slug === $filterSocialProgram ? 'fill' : 'outline'}
        />
      {:else if c.slug === 'pomozj-detyam'}
        <IconPrayerHands
          className="text-4xl"
          variant={c.slug === $filterSocialProgram ? 'fill' : 'outline'}
        />
      {:else if c.slug === 'socialnye-lifty'}
        <IconSocialUp
          className="text-4xl"
          variant={c.slug === $filterSocialProgram ? 'fill' : 'outline'}
        />
      {/if}

      <span
        class={cn(
          'absolute pointer-events-none left-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-max translate-x-2 ',
        )}>{c.name}</span
      >
    </button>
  {/each}
</nav>
