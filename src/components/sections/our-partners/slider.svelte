<script lang="ts">
  import { partners } from '@/lib/data/partners';
  import { cn } from '@/lib/utils';
  import { onMount, tick } from 'svelte';
  import type { SwiperContainer } from 'swiper/element';
  import { register } from 'swiper/element';
  import { Autoplay } from 'swiper/modules';
  import type { SwiperOptions } from 'swiper/types';

  const options = {
    modules: [Autoplay],
    loop: true,
    slidesPerView: 'auto',

    speed: 5000,
    autoplay: {
      delay: 0,
      pauseOnMouseEnter: true,
    },
    centeredSlides: true,
  } as SwiperOptions;

  export let className: string = '';
  let swiperEl: SwiperContainer;

  onMount(async () => {
    Object.assign(swiperEl, options);

    await tick();
    register();
    swiperEl.initialize();
  });
</script>

<swiper-container init="false" bind:this={swiperEl} class={cn('', className)}>
  {#each partners as p}
    <swiper-slide class="h-[228px] w-[328px] flex items-end min-h-0">
      <button
        class="h-[200px] w-[300px] relative border border-dark rounded-3xl"
      >
        <a href={'/partners/' + p.id} class="absolute inset-0 opacity-0"
          >{p.id}</a
        >
        <div
          class="absolute inset-0 bottom-auto -top-5 -right-5 flex flex-row-reverse"
        >
          <div
            class="relative w-14 h-14 bg-dark rounded-full flex justify-center items-center text-white text-3xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              ><path
                fill="currentColor"
                fill-rule="evenodd"
                d="M8.716.315a1 1 0 0 0-1.432 0L6.646.97a1 1 0 0 1-.988.265l-.88-.248a1 1 0 0 0-1.24.716l-.226.886a1 1 0 0 1-.723.723l-.886.225a1 1 0 0 0-.716 1.24l.248.881a1 1 0 0 1-.265.988l-.655.638a1 1 0 0 0 0 1.432l.655.639a1 1 0 0 1 .265.987l-.248.88a1 1 0 0 0 .716 1.24l.886.226a1 1 0 0 1 .723.723l.225.886a1 1 0 0 0 1.24.717l.881-.248a1 1 0 0 1 .988.264l.638.655a1 1 0 0 0 1.432 0l.639-.655a1 1 0 0 1 .987-.264l.88.248a1 1 0 0 0 1.24-.717l.226-.886a1 1 0 0 1 .723-.723l.886-.225a1 1 0 0 0 .717-1.24l-.248-.88a1 1 0 0 1 .264-.988l.655-.639a1 1 0 0 0 0-1.432l-.655-.638a1 1 0 0 1-.264-.988l.248-.88a1 1 0 0 0-.717-1.24l-.886-.226a1 1 0 0 1-.723-.723l-.225-.886a1 1 0 0 0-1.24-.716l-.88.248A1 1 0 0 1 9.354.97zm3.057 5.975a.75.75 0 0 0-1.042-1.08L6.597 9.202L5.28 7.887A.75.75 0 0 0 4.22 8.95l1.839 1.834a.75.75 0 0 0 1.05.01z"
                clip-rule="evenodd"
              /></svg
            >
          </div>
          <div
            class="relative -right-7 w-14 h-14 bg-dark rounded-full flex justify-center items-center text-white text-3xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              ><path
                fill="currentColor"
                fill-rule="evenodd"
                d="M8.716.315a1 1 0 0 0-1.432 0L6.646.97a1 1 0 0 1-.988.265l-.88-.248a1 1 0 0 0-1.24.716l-.226.886a1 1 0 0 1-.723.723l-.886.225a1 1 0 0 0-.716 1.24l.248.881a1 1 0 0 1-.265.988l-.655.638a1 1 0 0 0 0 1.432l.655.639a1 1 0 0 1 .265.987l-.248.88a1 1 0 0 0 .716 1.24l.886.226a1 1 0 0 1 .723.723l.225.886a1 1 0 0 0 1.24.717l.881-.248a1 1 0 0 1 .988.264l.638.655a1 1 0 0 0 1.432 0l.639-.655a1 1 0 0 1 .987-.264l.88.248a1 1 0 0 0 1.24-.717l.226-.886a1 1 0 0 1 .723-.723l.886-.225a1 1 0 0 0 .717-1.24l-.248-.88a1 1 0 0 1 .264-.988l.655-.639a1 1 0 0 0 0-1.432l-.655-.638a1 1 0 0 1-.264-.988l.248-.88a1 1 0 0 0-.717-1.24l-.886-.226a1 1 0 0 1-.723-.723l-.225-.886a1 1 0 0 0-1.24-.716l-.88.248A1 1 0 0 1 9.354.97zm3.057 5.975a.75.75 0 0 0-1.042-1.08L6.597 9.202L5.28 7.887A.75.75 0 0 0 4.22 8.95l1.839 1.834a.75.75 0 0 0 1.05.01z"
                clip-rule="evenodd"
              /></svg
            >
          </div>
          <div
            class="relative -right-14 w-14 h-14 bg-dark rounded-full flex justify-center items-center text-white text-3xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              ><path
                fill="currentColor"
                fill-rule="evenodd"
                d="M8.716.315a1 1 0 0 0-1.432 0L6.646.97a1 1 0 0 1-.988.265l-.88-.248a1 1 0 0 0-1.24.716l-.226.886a1 1 0 0 1-.723.723l-.886.225a1 1 0 0 0-.716 1.24l.248.881a1 1 0 0 1-.265.988l-.655.638a1 1 0 0 0 0 1.432l.655.639a1 1 0 0 1 .265.987l-.248.88a1 1 0 0 0 .716 1.24l.886.226a1 1 0 0 1 .723.723l.225.886a1 1 0 0 0 1.24.717l.881-.248a1 1 0 0 1 .988.264l.638.655a1 1 0 0 0 1.432 0l.639-.655a1 1 0 0 1 .987-.264l.88.248a1 1 0 0 0 1.24-.717l.226-.886a1 1 0 0 1 .723-.723l.886-.225a1 1 0 0 0 .717-1.24l-.248-.88a1 1 0 0 1 .264-.988l.655-.639a1 1 0 0 0 0-1.432l-.655-.638a1 1 0 0 1-.264-.988l.248-.88a1 1 0 0 0-.717-1.24l-.886-.226a1 1 0 0 1-.723-.723l-.225-.886a1 1 0 0 0-1.24-.716l-.88.248A1 1 0 0 1 9.354.97zm3.057 5.975a.75.75 0 0 0-1.042-1.08L6.597 9.202L5.28 7.887A.75.75 0 0 0 4.22 8.95l1.839 1.834a.75.75 0 0 0 1.05.01z"
                clip-rule="evenodd"
              /></svg
            >
          </div>
        </div>
        <img src={p.image} alt={p.name} class="w-full h-full object-contain" />
      </button>
    </swiper-slide>
  {/each}
</swiper-container>
