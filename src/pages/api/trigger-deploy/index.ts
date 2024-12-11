import type { APIRoute } from "astro";
import axios from "axios";
import "dotenv/config";

export const prerender = false;
const ALLOWED_ORIGIN = "https://api.bnbhost.ru";

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin");

  if (origin !== ALLOWED_ORIGIN) {
    return new Response(null, { status: 403 });
  }

  const headers = new Headers({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  try {
    const response = await axios.get("/api/deployment.all", {
      baseURL: process.env.DOKPLOY_URL,
      headers: {
        Authorization: "Bearer " + process.env.DOKPLOY_AUTH_TOKEN,
      },
      params: { applicationId: process.env.DOKPLOY_APP_ID },
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500, headers });
  }
};

export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin");

  const headers = new Headers({
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  return new Response(null, { status: 204, headers });
};
