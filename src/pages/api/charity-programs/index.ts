import { fetchCharityPrograms } from "@/lib/data/charityPrograms";
import type { APIRoute } from "astro";
export const prerender = false;

export const GET: APIRoute = async () => {
  const data = [...(await fetchCharityPrograms())].sort(
    (a, b) => a.order - b.order
  );
  return new Response(JSON.stringify(data), { status: 200 });
};
