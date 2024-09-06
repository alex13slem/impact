<script lang="ts">
  import type { PartnerWithRelatedData } from '@/lib/data/partners';

  import { cn } from '@/lib/utils';

  import { onMount, tick } from 'svelte';
  import type { SwiperContainer } from 'swiper/element';
  import { register } from 'swiper/element';
  import { Autoplay } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';
  import Slide from './slide.svelte';

  const options = {
    modules: [Autoplay],
    loop: true,
    slidesPerView: 'auto',

    speed: 5000,
    autoplay: {
      delay: 0,
      pauseOnMouseEnter: true,
    },
    centeredSlides: true,
  } as SwiperOptions;

  export let className: string = '';
  export let partners: PartnerWithRelatedData[] = [];
  let swiperEl: SwiperContainer;

  onMount(async () => {
    Object.assign(swiperEl, options);

    await tick();
    register();
    swiperEl.initialize();
  });
</script>

<swiper-container init="false" bind:this={swiperEl} class={cn('', className)}>
  {#each [...partners, ...partners, ...partners] as p}
    <Slide {p} />
  {/each}
</swiper-container>
