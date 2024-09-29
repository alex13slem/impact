<script lang="ts">
  import { zoomLevel } from '@/lib/stores/hoveredRegionStore';
  import { loading } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';

  export let className: string = '';

  $: cnWord = cn('-translate-x-full opacity-0 transition-[transform,opacity]', {
    'translate-x-0 opacity-100': !$loading,
  });
</script>

<h1
  class={cn(
    'font-sov-mod text-3xl md:text-5xl uppercase relative px-5 md:px-6 flex flex-col [text-shadow:0_0_2rem_hsl(209,50%,15%)] transition-opacity duration-500',
    {
      'opacity-0': $zoomLevel > 1,
    },
    className,
  )}
>
  <span class={cn(cnWord, 'delay-[.5s]')}>Мечта</span>
  <span class={cn(cnWord, 'delay-[1s]')}>Возможность</span>
  <span class={cn(cnWord, 'delay-[1.5s] text-accent')}>Результат</span>
</h1>
