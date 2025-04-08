import style from "./page.module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import Head from "next/head";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const movieData = await fetchOneMovie(Number(id));

  if (!movieData) {
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
    );
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