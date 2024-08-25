<script lang="ts">
  import { ourMissionSlides } from '@/lib/data/our-mission-slides';
  import { onMount, tick } from 'svelte';
  import { register, type SwiperContainer } from 'swiper/element';
  import {
    Controller,
    EffectFade,
    Mousewheel,
    Navigation as SwiperNavigation,
  } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';
  import Description from './description.svelte';
  import Navigation from './navigation.svelte';
  import Slides from './slides.svelte';

  let slides: SwiperContainer;
  let description: SwiperContainer;
  let currentSlide = 0;

  const slidesParams = {
    modules: [SwiperNavigation, Controller, Mousewheel],
    on: {
      slideChange(swiper) {
        currentSlide = swiper.activeIndex;
        description.swiper.slideTo(currentSlide);
        if (currentSlide === ourMissionSlides.length - 1) {
          swiper.allowSlideNext = false;
        } else {
          swiper.allowSlideNext = true;
        }
      },
    },
    slidesPerView: 1.2,
    breakpoints: {
      1024: {
        slidesPerView: 2,
      },
    },
    spaceBetween: 20,
    mousewheel: true,
    navigation: {
      nextEl: 'section.our-mission .swiper-button-next',
      prevEl: 'section.our-mission .swiper-button-prev',
    },
  } as SwiperOptions;

  const descriptionParams = {
    modules: [EffectFade, Controller],
    on: {
      slideChange(swiper) {
        currentSlide = swiper.activeIndex;
      },
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
    simulateTouch: false,
    noSwiping: true,
    keyboard: false,
    mousewheel: false,

    spaceBetween: 30,
  } as SwiperOptions;

  onMount(async () => {
    Object.assign(slides, slidesParams);
    Object.assign(description, descriptionParams);

    await tick();
    register();
    slides.initialize();
    description.initialize();
  });
</script>

<div class="flex-1 lg:grid grid-cols-[auto,1fr] grid-rows-2 gap-x-36">
  <Slides
    className="row-start-1 row-end-3 col-start-2 col-end-3 w-svw lg:w-[80vw] mb-12 lg:mb-0"
    bind:swiperEl={slides}
    {currentSlide}
  />
  <Description
    className="max-w-96 mb-9 lg:mb-0"
    bind:swiperEl={description}
    {currentSlide}
  />
  <Navigation
    className="col-start-1 col-end-2 row-start-2 row-end-3 self-end"
    {currentSlide}
  />
</div>
