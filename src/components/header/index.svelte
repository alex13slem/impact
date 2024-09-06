<script lang="ts">
  //@ts-ignore
  import siteLogo from '@/assets/img/site-logo.png';
  import { navLinks } from '@/lib/data/navLinks';
  import { scrollHidden } from '@/lib/hooks/scrollHidden';
  import { mobileMenuVisible } from '@/lib/stores/mobileMenuStore';
  import { cn } from '@/lib/utils';
  import { onMount } from 'svelte';
  import { MobileMenu, MobileMenuTrigger } from '../mobile-menu';

  let isHomePage: boolean = false;
  let root: HTMLElement;

  onMount(() => {
    isHomePage = window.location.pathname === '/';
  });
</script>

<header
  bind:this={root}
  use:scrollHidden={{ triggerHeight: isHomePage ? '100svh' : 0 }}
  data-target="site-header"
  class={cn(
    ' py-4 border-b border-white border-opacity-80 backdrop-blur sticky top-0 z-40 transition-opacity bg-dark bg-opacity-30',
  )}
>
  <div class="container flex justify-between items-center">
    <a href="/"
      ><img
        class={'h-5 md:h-8 lg:h-14 object-contain object-left w-fit'}
        src={siteLogo.src}
        alt="Impact"
      /></a
    >
    <div class="flex gap-8 items-center">
      <button
        class="lg:flex group justify-center items-center gap-7 hover:text-accent transition-colors text-white text-opacity-90 relative hidden"
      >
        <a href="/#pay" class="absolute inset-0 opacity-0">.</a>
        <span
          class="py-2 px-3 border border-current rounded-xl flex items-center gap-2"
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
      </button>

      <MobileMenuTrigger />
    </div>

    <MobileMenu title="Меню">
      {#each navLinks as item}
        <a
          href={item.link}
          on:click={() => ($mobileMenuVisible = false)}
          class="py-2 border-b border-white border-opacity-30 justify-between flex items-baseline gap-2 uppercase text-lg"
        >
          {item.name}
          <svg
            class="h-3 w-4"
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
        </a>
      {/each}
    </MobileMenu>
  </div>
</header>
