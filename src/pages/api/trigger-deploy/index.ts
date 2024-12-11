import type { APIRoute } from "astro";
import "dotenv/config";

export const prerender = false;

export const POST: APIRoute = async () => {
  const data = { applicationId: process.env.DOKPLOY_APP_ID };
  try {
    await fetch(process.env.DOKPLOY_URL! + "/api/application.deploy", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.DOKPLOY_AUTH_TOKEN,
      },
      body: JSON.stringify(data),
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error(error);
    let message = "Something went wrong";
    if (error instanceof Error) message = error.message;
    return new Response(message, { status: 500 });
  }
};

export async function OPTIONS() {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  return new Response(null, { status: 204, headers });
}
