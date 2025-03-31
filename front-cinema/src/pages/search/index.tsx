import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "../lib/fetch-movies";

export async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return{
    props: {
      movies
    }
  };
}

export default function Page({
  movies
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="recommended-movies">
      {movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}