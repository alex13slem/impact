<script lang="ts">
  import { clickOutside } from '@/lib/hooks/clickOutside';
  import { mobileMenuVisible } from '@/lib/stores/mobileMenuStore';
  import { cn } from '@/lib/utils';
  import { slide } from 'svelte/transition';
  import { Portal } from '../portal';

  export let className: string = '';
  export let title: string;
  export let ignoreClickElements: (HTMLElement | string)[] = [];
</script>

{#if $mobileMenuVisible}
  <Portal lock>
    <div class="container fixed inset-0 z-30">
      <nav
        use:clickOutside={[
          ...ignoreClickElements,
          '[data-target="mobile-menu-trigger"]',
        ]}
        on:outclick={() => ($mobileMenuVisible = false)}
        transition:slide={{ duration: 300 }}
        class={cn(
          'absolute top-0 right-0 w-full bottom-auto px-4 pt-20 md:pt-24 lg:pt-28 pb-12 max-w-lg bg-dark/80 backdrop-blur overflow-y-auto',
          className,
        )}
      >
        <header class="flex justify-between items-center mb-4">
          <h2 class="font-sov-mod text-3xl uppercase leading-none">{title}</h2>
          <!-- <MobileMenuTrigger /> -->
        </header>

        <slot />
      </nav>
    </div>
  </Portal>
{/if}
