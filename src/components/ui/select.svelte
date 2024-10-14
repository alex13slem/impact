<script lang="ts">
  import { cn } from '@/lib/utils';
  import { Select, type Selected } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';

  export let onSelectedChange: (
    item: Selected<string | number> | undefined,
  ) => void = () => {};
  export let options: Selected<string | number>[];
  export let selected: Selected<string | number> | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  const { class: className }: HTMLAttributes<HTMLSelectElement> = $$props;

  export let isActive: boolean = false;
</script>

<Select.Root
  preventScroll={false}
  items={options}
  bind:selected
  bind:onSelectedChange
  onOpenChange={open => (isActive = open)}
>
  <Select.Trigger
    class={cn(
      'border border-current text-accent rounded-xl px-3 py-2 md:py-3 md:px-4 leading-none flex gap-2 justify-between items-center backdrop-blur bg-dark/30 xl:hover:bg-accent xl:hover:text-dark transition-colors',
      {
        'bg-gradient-to-br from-gr-start via-gr-middle to-gr-end text-dark':
          isActive,
      },
      className,
    )}
  >
    <Select.Value {placeholder} />
    <svg
      class="shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      ><path
        fill="currentColor"
        d="M14.911 7.216a.5.5 0 0 1-.765.638L10 3.707L5.854 7.854l-.07.057a.5.5 0 0 1-.638-.765l4.5-4.5l.07-.057a.5.5 0 0 1 .638.057l4.5 4.5zM5.09 12.784a.5.5 0 0 1 .765-.638L10 16.293l4.146-4.147l.07-.057a.5.5 0 0 1 .638.765l-4.5 4.5l-.07.057a.5.5 0 0 1-.638-.057l-4.5-4.5z"
      /></svg
    >
  </Select.Trigger>

  <Select.Content
    sideOffset={8}
    sameWidth={false}
    align="start"
    class="border border-current text-accent p-3 md:p-4 rounded-xl font-light backdrop-blur flex flex-col gap-1 bg-dark bg-opacity-30"
  >
    {#if selected}
      <Select.Item value={null} label={placeholder}>
        <button>{placeholder}</button>
      </Select.Item>
    {/if}
    {#each options as item (item.value)}
      <Select.Item {...item} class="flex justify-between items-center gap-2">
        <button class="text-left">{item.label}</button>
        <Select.ItemIndicator class="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"
            /></svg
          >
        </Select.ItemIndicator>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
