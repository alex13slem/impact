<script lang="ts">
  import type { CharityProgram } from '@/lib/schemas/data/charityProgramsSchema';
  import { cn } from '@/lib/utils';
  import { breakpointsTw } from '@/lib/utils/tailwind';
  import { breakpoints } from '@sveu/browser';

  const { gt } = breakpoints(breakpointsTw);
  const isDesktop = gt('lg');

  export let charityPrograms: CharityProgram[] = [];
  export let className: string = '';
  export let currentSlide: number;
</script>

<nav class={cn('flex gap-2 lg:gap-5 ', className)}>
  {#each ['prev', 'next'] as type}
    <button
      class={cn(
        `swiper-button-` + type,
        'lg:text-4xl w-16 h-16 lg:h-28 lg:w-28 rounded-full',
        'flex justify-center items-center',
        'bg-white text-dark bg-opacity-90 disabled:opacity-50 transition-transform',
        { '[&:not(:disabled)]:hover:scale-90': $isDesktop },
        { 'rotate-180': type === 'next' },
      )}
      disabled={!$isDesktop &&
        type === 'next' &&
        currentSlide === charityPrograms.length - 1}
    >
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
  {/each}
</nav>
