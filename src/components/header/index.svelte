<script lang="ts">
  //@ts-ignore
  import siteLogo from '@/assets/img/site-logo.png';
  import { navLinks } from '@/lib/data/navLinks';
  import { scrollHidden } from '@/lib/hooks/scrollHidden';
  import type { Contacts } from '@/lib/schemas/data/contactsSchema';
  import { mobileMenuMounted } from '@/lib/stores/mobileMenuStore';
  import { cn } from '@/lib/utils';
  import { breakpointsTw } from '@/lib/utils/tailwind';
  import { breakpoints } from '@sveu/browser';
  import { onMount } from 'svelte';
  import { MobileMenu, MobileMenuTrigger } from '../mobile-menu';
  import IconTg from '../ui/icons/icon-tg.svelte';
  import IconVk from '../ui/icons/icon-vk.svelte';
  import LogoSmall from '../ui/icons/logo-small.svelte';

  const { gte } = breakpoints(breakpointsTw);
  const isDesktopPlus = gte('lg');

  export let contacts: Contacts;

  let isHomePage: boolean = true;
  let root: HTMLElement;

  onMount(() => {
    isHomePage = window.location.pathname === '/';
  });

  let isTop = true;
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentIsTop = window.scrollY < 15;
        if (currentIsTop !== isTop) isTop = currentIsTop;
        ticking = false;
      });
      ticking = true;
    }
  }
</script>

<svelte:window on:scroll={handleScroll} />

<header
  use:scrollHidden={{ enable: $isDesktopPlus }}
  bind:this={root}
  data-target="site-header"
  class={cn(
    'mix-blend-difference lg:mix-blend-normal py-5 md:py-8 lg:border-b lg:border-white lg:border-opacity-0 sticky top-0 z-40 transition-[background,border,filter, inset] duration-700',
    {
      'lg:bg-dark/30 lg:border-opacity-5 lg:backdrop-blur': !isTop,
    },
  )}
>
  <div class="container flex justify-between items-end">
    <a href="/">
      <img
        class={'hidden lg:inline-block h-10 xl:h-14 object-contain object-left w-fit'}
        src={siteLogo.src}
        alt="Impact"
      />
      <LogoSmall class="text-3xl md:text-5xl text-accent lg:hidden" />
    </a>

    <nav class="hidden lg:flex gap-8 items-center leading-none -mb-[6px]">
      {#each navLinks.filter(item => !item.link.includes('pay')) as item (item.name)}
        <a
          href={item.link}
          class=" hover:text-accent transition-colors text-white/90 uppercase font-road-radio text-xs xl:text-base"
          >{item.name}</a
        >
      {/each}
    </nav>

    <div class="flex gap-8 items-center">
      <div class="link xl:flex justify-center gap-4 hidden">
        <a href={contacts.vk}>
          <IconVk class="text-5xl" />
        </a>

        <a href={contacts.telegram}>
          <IconTg class="text-5xl" />
        </a>
      </div>
      <!-- <button
        class="lg:flex group justify-center items-center gap-7 hover:text-accent transition-colors text-white text-opacity-90 relative hidden"
      >
        <a href="/#pay" class="absolute inset-0 opacity-0">.</a>
        <span
          class="py-2 px-3 border border-white/40 group-hover:border-accent transition-all rounded-xl flex items-center gap-2"
        >
          Как помочь
          <svg
            width="12.686523"
            height="9.692383"
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
        </span>
      </button> -->

      <MobileMenuTrigger />
    </div>

    {#if $mobileMenuMounted}
      <MobileMenu {contacts} />
    {/if}
  </div>
</header>
