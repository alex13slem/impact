<script lang="ts">
  import IconAngleDown from '@/components/ui/icon-angle-down.svelte';
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { targetEventSlug } from '@/lib/stores/partnerInteractiveStore';
  import { cn } from '@/lib/utils';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  export let className: string = '';

  export let partner: PartnerWithRelatedData;

  const events = partner.events || [];
  let locationHref: string;
  onMount(() => {
    locationHref = encodeURIComponent(window.location.href);
  });
  let showEvents = true;
</script>

<div class={cn(className, 'xl:max-w-3xl w-full')}>
  <button
    class="md:text-3xl border-b pb-2 mb-8 w-full flex justify-between items-center text-left outline-none"
    on:click={() => (showEvents = !showEvents)}
    >Мероприятия партнера
    <IconAngleDown
      class={cn({ 'rotate-180': showEvents }, 'transition-transform')}
    />
  </button>
  {#if showEvents}
    <div transition:slide class="">
      {#each events as event, idx}
        <article
          on:mouseenter={() => targetEventSlug.set(event.slug)}
          on:mouseleave={() => targetEventSlug.set(null)}
          class="relative group"
        >
          <a
            href={`/news/${event.slug}?from=${locationHref}`}
            class="absolute inset-0 opacity-0">.</a
          >
          <header class="mb-4 flex items-start gap-5">
            <h3
              class="text-lg lg:text-2xl font-sov-mod uppercase group-hover:underline text-accent"
            >
              {event.title}
            </h3>
          </header>
          <div class="xl:max-w-xl text-sm md:text-base lg:text-lg font-thin">
            {@html event.description}
          </div>
          <svg
            class="text-3xl mt-5 ml-auto text-accent transition-colors xl:hidden"
            width="1em"
            height="0.5em"
            viewBox="0 0 35 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.1364 1L33.5 8.5M33.5 8.5L26.1364 16M33.5 8.5L-3.27835e-07 8.5"
              stroke="currentColor"
            />
          </svg>
        </article>

        {#if idx < events.length - 1}
          <hr class="my-7 border-white border-opacity-15" />
        {/if}
      {/each}
    </div>
  {/if}
</div>
