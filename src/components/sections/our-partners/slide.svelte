<script lang="ts">
  import type { PartnerWithRelations } from '@/lib/schemas/data/partnersSchema';

  export let p: PartnerWithRelations;

  const charityPrograms = {
    nezhnieRuki: p.events?.some(e => e.charityProgram.slug === 'nezhnie-ruki'),
    socialnyeLifty: p.events?.some(
      e => e.charityProgram.slug === 'socialnye-lifty',
    ),
    pomozjDetyam: p.events?.some(
      e => e.charityProgram.slug === 'pomozj-detyam',
    ),
  };

  const visibleCharityPrograms = Object.entries(charityPrograms).filter(
    ([key, value]) => value,
  );
</script>

<swiper-slide class="flex items-end min-h-0 w-fit mx-5 md:mx-8 xl:mx-16">
  <button
    class="w-[90px] h-[72px] md:w-[120px] md:h-[96px] xl:w-[192px] xl:h-[168px] relative rounded-3xl z-0 cursor-default"
  >
    {#if visibleCharityPrograms.length > 0}
      <a href={'/partners/' + p.id} class="absolute inset-0 opacity-0 z-10"
        >{p.id}</a
      >
    {/if}
    <!-- <div
      class="absolute inset-0 bottom-auto -top-5 -right-5 flex flex-row-reverse"
    >
      <div
        class={`relative right-0 w-14 h-14 bg-dark rounded-full flex justify-center items-center text-white text-5xl`}
      >
        {#if p.charityProgram.slug === 'nezhnie-ruki'}
          <IconHeartHands variant="ghost" />
        {:else if p.charityProgram.slug === 'socialnye-lifty'}
          <IconSocialUp variant="ghost" />
        {:else if p.charityProgram.slug === 'pomozj-detyam'}
          <IconPrayerHands variant="ghost" />
        {/if}
      </div>
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
    </div> -->
    <img
      loading="lazy"
      src={p.image ? String(p.image) : ''}
      alt={p.name}
      class="logo w-full h-full object-contain"
    />
  </button>
</swiper-slide>

<!-- <style>
  img.logo {
    filter: grayscale(1) sepia(20%) saturate(300%) hue-rotate(208deg);
  }
</style> -->
