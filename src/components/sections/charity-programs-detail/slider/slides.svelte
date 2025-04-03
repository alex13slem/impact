<script lang="ts">
  import IconHeartHands from "@/components/ui/icons/icon-heart-hands.svelte";
  import IconPrayerHands from "@/components/ui/icons/icon-prayer-hands.svelte";
  import IconRunner from "@/components/ui/icons/icon-runner.svelte";
  import IconSocialUp from "@/components/ui/icons/icon-social-up.svelte";
  import type { CharityProgram } from "@/lib/schemas/data/charityProgramsSchema";
  import { cn } from "@/lib/utils";
  import { fade } from "svelte/transition";
  import { type SwiperContainer } from "swiper/element";

  export let charityPrograms: CharityProgram[] = [];
  export let swiperEl: SwiperContainer;
  export let className: string = "";
  export let currentSlide: number;
</script>

<swiper-container
  init="false"
  bind:this={swiperEl}
  class={cn("slides min-w-0 h-full", className)}
>
  {#each charityPrograms.sort((a, b) => a.order - b.order) as s, idx (s.id)}
    <swiper-slide
      class={cn(
        "relative rounded-3xl overflow-clip  p-6 border border-white/60 min-h-[36rem] lg:min-h-0",
        {
          "border-accent": idx === currentSlide,
        }
      )}
    >
      {#if idx !== currentSlide}
        <div
          transition:fade={{ duration: 500 }}
          class="absolute inset-0 bg-[#042A47A1]"
        ></div>
      {/if}
      <a href={`/programs/${s.slug}`} class="absolute inset-0 opacity-0 z-10"
        >.</a
      >
      <div class="relative">
        <img
          loading="lazy"
          src={s.image}
          alt={s.description}
          class="w-full object-cover object-center rounded-2xl aspect-square md:aspect-video"
        />
        <div
          class="w-8 h-8 md:w-16 md:h-16 flex items-center justify-center bg-white text-dark rounded-xl text-2xl md:text-5xl absolute bottom-2 right-2 md:bottom-4 md:right-4"
        >
          {#if s.slug === "nezhnie-ruki"}
            <IconHeartHands variant="ghost" />
          {:else if s.slug === "pomozj-detyam"}
            <IconPrayerHands variant="ghost" />
          {:else if s.slug === "socialnye-lifty"}
            <IconSocialUp variant="ghost" />
          {:else if s.slug === "ogon-zhizni"}
            <IconRunner variant="ghost" />
          {/if}
        </div>
      </div>
      <h3
        class="mt-5 py-2 px-4 text-sm md:text-base text-dark bg-gradient-to-br from-gr-start via-gr-middle to-gr-end rounded-2xl w-fit"
      >
        {s.name}
      </h3>
      <div class="mt-4 prose">{@html s.description}</div>
    </swiper-slide>
  {/each}
  <swiper-slide class="">
    <img src="" alt="" class="rounded-3xl" />
  </swiper-slide>
</swiper-container>
