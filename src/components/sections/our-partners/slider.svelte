<script lang="ts">
  import { cn } from "@/lib/utils";

  import type { PartnerWithRelatedData } from "@/lib/data/partners";
  import { onMount, tick } from "svelte";
  import type { SwiperContainer } from "swiper/element";
  import { register } from "swiper/element";
  import { Autoplay } from "swiper/modules";
  import type { SwiperOptions } from "swiper/types";
  import Slide from "./slide.svelte";

  const options = {
    modules: [Autoplay],
    loop: true,
    slidesPerView: "auto",
    // slidesPerGroup: 5,
    freeMode: true,
    speed: 3000,
    shortSwipes: false,
    longSwipes: false,
    simulateTouch: false,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
    },
    injectStyles: [
      `
      :host .swiper-wrapper {
        transition-timing-function: linear;
      }
      `,
    ],
  } as SwiperOptions;

  export let className: string = "";
  export let partners: PartnerWithRelatedData[] = [];
  let swiperEl: SwiperContainer;

  const partnersWithLogos = partners.filter((p) => p.image);

  async function swiperInit() {
    Object.assign(swiperEl, options);
    await tick();
    register();
    swiperEl.initialize();
  }

  onMount(() => {
    void swiperInit();
  });
</script>

<swiper-container
  init="false"
  bind:this={swiperEl}
  class={cn("transform-none ", className)}
>
  {#each [...partnersWithLogos, ...partnersWithLogos, ...partnersWithLogos] as p}
    <Slide {p} />
  {/each}
</swiper-container>
