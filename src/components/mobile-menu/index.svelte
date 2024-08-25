<script lang="ts">
  import { mobileMenuVisible } from '@/lib/stores/mobileMenuStore';
  import { cn } from '@/lib/utils';
  import { blur } from 'svelte/transition';
  import { Portal } from '../portal';
  import MobileMenuTrigger from './trigger.svelte';

  export let className: string = '';
  export let title: string;
</script>

{#if $mobileMenuVisible}
  <Portal lock>
    <nav
      transition:blur={{ duration: 300 }}
      class={cn('fixed inset-0 p-4 bg-dark z-50 overflow-y-auto', className)}
    >
      <header class="flex justify-between items-center mb-4">
        <h2 class="font-sov-mod text-3xl uppercase leading-none">{title}</h2>
        <MobileMenuTrigger />
      </header>

      <slot />
    </nav>
  </Portal>
{/if}
