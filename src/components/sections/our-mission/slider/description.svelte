<script lang="ts">
  import { ourMissionSlides } from '@/lib/data/our-mission-slides';
  import { cn } from '@/lib/utils';
  import { fade } from 'svelte/transition';
  import { type SwiperContainer } from 'swiper/element';

  export let swiperEl: SwiperContainer;
  export let currentSlide;
  export let className: string = '';
</script>

<swiper-container
  init="false"
  bind:this={swiperEl}
  class={cn(
    'description md:text-lg lg:text-3xl font-thin m-0 hidden-block dir-left min-h-28',
    className,
  )}
>
  {#each ourMissionSlides as s, idx (s.id)}
    <swiper-slide class="">
      {#if idx === currentSlide}
        <p transition:fade={{ duration: 300 }}>{@html s.description}</p>
      {/if}
    </swiper-slide>
  {/each}
</swiper-container>
