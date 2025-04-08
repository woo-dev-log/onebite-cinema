"use client"

import { MovieData } from "@/types";
import { useCallback, useEffect, useState } from "react";
import fetchMovies from "@/lib/fetch-movies";
import Head from "next/head";
import MovieItem from "@/components/movie-item";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const params = useSearchParams();
  const q = params.get("q");

  const fetchSearchResult = useCallback(async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  }, [q]);

  useEffect(() => {
    if (q) fetchSearchResult();
  }, [q, fetchSearchResult]);

  return (
    <>
      <Head>
        <title>한입 시네마 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마 - 검색 결과" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요."
        />
      </Head>
      <div className="recommended-movies">
        {movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
      </div>
    </>
  );
}