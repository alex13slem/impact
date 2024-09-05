<script lang="ts">
  //@ts-ignore
  import cursorFragment from '@/assets/img/cursor-fragment.svg';
  import SectHeading from '@/components/ui/sect-heading.svelte';
  import { counter as goalsCounter } from '@/lib/hooks/counter';
  import { sectionSlide } from '@/lib/hooks/sectionSlide';
  import type { Goal } from '@/lib/schemas/data/goalsSchema';
  import { cn } from '@/lib/utils';

  export let goal: Goal;
  export let className: string = '';

  const { image, description, counter } = goal;
</script>

<div
  use:sectionSlide
  class={cn(
    className,
    'bg-cover bg-center relative z-0 py-8 min-h-svh flex flex-col justify-center px-4',
  )}
  style={`background-image: url(${image});`}
>
  <div class="absolute inset-0 bg-[#042A47A1] -z-10" />
  <SectHeading className="text-center">
    НАШИ <span class="text-accent">ЦЕЛИ</span>
  </SectHeading>
  <div class="flex justify-center flex-wrap xl:flex-nowrap items-center">
    <p
      use:goalsCounter={{ counter }}
      class="counter hidden-block dir-bottom text-9xl md:text-[50vmin] leading-none font-sov-mod tracking-tighter pr-6"
    >
      0
    </p>
    <div class="pl-16 lg:pb-10 pt-10 w-fit relative z-0">
      <article
        class="max-w-xl p-4 md:px-16 md:py-5 bg-gradient-to-tl from-gr-start via-gr-middle to-gr-end text-dark text-base md:text-2xl rounded-3xl"
      >
        {@html description}
      </article>
      <img
        src={cursorFragment.src}
        alt="cursor"
        class="absolute -scale-y-[1] lg:scale-100 top-4 md:top-0 lg:top-auto lg:bottom-0 left-0 -z-10"
      />
    </div>
  </div>
</div>
