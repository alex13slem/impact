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
      console.error(valid.error);

      return new Response(JSON.stringify(valid.error), { status: 400 });
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT!,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
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
      from: `"${process.env.SITE_NAME_TAB!.toUpperCase()}" <${process.env.SMTP_EMAIL_FROM}>`, // От кого
      to: process.env.SMTP_EMAIL_TO, // Кому (может быть ваш email для теста)
      subject: 'Заявка на партнерство', // Тема письма
      html: /* html */ `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <link href="https://db.onlinewebfonts.com/c/847b70f382f684546a8b4d05395fb35e?family=SovMod" rel="stylesheet">
          <title>Письмо</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              color: white;
              background-color: #00203d;
              border: 1px solid #fbcb6a;
            }
            h1 {
              color: #fbcb6a;
              font-family: 'SovMod', sans-serif;
            }
            p {
              margin-bottom: 20px;
            }
            a {
              color: white;
            }
            header {
              border-bottom: 1px solid #fbcb6a;
              padding: 20px;
            }
            main {
              padding: 20px;
            }

          </style>
        </head>
        <body>
          <h1 style="text-align: center; padding-inline: 20px">Заявка на партнерство</h1>
          <div style="padding: 20px">
            <p><b>Название организации:</b> ${valid.data.organization}</p>
            <p><b>Email:</b> <a href='mailto:${valid.data.email}' style="font-size: 16px;">${valid.data.email}</a></p>
            <p><b>Телефон:</b> <a href='tel:${valid.data.phone}' style="font-size: 16px;">${valid.data.phone}</a></p>
            <p><b>ФИО:</b> ${valid.data.name}</p>
          </div>
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
