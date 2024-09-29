import type { APIRoute } from 'astro';
import axios from 'axios';
import 'dotenv/config';

export const prerender = false;

export const POST: APIRoute = async () => {
  const data = { applicationId: process.env.DOKPLOY_APP_ID };
  const response = await axios.post(
    '/api/application.deploy',
    JSON.stringify(data),
    {
      baseURL: process.env.DOKPLOY_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.DOKPLOY_AUTH_TOKEN,
      },
    },
  );

  return new Response(JSON.stringify(response.data), { status: 200 });
};
