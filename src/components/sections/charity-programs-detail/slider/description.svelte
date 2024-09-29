<script lang="ts">
  import type { OurMissionSlide } from '@/lib/schemas/data/ourMissionSlidesSchema';
  import { cn } from '@/lib/utils';
  import { type SwiperContainer } from 'swiper/element';

  export let ourMissionSlides: OurMissionSlide[] = [];
  export let swiperEl: SwiperContainer;
  export let currentSlide;
  export let className: string = '';
</script>

<swiper-container
  init="false"
  bind:this={swiperEl}
  class={cn(
    'description md:text-lg lg:text-3xl font-thin m-0 hidden-block dir-bottom min-h-28',
    className,
  )}
>
  {#each ourMissionSlides as s, idx (s.id)}
    <swiper-slide class="">
      <div
        class="transition-opacity duration-300"
        class:opacity-0={idx !== currentSlide}
      >
        {@html s.description}
      </div>
    </swiper-slide>
  {/each}
</swiper-container>
