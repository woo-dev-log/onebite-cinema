import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import fetchRandomMoives from "@/lib/fetch-random-movies";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMoives()
  ]);

  return {
    props: {
      allMovies,
      recoMovies
    },
    revalidate: 3
  };
}

export default function Home({
  allMovies,
  recoMovies
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요."
        />
      </Head>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className="recommended-movies">
          {recoMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className="all-movies">
          {allMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
        </div>
      </section>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}