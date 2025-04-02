import { MovieData } from "@/types";

export default async function fetchRandomMoives(): Promise<MovieData[]> {
  const url = `https://onebite-cinema-api-main-nu.vercel.app/movie/random`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}