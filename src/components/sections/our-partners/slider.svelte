<script lang="ts">
  import { cn } from '@/lib/utils';

  import type { PartnerWithRelations } from '@/lib/schemas/data/partnersSchema';
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
  export let partners: PartnerWithRelations[] = [];
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
