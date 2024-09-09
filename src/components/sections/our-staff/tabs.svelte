<script lang="ts">
  import type { StaffsPosition } from '@/lib/schemas/data/staffsPositions';
  import type { Staff } from '@/lib/schemas/data/staffsSchema';
  import { cn } from '@/lib/utils';
  import { type SwiperContainer } from 'swiper/element';
  //@ts-ignore
  export let staffs: Staff[] = [];
  export let staffsPositions: StaffsPosition[] = [];

  let targetPositionId = staffsPositions.at(0)?.id;
  $: positionStaff = staffs.filter(({ staffPositions }) =>
    staffPositions.find(id => id === targetPositionId),
  );

  // $: viewStaffName = positionStaff.at(0)?.name;
  // let currentSlide = 0;
  let swiperEl: SwiperContainer;
  // const cnBtn =
  //   'lg:text-4xl w-16 h-16 lg:h-28 lg:w-28 flex justify-center items-center bg-opacity-0 text-dark rounded-full disabled:bg-dark disabled:text-white border border-dark disabled:opacity-50';
  // const options = {
  //   modules: [Navigation],
  //   spaceBetween: 20,
  //   centeredSlides: true,
  //   breakpoints: {
  //     768: {
  //       slidesPerView: 2,
  //     },
  //   },
  //   on: {
  //     slideChange(swiper) {
  //       currentSlide = swiper.activeIndex;
  //       viewStaffName =
  //         swiper.slides[swiper.activeIndex].getAttribute('data-name')!;
  //     },
  //   },
  //   navigation: {
  //     nextEl: 'section.our-stuff .swiper-button-next',
  //     prevEl: 'section.our-stuff .swiper-button-prev',
  //   },
  // } as SwiperOptions;

  // onMount(async () => {
  //   Object.assign(swiperEl, options);

  //   await tick();
  //   register();
  //   swiperEl.initialize();
  // });
</script>

<nav
  class="flex gap-4 max-w-5xl lg:justify-center lg:flex-wrap mx-auto mb-8 lg:mb-11 overflow-auto pb-3 px-4 lg:p-0 w-svw md:w-auto relative -left-4"
>
  {#each staffsPositions as pos, idx (pos.id)}
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

<h3 class="text-lg font-medium text-center mb-5">
  Сотрудник{#if positionStaff.length > 1}и{/if}
</h3>
<div class="flex justify-center gap-4 items-center max-w-5xl mx-auto flex-wrap">
  {#each positionStaff.sort( (a, b) => a.name.localeCompare(b.name), ) as staff, idx (staff.id)}
    <p class="text-xl font-bold underline decoration-dark/40">
      {staff.name}
    </p>
    {#if idx !== positionStaff.length - 1}
      <span class="hidden md:inline"> • </span>
    {/if}
  {/each}
</div>

<!-- Desktop -->
<!-- <div class="lg:flex flex-wrap gap-x-6 gap-y-9 justify-center hidden">
  {#each positionStaff as staff (staff.id)}
    <article class="basis-72 relative">
      {#if staff.staffPositions[0]}
        <a
          class="absolute inset-0 opacity-0"
          href={`/team/${staff.staffPositions[0]}/${staff.id}`}>{staff.name}</a
        >
      {/if}
      <img
        class="rounded-3xl aspect-square object-cover object-center"
        src={typeof staff.image === 'string' ? staff.image : phPhoto.src}
        alt={staff.name}
      />
      <h3 class="text-2xl font-light mt-4 text-center">{staff.name}</h3>
    </article>
  {/each}
</div> -->

<!-- Mobile -->
<!-- <swiper-container
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
          'transition-all relative',
        )}
      >
        {#if staff.staffPositions[0]}
          <a
            class="absolute inset-0 opacity-0"
            href={`/team/${staff.staffPositions[0]}/${staff.id}`}
            >{staff.name}</a
          >
        {/if}
        <img
          class="rounded-3xl aspect-square object-cover object-center"
          src={typeof staff.image === 'string' ? staff.image : phPhoto.src}
          alt={staff.name}
        />
        <h3 class="text-2xl font-light mt-4 text-center hidden md:block">
          {staff.name}
        </h3>
      </article>
    </swiper-slide>
  {/each}
</swiper-container> -->

<!-- <h3 class="text-2xl font-light mt-4 text-center md:hidden">
  {viewStaffName}
</h3> -->

<!-- <nav class={'flex gap-2 lg:gap-5 mt-5 justify-center lg:hidden'}>
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
  <button class={cn(cnBtn, 'swiper-button-next')}>
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
</nav> -->
