import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { useRouter } from "next/router";
import fetchMoives from "@/lib/fetch-movies";
import Head from "next/head";

export const getStaticPaths = async () => {
  const movies = await fetchMoives();

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() }
  }));

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
) {
  const id = context.params!.id;
  const movieData = await fetchOneMovie(Number(id));

  if (!movieData) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      movieData
    }
  };
}

export default function Page({
  movieData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Head>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요."
        />
      </Head>
    )
  }
  if (!movieData) return "문제가 발생했습니다. 다시 시도하세요.";

  const {
    // id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl
  } = movieData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} alt="posterImgUrl" />
        </div>
        <div className={style.title}>{title}</div>
        <div>{releaseDate} / {genres} / {runtime}</div>
        <div>{company}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>

  );
}