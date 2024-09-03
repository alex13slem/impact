<script lang="ts">
  import type { OurMissionSlide } from '@/lib/schemas/data/ourMissionSlidesSchema';
  import { cn } from '@/lib/utils';
  import { fade } from 'svelte/transition';
  import { type SwiperContainer } from 'swiper/element';

  export let ourMissionSlides: OurMissionSlide[] = [];
  export let swiperEl: SwiperContainer;
  export let className: string = '';
  export let currentSlide: number;
</script>

<div class={cn(className)}>
  <swiper-container
    init="false"
    bind:this={swiperEl}
    class="slides m-0 min-w-0 rounded-3xl overflow-clip h-full"
  >
    {#each ourMissionSlides as s, idx (s.id)}
      <swiper-slide class="relative rounded-3xl overflow-clip aspect-video">
        {#if idx !== currentSlide}
          <div
            transition:fade={{ duration: 300 }}
            class="absolute inset-0 bg-[#042A47A1]"
          />
        {/if}
        <img
          loading="lazy"
          src={s.image}
          alt={s.description}
          class="w-full h-full object-cover object-center"
        />
      </swiper-slide>
    {/each}
    <swiper-slide class="">
      <img src="" alt="" class="rounded-3xl" />
    </swiper-slide>
  </swiper-container>
</div>
