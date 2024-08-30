<script lang="ts">
  import type { Gallery } from '@/lib/data/gallery';
  import { cn } from '@/lib/utils';
  import { onMount } from 'svelte';
  import { type SwiperContainer, register } from 'swiper/element';
  import { EffectFade, Navigation } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';

  export let className: string = '';
  export let gallery: Gallery[] = [];

  let swiperEl: SwiperContainer;
  const options = {
    modules: [Navigation, EffectFade],
    navigation: {
      nextEl: '.next-btn',
      prevEl: '.prev-btn',
    },
    effect: 'fade',
  } as SwiperOptions;

  onMount(() => {
    Object.assign(swiperEl, options);
    register();
    swiperEl.initialize();
  });
</script>

<swiper-container
  bind:this={swiperEl}
  init="false"
  class={cn('relative max-w-64 sm:max-w-lg m-0', className)}
>
  {#each gallery as item}
    <swiper-slide class="rounded-3xl overflow-clip aspect-[4/3]">
      <img
        class="w-full h-full object-cover object-center"
        src={item.url}
        alt={item.alt}
      />
    </swiper-slide>
  {/each}
</swiper-container>
