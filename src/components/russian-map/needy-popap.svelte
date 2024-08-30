<script lang="ts">
  import type { Needy } from '@/lib/data/needys';
  import { cn } from '@/lib/utils';
  import { Popover } from 'bits-ui';
  import { fade } from 'svelte/transition';

  export let className: string = '';
  export let needy: Needy;
</script>

<article
  transition:fade={{ duration: 100 }}
  class={cn(
    className,
    'p-4 lg:p-6 backdrop-blur rounded-3xl max-w-[300px] border border-white border-opacity-80',
  )}
>
  <Popover.Close
    class="absolute top-4 right-4 lg:top-6 lg:right-6 text-lg lg:text-2xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
      /></svg
    >
  </Popover.Close>
  <div class="flex gap-3 lg:gap-6 mb-4 lg:mb-7">
    <img
      width="68"
      height="68"
      class="rounded-full text-3xl"
      src={needy.image}
      alt=""
    />
    <h3 class="lg:text-3xl text-xl font-bold">{needy.name}</h3>
  </div>
  <p class="mb-4 hidden lg:block">{needy.description}</p>
  <hr class="my-5 border-white border-opacity-90 hidden lg:block" />
  <p class="mb-4 leading-none">{needy.city}</p>
  <button
    class="flex justify-center items-center gap-2 relative text-lg leading-none w-full text-dark bg-white bg-opacity-80 rounded-2xl p-3 lg:p-4 lg:hover:bg-opacity-90 transition-all"
  >
    <a
      href="/programs/{needy.socialProgramSlug}/needy/{needy.id}"
      class="absolute inset-0 opacity-0">{needy.id}</a
    >
    Узнать подробнее
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
  </button>
</article>
