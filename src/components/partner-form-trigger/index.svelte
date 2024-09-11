<script lang="ts">
  import { PartnerForm } from '@/components/partner-form';
  import Button from '@/components/ui/button.svelte';
  import { Dialog } from 'bits-ui';
  import { fade } from 'svelte/transition';

  let dialogOpen = false;
</script>

<div>
  <!-- Рендерим выбранный элемент или компонент с переданными пропсами и слотом -->
  <Button on:click={() => (dialogOpen = true)} {...$$restProps}>
    <slot />
  </Button>

  <!-- Диалог, связанный с состоянием `dialogOpen` -->
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Portal>
      <Dialog.Overlay
        transition={fade}
        transitionConfig={{ duration: 150 }}
        class="fixed inset-0 z-50 bg-dark/40 backdrop-blur"
      />
      <Dialog.Content
        transition={fade}
        class="bg-dark/90 fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] border border-accent rounded-3xl px-5 py-7 outline-none sm:max-w-[490px] md:w-full"
      >
        <Dialog.Title asChild>
          <h2 class="font-sov-mod text-3xl uppercase text-accent">
            Оставь заявку
          </h2>
        </Dialog.Title>
        <hr class=" border-white/90 my-7" />
        <PartnerForm onSubmit={() => (dialogOpen = false)} />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
</div>
