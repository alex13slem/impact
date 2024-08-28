<script lang="ts">
  import { onMount } from 'svelte';

  export let className: string = '';
  export let coords: number[];

  let el: HTMLElement;
  onMount(async () => {
    await ymaps3.ready;
    const { YMap, YMapDefaultSchemeLayer } = ymaps3;
    new YMap(
      el,
      {
        location: {
          center: coords as [number, number],
        },
        showScaleInCopyrights: true,
      },
      [new YMapDefaultSchemeLayer({})],
    );
  });
</script>

<div class={className} bind:this={el}></div>
