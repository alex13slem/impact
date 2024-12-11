import type { APIRoute } from "astro";
import axios from "axios";
import "dotenv/config";

export const prerender = false;

export const GET: APIRoute = async () => {
  const data = { applicationId: process.env.DOKPLOY_APP_ID };
  try {
    const response = await axios.post(
      "/api/application.deploy",
      JSON.stringify(data),
      {
        baseURL: process.env.DOKPLOY_URL,
        headers: {
          Authorization: "Bearer " + process.env.DOKPLOY_AUTH_TOKEN,
        },
      }
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
