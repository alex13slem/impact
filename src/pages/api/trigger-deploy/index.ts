import type { APIRoute } from "astro";
import axios from "axios";
import "dotenv/config";

export const prerender = false;

export const POST: APIRoute = async () => {
  const response = await axios.get("/api/deployment.all", {
    baseURL: process.env.DOKPLOY_URL,
    headers: {
      Authorization: "Bearer " + process.env.DOKPLOY_AUTH_TOKEN,
    },
    params: { applicationId: process.env.DOKPLOY_APP_ID },
  });

  return new Response(JSON.stringify(response.data), { status: 200 });
};
