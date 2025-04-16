import { MovieData } from "@/types";

export default async function fetchMoives(
  q?: string
): Promise<MovieData[]> {
  let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url, { next: { revalidate: 24 * 60 * 60 } });

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}