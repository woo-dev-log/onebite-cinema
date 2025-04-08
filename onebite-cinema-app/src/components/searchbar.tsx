"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./searchbar.module.css";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onClickSearch = () => {
    router.push(`/search?q=${search}`);
  }

  const onKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickSearch();
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <div className={style.searchbar_container}>        
      <input type="text" value={search}
        onKeyDown={onKeyDownSearch}
        onChange={onChangeSearch}
        />
      <button onClick={onClickSearch}>검색</button>
    </div>
  );
}