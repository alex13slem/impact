<script lang="ts">
  import { navLinks as navLinksRaw, type NavLink } from "@/lib/data/navLinks";
  import { clickOutside } from "@/lib/hooks/clickOutside";
  import type { Contacts } from "@/lib/schemas/data/contactsSchema";
  import { mobileMenuVisible } from "@/lib/stores/mobileMenuStore";
  import { cn } from "@/lib/utils";
  import { onMount } from "svelte";
  import { handleClose } from ".";
  import { Portal } from "../portal";
  import IconTg from "../ui/icons/icon-tg.svelte";
  import IconVk from "../ui/icons/icon-vk.svelte";

  export let className: string = "";
  export let contacts: Contacts;

  export let ignoreClickElements: (HTMLElement | string)[] = [];

  let isOpen = false;
  let navLinks: NavLink[] = [];

  onMount(() => {
    isOpen = $mobileMenuVisible;

    navLinks = navLinksRaw
      .map((link) => {
        if (
          window.location.pathname === "/programs/ogon-zhizni" &&
          link.link.includes("contacts")
        ) {
          link.link = "#contacts";
        }
        return link;
      })
      .filter((item) => !item.link.includes("pay"));
  });
</script>

<Portal lock>
  <div class="fixed inset-0 z-30 flex flex-col">
    <div
      class={cn(
        "absolute inset-0 h-full bg-dark/80 backdrop-blur transition-all duration-500  ease-in scale-0 origin-top-right -z-10",
        {
          "scale-100 ease-out duration-[1.5s]": $mobileMenuVisible && isOpen,
        }
      )}
    />
    <div
      class="px-5 py-20 md:py-28 overflow-y-auto overflow-x-clip flex flex-col gap-7 min-h-svh justify-between"
    >
      <div class=""></div>
      <nav
        use:clickOutside={[
          ...ignoreClickElements,
          '[data-target="mobile-menu-trigger"]',
        ]}
        on:outclick={handleClose}
        class={cn(" flex flex-col gap-7", className)}
      >
        {#each navLinks as item, idx (item.name)}
          <a
            href={item.link}
            on:click={handleClose}
            style="--i: {idx}"
            class="link justify-between flex items-baseline gap-2 text-4xl md:text-5xl font-serif"
            class:is-open={$mobileMenuVisible && isOpen}
          >
            {item.name}
          </a>
        {/each}
      </nav>

      <div
        style="--i: {navLinks.length}"
        class="link flex justify-center gap-4"
        class:is-open={$mobileMenuVisible && isOpen}
      >
        <a href={contacts.vk}>
          <IconVk class="text-5xl" />
        </a>

        <a href={contacts.telegram}>
          <IconTg class="text-5xl" />
        </a>
      </div>
    </div>
  </div>
</Portal>

<style lang="postcss">
  .link {
    @apply opacity-0 transition-[opacity,transform] duration-500 translate-y-full;
    transition-delay: calc(var(--i) * 100ms * -1);

    &.is-open {
      @apply opacity-100 translate-y-0;
      transition-delay: calc((var(--i) * 200ms) + 500ms);
    }
  }
</style>
