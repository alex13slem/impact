<script lang="ts">
  import type { Contribution } from '@/lib/data/contributions';
  import { targetContributionId } from '@/lib/stores/partnerInteractiveStore';
  import { cn } from '@/lib/utils';

  export let className: string = '';

  export let contributions: Contribution[] = [];
</script>

<div class={cn(className, 'xl:max-w-3xl w-full')}>
  {#each contributions as item, idx}
    <article
      on:mouseenter={() => targetContributionId.set(item.id)}
      class="relative group"
    >
      <header class="mb-4 flex items-start gap-5">
        <h3 class="text-base lg:text-2xl font-sov-mod uppercase">
          {item.name}
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
        <p>{item.description}</p>
      </div>
    </article>

    {#if idx < contributions.length - 1}
      <hr class="my-7 border-white border-opacity-15" />
    {/if}
  {/each}
</div>
