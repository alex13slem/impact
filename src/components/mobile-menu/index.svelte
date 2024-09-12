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
  <div class="container fixed inset-0 z-30">
    <nav
      use:clickOutside={[
        ...ignoreClickElements,
        '[data-target="mobile-menu-trigger"]',
      ]}
      on:outclick={handleClose}
      class={cn(
        'absolute top-0 right-0 w-full bottom-auto px-4 pt-16 md:pt-20 lg:pt-24 pb-12 max-w-lg  overflow-clip',
        className,
      )}
    >
      <div
        class={cn(
          'absolute inset-0 bg-dark/80 backdrop-blur transition-all duration-500 scale-0 origin-top-right -z-10',
          {
            'scale-100': $mobileMenuVisible && isOpen,
          },
        )}
      />
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
            'link py-3 border-b border-white/40 justify-between flex items-baseline gap-2 uppercase text-lg opacity-0 transition-all duration-300 translate-y-full font-road-radio',
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
    transition-delay: calc((var(--i) * 100ms) + 300ms);
  }
  .link {
    transition-delay: calc(var(--i) * 100ms * -1);
  }
</style>
