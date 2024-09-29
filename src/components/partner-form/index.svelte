<script lang="ts">
  import { partnerFormSchema } from '@/lib/schemas/partnerFormSchema';
  import { validator } from '@felte/validator-zod';
  import axios from 'axios';
  import { Dialog } from 'bits-ui';
  import { createForm } from 'felte';
  import { toast } from 'svelte-sonner';
  import type { PartnerForm } from '.';

  export let onSubmit: () => void;

  const { form, errors } = createForm<PartnerForm>({
    extend: [validator({ schema: partnerFormSchema })],
    onSubmit: async data => {
      try {
        await axios.post('/api/partner-form', data);
        onSubmit();
        toast.success('Ваша заявка успешно отправлена');
      } catch (error) {
        toast.error('Что-то пошло не так');
      }
    },
  });
</script>

<form use:form method="post" class="flex flex-col gap-4" novalidate>
  <label class="min-h-14">
    <input
      class="w-full bg-transparent border-b border-white/90 outline-none text-lg py-1 px-2 focus-visible:border-accent transition-colors"
      type="text"
      name="name"
      placeholder="ФИО"
    />
    {#if $errors.name}
      <p class="text-[0.75rem] leading-none mt-1 text-red-400">
        {$errors.name}
      </p>
    {/if}
  </label>
  <label class="min-h-14">
    <input
      class="w-full bg-transparent border-b border-white/90 outline-none text-lg py-1 px-2 focus-visible:border-accent transition-colors"
      type="email"
      name="email"
      placeholder="Эл. почта"
    />
    {#if $errors.email}
      <p class="text-[0.75rem] leading-none mt-1 text-red-400">
        {$errors.email}
      </p>
    {/if}
  </label>
  <label class="min-h-14">
    <input
      class="w-full bg-transparent border-b border-white/90 outline-none text-lg py-1 px-2 focus-visible:border-accent transition-colors"
      type="phone"
      name="phone"
      placeholder="Телефон"
    />
    {#if $errors.phone}
      <p class="text-[0.75rem] leading-none mt-1 text-red-400">
        {$errors.phone}
      </p>
    {/if}
  </label>
  <label class="min-h-14">
    <input
      class="w-full bg-transparent border-b border-white/90 outline-none text-lg py-1 px-2 focus-visible:border-accent transition-colors"
      type="text"
      name="organization"
      placeholder="Название организации/ИНН"
    />
    {#if $errors.organization}
      <p class="text-[0.75rem] leading-none mt-1 text-red-400">
        {$errors.organization}
      </p>
    {/if}
  </label>
  <footer class="flex gap-4 justify-end">
    <Dialog.Close>
      <button class=" border border-white/90 text-lg py-1 px-4 rounded"
        >Закрыть</button
      >
    </Dialog.Close>
    <button
      class=" bg-white/90 text-dark outline-none text-lg py-1 px-4 rounded"
      >Отправить</button
    >
  </footer>
</form>
