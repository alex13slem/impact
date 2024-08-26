<script lang="ts">
  import { ourMissionSlides } from '@/lib/data/our-mission-slides';
  import { cn } from '@/lib/utils';
  import { breakpoints } from '@sveu/browser';

  const { gt } = breakpoints({ lg: 1024 });
  const isDesktop = gt('lg');
  const cnBtn =
    'lg:text-4xl w-16 h-16 lg:h-28 lg:w-28 flex justify-center items-center bg-white text-dark rounded-full bg-opacity-90 disabled:opacity-50';

  export let className: string = '';
  export let currentSlide: number;
</script>

<nav class={cn('flex gap-2 lg:gap-5', className)}>
  <button class={cn(cnBtn, 'swiper-button-prev ')}>
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 36 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7266 26.8164L0.910156 14M0.910156 14L13.7266 1.18355M0.910156 14L35.0838 14"
        stroke="currentColor"
      />
    </svg>
  </button>
  <button
    class={cn(cnBtn, 'swiper-button-next')}
    disabled={!$isDesktop && currentSlide === ourMissionSlides.length - 1}
  >
    <svg
      class="rotate-180"
      width="1em"
      height="1em"
      viewBox="0 0 36 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7266 26.8164L0.910156 14M0.910156 14L13.7266 1.18355M0.910156 14L35.0838 14"
        stroke="currentColor"
      />
    </svg>
  </button>
</nav>
