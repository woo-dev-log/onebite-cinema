import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useCallback, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

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

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}