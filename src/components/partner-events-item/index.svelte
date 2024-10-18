<script lang="ts">
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { onMount } from 'svelte';

  import SectHeadingAccent from '../ui/sect-heading-accent.svelte';
  import SectHeading from '../ui/sect-heading.svelte';

  export let partner: PartnerWithRelatedData;
  let from: string;

  onMount(() => {
    from = encodeURIComponent(window.location.href);
  });
</script>

<article
  class="grid grid-cols-1 md:grid-cols-[auto,1fr,1fr] grid-rows-[auto,auto,auto] gap-5"
>
  <div
    class="bg-white/10 w-40 h-40 row-span-3 rounded-full md:sticky md:top-24 lg:top-28 overflow-clip p-3 relative z-0"
  >
    <a class="absolute inset-0 opacity-0 z-10" href={`/partners/${partner.id}`}>
    </a>
    {#if partner.image}
      <img
        width="160"
        height="160"
        class="w-full h-full object-contain object-center relative"
        src={String(partner.image)}
        alt={partner.name}
      />
    {/if}
  </div>
  <SectHeading
    className="col-span-2 text-xl xs:text-xl sm:text-xl md:text-2xl !mb-0 max-w-xl"
  >
    <SectHeadingAccent>
      <a href={`/partners/${partner.id}`}>{partner.name}</a>
    </SectHeadingAccent>
  </SectHeading>
  <div class="col-span-2 lg:col-span-1">
    <h3 class="text-xl mb-1">О предприятии:</h3>
    <div class="prose">
      <p>{partner.description}</p>
    </div>
  </div>
  <div class="col-span-2 lg:col-span-1">
    <h3 class="text-xl mb-1">Совместное участие:</h3>
    {#if !!partner.events.length}
      <ul class="list-disc list-inside">
        {#each partner.events as event (event.id)}
          <li
            class="font-thin text-sm md:text-base mt-1 first-of-type:mt-0 relative"
          >
            {#if !event.draft}
              <a
                href={`/news/${event.slug}?from=${from}`}
                class="absolute inset-0 opacity-0"
              >
                .
              </a>
            {/if}
            <strong>{event.title}</strong>
            <br />
            {@html event.description}
          </li>
        {/each}
      </ul>
    {:else}
      <p>Нет событий</p>
    {/if}
  </div>
</article>
