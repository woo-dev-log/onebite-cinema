import { MovieData } from "@/types";

export default async function fetchRandomMoives(): Promise<MovieData[]> {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`;

  try {
    const response = await fetch(url, { next: { revalidate: 10 } });

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}