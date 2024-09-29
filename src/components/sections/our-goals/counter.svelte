<script lang="ts">
  import { counter as goalsCounter } from '@/lib/hooks/counter';
  export let counter: number;
</script>

<p
  use:goalsCounter={{ counter }}
  class="counter text-9xl md:text-[50vmin] leading-none font-sov-mod tracking-tighter pr-6"
>
  {counter}
</p>
