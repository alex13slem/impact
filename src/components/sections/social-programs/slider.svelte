<script lang="ts">
  import { socialPrograms } from '@/lib/data/socialPrograms';
  import { cn } from '@/lib/utils';
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { register, type SwiperContainer } from 'swiper/element';
  import { EffectFade } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';

  const options = {
    modules: [EffectFade],
    spaceBetween: 20,
    effect: 'fade',
    on: {
      slideChange(swiper) {
        currentSlide = swiper.activeIndex;
      },
    },
  } as SwiperOptions;

  let currentSlide = 0;
  let swiperEl: SwiperContainer;
  export let className: string = '';

  onMount(async () => {
    Object.assign(swiperEl, options);

    await tick();
    register();
    swiperEl.initialize();
  });
</script>

<swiper-container bind:this={swiperEl} init="false" class={cn('', className)}>
  {#each socialPrograms as p, idx (p.id)}
    <swiper-slide>
      {#if idx === currentSlide}
        <article transition:fade={{ duration: 300 }}>
          <div class="flex gap-5 items-end">
            <div class="aspect-[16/6] rounded-2xl md:rounded-3xl overflow-clip">
              <a href={'/programs/' + p.slug}>
                <img
                  class="object-cover w-full h-full"
                  src={p.image}
                  alt={p.name}
                />
              </a>
            </div>
            <p
              class="-mb-1 font-thin text-[#CCD3D9] md:text-3xl md:leading-none min-w-16 md:min-w-28"
            >
              <span class="text-dark text-3xl md:text-5xl">0{idx + 1}</span
              >/0{socialPrograms.length}
            </p>
          </div>
          <hr class="my-3 md:my-5" />
          <h3 class="text-xl md:text-3xl font-medium mb-3 md:mb-5">{p.name}</h3>
          <div class="text-sm md:text-base max-w-lg min-h-36 md:min-h-32">
            {@html p.description}
          </div>
          <p class="w-fit border-b border-dark ml-auto mt-3 md:mt-5">
            <a href={'/programs/' + p.slug} class={'flex items-center gap-2'}>
              Подробнее
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 9 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.70497 0.675894H8.05675M8.05675 0.675894V7.02768M8.05675 0.675894L1.17565 7.557"
                  stroke="currentColor"
                />
              </svg>
            </a>
          </p>
        </article>
      {/if}
    </swiper-slide>
  {/each}
</swiper-container>
