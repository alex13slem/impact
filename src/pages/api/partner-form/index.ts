import TestTemplate from '@/components/post-templates/test/index.svelte';
import { partnerFormSchema } from '@/lib/schemas/partnerFormSchema';
import type { APIRoute } from 'astro';
import 'dotenv/config';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const valid = partnerFormSchema.safeParse(body);
    if (!valid.success) {
      console.log(valid.error);

      return new Response(JSON.stringify(valid.error), { status: 400 });
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true, // true для 465 порта, false для других портов
      auth: {
        user: process.env.YANDEX_SMTP_LOGIN, // Ваш email на Yandex
        pass: process.env.YANDEX_SMTP_PASSWORD, // Пароль приложения (настройте в Yandex)
      },
    });

    const emailHtml = render({
      props: {
        name: valid.data.name,
        email: valid.data.email,
        phone: valid.data.phone,
        organization: valid.data.organization,
      },
      template: TestTemplate,
    });

    const info = await transporter.sendMail({
      from: '"IMPACT" <a.s.scherba@yandex.by>', // От кого
      to: process.env.YANDEX_SMTP_EMAIL_TO, // Кому (может быть ваш email для теста)
      subject: 'Заявка на партнерство', // Тема письма
      html: emailHtml,
    });

    console.log('Message sent: %s', info.messageId);

    return new Response('OK');
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response('Something went wrong', { status: 500 });
  }
};
