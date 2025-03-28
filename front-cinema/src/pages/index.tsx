import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import Movies from "@/dommy.json";
import MovieItem from "@/components/movie-item";

export default function Home() {
  const randomMovies = [...Movies].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className="recommended-movies">
          {randomMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className="all-movies">
          {Movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
        </div>
      </section>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}