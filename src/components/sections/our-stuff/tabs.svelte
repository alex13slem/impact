<script lang="ts">
  import { staffs } from '@/lib/data/staffs';
  import { staffToPositions } from '@/lib/data/staffsToPositions';
  import { stuffPositions } from '@/lib/data/stuffPositions';
  import { cn } from '@/lib/utils';
  import { onMount, tick } from 'svelte';
  import { register, type SwiperContainer } from 'swiper/element';
  import type { SwiperOptions } from 'swiper/types';

  let targetPositionId = stuffPositions[0].id;
  $: positionStaff = staffs.filter(staff => {
    return staffToPositions.find(
      position =>
        position.stuffId === staff.id &&
        position.positionId === targetPositionId,
    );
  });

  $: viewStaffName = positionStaff.at(0)?.name;
  let currentSlide = 0;
  let swiperEl: SwiperContainer;
  const options = {
    spaceBetween: 20,
    centeredSlides: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
    on: {
      slideChange(swiper) {
        currentSlide = swiper.activeIndex;
        viewStaffName =
          swiper.slides[swiper.activeIndex].getAttribute('data-name')!;
      },
    },
  } as SwiperOptions;

  onMount(async () => {
    Object.assign(swiperEl, options);

    await tick();
    register();
    swiperEl.initialize();
  });
</script>

<nav
  class="flex gap-4 max-w-5xl lg:justify-center lg:flex-wrap mx-auto mb-8 lg:mb-16 overflow-auto pb-3 px-4 lg:p-0 w-svw relative -left-4"
>
  {#each stuffPositions as pos, idx (pos.id)}
    <button
      on:click={() => (targetPositionId = pos.id)}
      class={cn(
        {
          'bg-dark text-white': pos.id === targetPositionId,
        },
        'flex gap-2 py-5 px-6 border border-dark border-opacity-40 rounded-full leading-none transition-all flex-shrink-0',
      )}
    >
      <span>0{idx + 1}</span>
      {pos.name}
    </button>
  {/each}
</nav>

<!-- Desktop -->
<div class="lg:flex flex-wrap gap-x-6 gap-y-9 justify-center hidden">
  {#each positionStaff as staff (staff.id)}
    <article class="basis-72">
      <img
        class="rounded-3xl aspect-square object-cover object-center"
        src={staff.image}
        alt={staff.name}
      />
      <h3 class="text-2xl font-light mt-4 text-center">{staff.name}</h3>
    </article>
  {/each}
</div>

<!-- Mobile -->
<swiper-container
  bind:this={swiperEl}
  init="false"
  class="lg:hidden rounded-3xl overflow-clip"
>
  {#each positionStaff as staff, idx (staff.id)}
    <swiper-slide data-name={staff.name}>
      <article
        class={cn(
          {
            'opacity-60': currentSlide !== idx,
          },
          'transition-all',
        )}
      >
        <img
          class="rounded-3xl aspect-square object-cover object-center"
          src={staff.image}
          alt={staff.name}
        />
        <h3 class="text-2xl font-light mt-4 text-center hidden md:block">
          {staff.name}
        </h3>
      </article>
    </swiper-slide>
  {/each}
</swiper-container>
<h3 class="text-2xl font-light mt-4 text-center md:hidden">
  {viewStaffName}
</h3>
