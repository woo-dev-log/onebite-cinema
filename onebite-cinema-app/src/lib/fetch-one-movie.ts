import { MovieData } from "@/types";

export default async function fetchOneMovie(
  id: number
): Promise<MovieData | null> {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`;

  try {
    const response = await fetch(url, { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error('영화 정보를 가져오는데 실패했습니다');
    }

    return await response.json();
  } catch (err) {
    console.error(err);

    return null;
  }
}