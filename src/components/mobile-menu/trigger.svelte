<script lang="ts">
  import { mobileMenuVisible } from '@/lib/stores/mobileMenuStore';
  import { cn } from '@/lib/utils';
</script>

<button
  data-target="mobile-menu-trigger"
  class=" w-[40px] h-[20px] relative flex justify-end"
  on:click={() => {
    $mobileMenuVisible = !$mobileMenuVisible;
  }}
>
  <svg
    class={cn('absolute inset-0 ml-auto ', {
      'opacity-0': !$mobileMenuVisible,
    })}
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L20 20" stroke="currentColor" />
    <path d="M20 1L0.999999 20" stroke="currentColor" />
  </svg>
  <svg
    class={cn(
      {
        'opacity-0': $mobileMenuVisible,
      },
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent',
    )}
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
      class="group-hover:-translate-x-1 transition-transform"
    />
    <path
      d="M40 10.5L0 10.5"
      stroke="currentColor"
      stroke-opacity="1"
      stroke-width="1"
      class="group-hover:translate-x-1 transition-transform"
    />
  </svg>
</button>
