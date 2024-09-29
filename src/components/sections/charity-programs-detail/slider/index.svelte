<script lang="ts">
  import SectHeading from '@/components/ui/sect-heading.svelte';
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import { onMount, tick } from 'svelte';
  import { register, type SwiperContainer } from 'swiper/element';
  import { Mousewheel, Navigation as SwiperNavigation } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';
  import Navigation from './navigation.svelte';
  import Slides from './slides.svelte';

  export let charityPrograms: CharityProgram[] = [];

  let slides: SwiperContainer;
  let currentSlide = 0;

  const slidesParams = {
    modules: [SwiperNavigation, Mousewheel],
    on: {
      slideChange(swiper) {
        currentSlide = swiper.activeIndex;
        if (currentSlide === charityPrograms.length - 1) {
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

    mousewheel: true,
    navigation: {
      nextEl: 'section.programs .swiper-button-next',
      prevEl: 'section.programs .swiper-button-prev',
    },
  } as SwiperOptions;

  onMount(async () => {
    Object.assign(slides, slidesParams);

    await tick();
    register();
    slides.initialize();
  });
</script>

<div class="flex-1 lg:grid grid-cols-[auto,1fr] grid-rows-2 gap-x-36">
  <Slides
    className="row-start-1 row-end-3 col-start-2 col-end-3 w-svw lg:w-[80vw] mb-12 lg:mb-0"
    bind:swiperEl={slides}
    {currentSlide}
    {charityPrograms}
  />
  <div class="max-w-96 hidden xl:block">
    <SectHeading>Программы <br />Фонда:</SectHeading>
  </div>
  <Navigation
    className="col-start-1 col-end-2 row-start-2 row-end-3 self-end justify-center xl:justify-normal"
    {currentSlide}
    {charityPrograms}
  />
</div>
