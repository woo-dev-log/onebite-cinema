import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import Movies from "@/dommy.json";
import MovieItem from "@/components/movie-item";

export default function Page() {
  return (
    <div className="recommended-movies">
      {Movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}