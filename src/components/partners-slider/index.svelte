<script lang="ts">
  import phPhoto from "@/assets/img/ph-photo.webp";
  import type { PartnerWithRelatedData } from "@/lib/data/partners";
  import { cn } from "@/lib/utils";
  import { onMount, tick } from "svelte";
  import type { SwiperContainer } from "swiper/element";
  import { register } from "swiper/element";
  import { Navigation } from "swiper/modules";
  import type { SwiperOptions } from "swiper/types";
  import SectHeadingAccent from "../ui/sect-heading-accent.svelte";
  import SectHeading from "../ui/sect-heading.svelte";

  export let className: string = "";
  export let partners: PartnerWithRelatedData[];

  let swiperEl: SwiperContainer;
  const options = {
    modules: [Navigation],
    slidesPerView: "auto",
    spaceBetween: 20,
    navigation: {
      nextEl: ".next-btn",
      prevEl: ".prev-btn",
    },
  } as SwiperOptions;

  onMount(async () => {
    Object.assign(swiperEl, options);

    await tick();
    register();
    swiperEl.initialize();
  });
</script>

<div class={cn("relative", className)}>
  <swiper-container
    init="false"
    bind:this={swiperEl}
    class={"-mx-4 xl:-mx-40 relative z-0"}
  >
    <div
      class=" w-4 xl:w-40 absolute h-full left-0 top-0 bg-gradient-to-r from-dark to-transparent z-10"
      slot="container-start"
    ></div>
    <div
      class=" w-4 xl:w-40 absolute h-full right-0 top-0 bg-gradient-to-r from-dark to-transparent z-10 rotate-180"
      slot="container-end"
    ></div>

    {#each partners as p (p.id)}
      <swiper-slide
        class="text-sm md:text-base lg:text-lg max-w-80 w-full translate-x-4 xl:translate-x-40 relative"
      >
        <a href={`/partners/${p.id}`} class="absolute inset-0 opacity-0"
          >{p.id}</a
        >
        <img
          class="aspect-square rounded-3xl object-contain object-center p-4"
          src={typeof p.image === "string" ? p.image : phPhoto.src}
          width="320"
          alt={p.name}
        />
        <SectHeading className="!mt-4 !mb-0 !text-2xl md:!text-3xl normal-case">
          <SectHeadingAccent>{p.name}</SectHeadingAccent>
        </SectHeading>
        {#each [{ text: "О предприятии:", value: p.description }] as { text, value }}
          {#if value}
            <div class="mt-2">
              <h4>{text}</h4>
              <p
                class="mt-1 font-thin line-clamp-4 overflow-hidden text-ellipsis"
              >
                {value}
              </p>
            </div>
          {/if}
        {/each}
      </swiper-slide>
    {/each}
    <swiper-slide class="w-4 xl:w-80"></swiper-slide>
  </swiper-container>

  {#each ["prev", "next"] as dir}
    <button
      class={cn(
        {
          "prev-btn left-0  rotate-180": dir === "prev",
          "next-btn right-0  ": dir === "next",
        },
        "bg-white/90 text-dark absolute top-1/2 -translate-y-1/2 z-20  rounded-full  p-3 disabled:opacity-0 hover:bg-white transition-colors hidden xl:inline-block"
      )}
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 12.6865 9.69238"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M7.48 0.35L11.97 4.84L7.48 9.33M11.97 4.84L0 4.84"
          stroke="currentColor"
          stroke-opacity="1"
          stroke-width="1"
        />
      </svg>
    </button>
  {/each}
</div>
