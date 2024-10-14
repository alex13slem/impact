<script lang="ts">
  import IconHeartHands from '@/components/ui/icons/icon-heart-hands.svelte';
  import IconPrayerHands from '@/components/ui/icons/icon-prayer-hands.svelte';
  import IconSocialUp from '@/components/ui/icons/icon-social-up.svelte';
  import type { PartnerWithRelatedData } from '@/lib/data/partners';

  export let p: PartnerWithRelatedData;

  // const charityProgramsWithEvents = Object.entries({
  //   nezhnieRuki: p.events?.some(e => e.charityProgram.slug === 'nezhnie-ruki'),
  //   socialnyeLifty: p.events?.some(
  //     e => e.charityProgram.slug === 'socialnye-lifty',
  //   ),
  //   pomozjDetyam: p.events?.some(
  //     e => e.charityProgram.slug === 'pomozj-detyam',
  //   ),
  // }).filter(([key, value]) => value);

  const charityPrograms = Object.entries({
    nezhnieRuki: p.charityProgram.slug === 'nezhnie-ruki',
    socialnyeLifty: p.charityProgram.slug === 'socialnye-lifty',
    pomozjDetyam: p.charityProgram.slug === 'pomozj-detyam',
  }).filter(([key, value]) => value);
</script>

<swiper-slide class="flex items-end min-h-0 w-fit mx-5 md:mx-8 xl:mx-16 py-8">
  <button class=" relative rounded-3xl z-0 cursor-default">
    <a href={'/partners/' + p.id} class="absolute inset-0 opacity-0 z-10"
      >{p.id}</a
    >
    <div
      class="absolute inset-0 bottom-auto -top-5 -right-5 flex flex-row-reverse"
    >
      <!-- <div
        class={`relative right-0 w-14 h-14 bg-gradient-to-br from-gr-start via-gr-middle to-gr-end rounded-full flex justify-center items-center text-white text-5xl`}
      >
        {#if p.charityProgram.slug === 'nezhnie-ruki'}
          <IconHeartHands variant="ghost" className="text-dark" />
        {:else if p.charityProgram.slug === 'socialnye-lifty'}
          <IconSocialUp variant="ghost" className="text-dark" />
        {:else if p.charityProgram.slug === 'pomozj-detyam'}
          <IconPrayerHands variant="ghost" className="text-dark" />
        {/if}
      </div> -->
      {#each charityPrograms as [key], i (key)}
        <div
          style="--right-offset: {i}"
          class={`relative -right-[calc(var(--right-offset)*0.5rem)] xl:-right-[calc(var(--right-offset)*1rem)] w-6 h-6 md:w-8 md:h-8 xl:w-14 xl:h-14 bg-gradient-to-br from-gr-start via-gr-middle to-gr-end rounded-full flex justify-center items-center text-white text-xl md:text-2xl xl:text-5xl`}
        >
          {#if key === 'nezhnieRuki'}
            <IconHeartHands variant="ghost" className="text-dark" />
          {:else if key === 'socialnyeLifty'}
            <IconSocialUp variant="ghost" className="text-dark" />
          {:else if key === 'pomozjDetyam'}
            <IconPrayerHands variant="ghost" className="text-dark" />
          {/if}
        </div>
      {/each}
    </div>
    <img
      loading="lazy"
      src={p.image ? String(p.image) : ''}
      alt={p.name}
      class="logo w-[90px] h-[72px] md:w-[120px] md:h-[96px] xl:w-[192px] xl:h-[168px] object-contain"
    />
  </button>
</swiper-slide>
