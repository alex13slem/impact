<script lang="ts">
  import { onMount } from 'svelte';

  export let lock: boolean = false;
  let ref: HTMLDivElement;
  onMount(() => {
    document.body.appendChild(ref);
  });
</script>

<svelte:head>
  {#if ref && lock}
    <style>
      :root {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<div class="portal" bind:this={ref}>
  <slot />
</div>
