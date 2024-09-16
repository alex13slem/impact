<script lang="ts">
  import { navLinks } from '@/lib/data/navLinks';
  import { clickOutside } from '@/lib/hooks/clickOutside';
  import { mobileMenuVisible } from '@/lib/stores/mobileMenuStore';
  import { cn } from '@/lib/utils';
  import { onMount } from 'svelte';
  import { handleClose } from '.';
  import { Portal } from '../portal';

  export let className: string = '';

  export let ignoreClickElements: (HTMLElement | string)[] = [];
  let isOpen = false;
  onMount(() => {
    isOpen = $mobileMenuVisible;
  });
</script>

<Portal lock>
  <div class="fixed inset-0 z-30 overflow-y-auto">
    <div
      class={cn(
        'absolute inset-0 h-full bg-dark/80 backdrop-blur transition-all duration-500  ease-in scale-0 origin-top-right -z-10',
        {
          'scale-100 ease-out duration-[1.5s]': $mobileMenuVisible && isOpen,
        },
      )}
    />
    <nav
      use:clickOutside={[
        ...ignoreClickElements,
        '[data-target="mobile-menu-trigger"]',
      ]}
      on:outclick={handleClose}
      class={cn(
        'px-5 py-20 md:py-28 overflow-clip flex flex-col min-h-svh justify-center gap-7',
        className,
      )}
    >
      <!-- <header class="flex justify-between items-center mb-4">
          <h2 class="font-sov-mod text-3xl uppercase leading-none">{title}</h2>
          <MobileMenuTrigger />
        </header> -->

      {#each navLinks as item, idx}
        <a
          href={item.link}
          on:click={handleClose}
          style="--i: {idx}"
          class={cn(
            'link justify-between flex items-baseline gap-2 text-4xl md:text-5xl opacity-0 transition-all duration-500 translate-y-full font-serif',
            {
              'opacity-100 is-open translate-y-0': $mobileMenuVisible && isOpen,
            },
          )}
        >
          {item.name}
        </a>
      {/each}
    </nav>
  </div>
</Portal>

<style>
  .link.is-open {
    transition-delay: calc((var(--i) * 200ms) + 500ms);
  }
  .link {
    transition-delay: calc(var(--i) * 100ms * -1);
  }
</style>
