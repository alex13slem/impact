<script lang="ts">
  import { mobileMenuVisible } from '@/lib/stores/mobileMenuStore';
  import { cn } from '@/lib/utils';
  import { fly } from 'svelte/transition';
  import { handleClose, handleOpen } from '.';
</script>

<button
  data-target="mobile-menu-trigger"
  class="group relative flex justify-end items-center gap-4 xl:hidden text-accent"
  on:click={() => ($mobileMenuVisible ? handleClose() : handleOpen())}
>
  {#if $mobileMenuVisible}
    <span transition:fly={{ duration: 500, y: 10 }}>Закрыть</span>
  {/if}
  <svg
    width="40"
    height="11"
    viewBox="0 0 40 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40 0.5L0 0.5"
      stroke="currentColor"
      stroke-opacity="1"
      stroke-width="1"
      class={cn('transition-all duration-500', {
        'translate-y-1': $mobileMenuVisible,
        'xl:group-hover:-translate-x-1': !$mobileMenuVisible,
      })}
    />
    <path
      d="M40 10.5L0 10.5"
      stroke="currentColor"
      stroke-opacity="1"
      stroke-width="1"
      class={cn('transition-all duration-500', {
        'opacity-0 translate-x-full': $mobileMenuVisible,
        'xl:group-hover:translate-x-1': !$mobileMenuVisible,
      })}
    />
  </svg>
</button>
