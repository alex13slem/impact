<script lang="ts">
  import { socialPrograms } from '@/lib/data/socialPrograms';
  import { targetCategoryId } from '@/lib/stores/newsInteractiveStore';
  import { cn } from '@/lib/utils';
  import { Select, type Selected } from 'bits-ui';

  export let className: string = '';

  const options: Selected<number>[] = socialPrograms.map(item => ({
    value: item.id,
    label: item.name,
  }));
</script>

<Select.Root
  items={options}
  onSelectedChange={item => (item ? targetCategoryId.set(item.value) : null)}
>
  <Select.Trigger
    class={cn(
      className,
      'border border-white rounded-xl py-3 px-5 leading-none font-thin flex gap-2 backdrop-blur bg-dark bg-opacity-30',
    )}
  >
    <Select.Value placeholder="Все новости" />
    <svg
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
    class="border border-white py-3 px-6 rounded-xl font-thin backdrop-blur flex flex-col gap-1 bg-dark bg-opacity-30"
  >
    {#if $targetCategoryId}
      <Select.Item value={null} label="Все новости">
        <button>Все новости</button>
        <Select.ItemIndicator />
      </Select.Item>
    {/if}
    {#each options as item}
      <Select.Item
        value={item.value}
        label={item.label}
        class="flex justify-between items-center gap-2"
      >
        <button>{item.label}</button>
        <Select.ItemIndicator>
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
