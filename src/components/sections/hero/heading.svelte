<script lang="ts">
  import { loading } from '@/lib/stores/pageLoadingStore';
  import { cn } from '@/lib/utils';

  export let className: string = '';

  $: cnWord = cn('-translate-x-full opacity-0 transition-all', {
    'translate-x-0 opacity-100': !$loading,
  });
</script>

<h1
  class={cn(
    'font-sov-mod text-3xl md:text-5xl uppercase relative px-5 md:px-6 flex flex-col',
    className,
  )}
>
  <span class={cn(cnWord, 'delay-[.5s]')}>Мечта</span>
  <span class={cn(cnWord, 'delay-[1s]')}>Возможность</span>
  <span class={cn(cnWord, 'delay-[1.5s] text-accent')}>Результат</span>
</h1>
