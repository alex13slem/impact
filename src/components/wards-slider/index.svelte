<script lang="ts">
  import phPhoto from '@/assets/img/ph-photo.webp';
  import type { WardWithRelatedData } from '@/lib/data/wards';
  import { cn } from '@/lib/utils';
  import { onMount, tick } from 'svelte';
  import type { SwiperContainer } from 'swiper/element';
  import { register } from 'swiper/element';
  import { Navigation } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';
  import SectHeadingAccent from '../ui/sect-heading-accent.svelte';
  import SectHeading from '../ui/sect-heading.svelte';

  export let className: string = '';
  export let wards: WardWithRelatedData[] = [];

  let swiperEl: SwiperContainer;
  const options = {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: '.next-btn',
      prevEl: '.prev-btn',
    },
  } as SwiperOptions;

  onMount(async () => {
    Object.assign(swiperEl, options);

    await tick();
    register();
    swiperEl.initialize();
  });
</script>

<swiper-container
  init="false"
  bind:this={swiperEl}
  class={cn('-mx-4 xl:-mx-40 relative z-0', className)}
>
  <div
    class=" w-4 xl:w-40 absolute h-full left-0 top-0 bg-gradient-to-r from-dark to-transparent z-10"
    slot="container-start"
  ></div>
  <div
    class=" w-4 xl:w-40 absolute h-full right-0 top-0 bg-gradient-to-r from-dark to-transparent z-10 rotate-180"
    slot="container-end"
  ></div>

  {#each wards as ward}
    <swiper-slide
      class="text-sm md:text-base lg:text-lg max-w-80 w-full translate-x-4 xl:translate-x-40 relative"
    >
      <a
        href={`/programs/${ward.charityProgram.slug}/ward/${ward.id}`}
        class="absolute inset-0 opacity-0">{ward.id}</a
      >
      <img
        class="aspect-square rounded-3xl object-cover object-center"
        src={typeof ward.image === 'string' ? ward.image : phPhoto.src}
        width="320"
        alt={ward.name}
      />
      <SectHeading className="!mt-4 !mb-0 !text-2xl md:!text-3xl normal-case">
        <SectHeadingAccent>{ward.name}</SectHeadingAccent>
      </SectHeading>
      {#each [{ text: 'Регион проживания:', value: ward.region.name }, { text: 'Диагноз:', value: ward.diagnosis }] as { text, value }}
        {#if value}
          <div class="mt-2">
            <h4>{text}</h4>
            <p class="mt-1 font-thin">{value}</p>
          </div>
        {/if}
      {/each}
    </swiper-slide>
  {/each}
  <swiper-slide class="w-4 xl:w-80"></swiper-slide>
</swiper-container>
