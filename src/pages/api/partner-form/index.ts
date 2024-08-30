import { partnerFormSchema } from '@/lib/schemas/partnerFormSchema';
import type { APIRoute } from 'astro';
import 'dotenv/config';
import nodemailer from 'nodemailer';

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

    // const emailHtml = render({
    //   template: TestTemplate,
    //   props: {
    //     name: valid.data.name,
    //     email: valid.data.email,
    //     phone: valid.data.phone,
    //     organization: valid.data.organization,
    //   },
    // });

    const info = await transporter.sendMail({
      from: '"IMPACT" <a.s.scherba@yandex.by>', // От кого
      to: process.env.YANDEX_SMTP_EMAIL_TO, // Кому (может быть ваш email для теста)
      subject: 'Заявка на партнерство', // Тема письма
      html: /* html */ `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <title>Письмо</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #333;
              background-color: #f9f9f9;
            }
            h1 {
              font-size: 24px;
              font-weight: bold;
              color: #00698f;
            }
            p {
              margin-bottom: 20px;
            }
            a {
              text-decoration: none;
              color: #337ab7;
            }
            a:hover {
              color: #23527c;
            }
            hr {
              border: none;
              border-top: 1px solid #ccc;
              margin: 20px 0;
            }
            footer {
              font-size: 14px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; margin-top: 40px;">${valid.data.organization}</h1>
          <p><b>Email:</b> <a href='mailto:${valid.data.email}' style="font-size: 16px;">${valid.data.email}</a></p>
          <p><b>Телефон:</b> <a href='tel:${valid.data.phone}' style="font-size: 16px;">${valid.data.phone}</a></p>
          <hr>
          <footer>
            <p style="margin-bottom: 20px;">${valid.data.name}</p>
          </footer>
        </body>
        </html>
      `,
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
