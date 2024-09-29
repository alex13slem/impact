<script lang="ts">
  import type { WpGallery } from '@/lib/schemas/wpGallery';
  import { cn } from '@/lib/utils';
  import { onMount } from 'svelte';
  import { type SwiperContainer, register } from 'swiper/element';
  import { Navigation, Pagination } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';

  export let className: string = '';
  export let gallery: WpGallery[] = [];

  let swiperEl: SwiperContainer;
  const options = {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.next-btn',
      prevEl: '.prev-btn',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      renderCustom: (swiper, current, total) => {
        let markup = '';

        for (let i = 0; i < total - 1; i++) {
          markup += `<button class="${cn('w-4 h-4 rounded-full border', {
            'border-accent bg-gradient-to-br from-gr-start via-gr-middle to-gr-end':
              i === current - 1,
          })}"></button>`;
        }

        return markup;
      },
    },

    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      1280: {
        slidesPerView: 1,
      },
    },
    on: {
      slideChangeTransitionStart(swiper) {
        if (swiper.activeIndex === gallery.length - 1) {
          swiper.allowSlideNext = false;
        } else {
          swiper.allowSlideNext = true;
        }
      },
    },
  } as SwiperOptions;

  onMount(() => {
    Object.assign(swiperEl, options);
    register();
    swiperEl.initialize();
  });
</script>

<div class="gallery-slider relative flex-shrink-0">
  <div
    class="absolute inset-y-5 -inset-x-7 bg-white/20 -z-10 rounded-3xl hidden xl:block"
  />
  <div
    class="absolute w-16 top-0 -right-4 h-full bg-gradient-to-r from-transparent to-dark z-10 xl:hidden"
  />
  <div
    class="absolute w-screen bottom-0 -right-4 h-16 bg-gradient-to-b from-transparent to-dark z-10 xl:hidden"
  />
  <swiper-container
    bind:this={swiperEl}
    init="false"
    class={cn(
      'relative w-screen xl:w-full xl:max-w-xl rounded-3xl m-0 overflow-clip',
      className,
    )}
  >
    {#each gallery as { src, alt }}
      <swiper-slide
        class="rounded-3xl overflow-clip aspect-[3/4] md:aspect-[4/3]"
      >
        <img
          width="512"
          class="w-full h-full object-cover object-center"
          {src}
          {alt}
        />
      </swiper-slide>
    {/each}
    <swiper-slide class="xl:hidden"></swiper-slide>
  </swiper-container>
  <div
    class="swiper-pagination absolute left-4 bottom-4 z-10 flex gap-1 xl:hidden"
  ></div>
  {#each ['prev', 'next'] as dir}
    <button
      class={cn(
        {
          'prev-btn left-0 -translate-x-1/2 rotate-180': dir === 'prev',
          'next-btn right-0 translate-x-1/2 ': dir === 'next',
        },
        'bg-dark absolute top-1/2 -translate-y-1/2 z-20  rounded-full  p-3 disabled:opacity-30 hover:bg-dark/80 transition-colors hidden xl:inline-block',
      )}
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 12.6865 9.69238"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M7.48 0.35L11.97 4.84L7.48 9.33M11.97 4.84L0 4.84"
          stroke="currentColor"
          stroke-opacity="1"
          stroke-width="1"
        />
      </svg>
    </button>
  {/each}
</div>
