import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "../lib/fetch-one-movie";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params!.id;
  const movieData = await fetchOneMovie(Number(id));

  return {
    props: {
      movieData
    }
  };
}

export default function Page({
  movieData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movieData) return "문제가 발생했습니다. 다시 시도하세요.";

  const {
    id,
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
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div>{releaseDate} / {genres} / {runtime}</div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}