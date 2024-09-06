<script lang="ts">
  import IconHeartHands from '@/components/ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '@/components/ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '@/components/ui/icons/icon-social-up.svelte';
  import type { PartnerWithRelatedData } from '@/lib/data/partners';

  export let p: PartnerWithRelatedData;

  const charityPrograms = {
    nezhnieRuki: p.events.some(e => e.charityProgram.slug === 'nezhnie-ruki'),
    socialnyeLifty: p.events.some(
      e => e.charityProgram.slug === 'socialnye-lifty',
    ),
    pomozjDetyam: p.events.some(e => e.charityProgram.slug === 'pomozj-detyam'),
  };

  const visibleCharityPrograms = Object.entries(charityPrograms).filter(
    ([key, value]) => value,
  );
</script>

<swiper-slide class="h-[228px] w-[328px] flex items-end min-h-0">
  <button
    class="h-[200px] w-[300px] relative border border-dark rounded-3xl p-5"
  >
    {#if visibleCharityPrograms.length > 0}
      <a href={'/partners/' + p.id} class="absolute inset-0 opacity-0">{p.id}</a
      >
    {/if}
    <div
      class="absolute inset-0 bottom-auto -top-5 -right-5 flex flex-row-reverse"
    >
      {#each visibleCharityPrograms as [key], i (key)}
        <div
          class={`relative -right-${i * 7} w-14 h-14 bg-dark rounded-full flex justify-center items-center text-white text-5xl`}
        >
          {#if key === 'nezhnieRuki'}
            <IconHeartHands variant="ghost" />
          {:else if key === 'socialnyeLifty'}
            <IconSocialUp variant="ghost" />
          {:else if key === 'pomozjDetyam'}
            <IconPrayerHands variant="ghost" />
          {/if}
        </div>
      {/each}
    </div>
    <img
      loading="lazy"
      src={p.image}
      alt={p.name}
      class="w-full h-full object-contain"
    />
  </button>
</swiper-slide>
