import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "../lib/fetch-one-movie";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } }
    ],
    fallback: true
  }
}

export async function getStaticProps(context: GetServerSidePropsContext) {
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

  if (router.isFallback) return "로딩중입니다.";
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
  );
}