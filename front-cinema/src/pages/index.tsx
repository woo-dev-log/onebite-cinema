import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import fetchMoives from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import fetchRandomMoives from "@/lib/fetch-random-movies";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMoives(),
    fetchRandomMoives()
  ]);

  return {
    props: {
      allMovies,
      recoMovies
    }
  };
}

export default function Home({
  allMovies,
  recoMovies
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
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