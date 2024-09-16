<script lang="ts">
  import { cn } from '@/lib/utils';

  export let className: string = '';
  export let href: string = '';
</script>

<button
  class={cn(
    className,
    'relative text-accent border border-current rounded-xl py-3 px-5 leading-none font-thin flex gap-4',
  )}
>
  <a {href} class="absolute inset-0 opacity-0">{href}</a>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    ><path
      fill="currentColor"
      fill-rule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
    /></svg
  >
  <slot />
</button>
