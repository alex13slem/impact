<script lang="ts">
  import type { PartnerWithRelatedData } from '@/lib/data/partners';
  import { targetEventSlug } from '@/lib/stores/partnerInteractiveStore';
  import { cn } from '@/lib/utils';

  export let className: string = '';

  export let partner: PartnerWithRelatedData;
</script>

<div class={cn(className, 'xl:max-w-3xl w-full')}>
  {#each partner.events as event, idx}
    <article
      on:mouseenter={() => targetEventSlug.set(event.slug)}
      on:mouseleave={() => targetEventSlug.set(null)}
      class="relative group"
    >
      <a href="/news/{event.slug}" class="absolute inset-0 opacity-0">.</a>
      <header class="mb-4 flex items-start gap-5">
        <h3 class="text-base lg:text-2xl font-sov-mod uppercase">
          {event.title}
        </h3>
        <!-- <svg
          class="self-baseline text-3xl mt-1 ml-auto group-hover:text-accent transition-colors hidden xl:block"
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
        </svg> -->
      </header>
      <div class="xl:max-w-xl text-sm md:text-base lg:text-lg font-thin">
        <p>{event.description}</p>
      </div>
    </article>

    {#if idx < partner.events.length - 1}
      <hr class="my-7 border-white border-opacity-15" />
    {/if}
  {/each}
</div>
