import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useFetchMovies } from "../hooks/useFetchMovies";

import "../assets/styles/components/Search.scss";

const Search = (isHome) => {
  const [search, setSearch] = useState("");
  const fetchQuery = useFetchMovies(search);


  const handleChange = (e) => {
    setSearch(e.target.value);
    fetchQuery.refetch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuery.refetch();
  };

  return (
    <>
      <section className="main">
        <h2 className="main__title">¿Qué quieres ver hoy?</h2>
        <form className="search col-md-6" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search_input"
            name="search"
            placeholder="Buscar..."
            onChange={handleChange}
            value={search}
          />
          <button type="submit" className="search_btn">
            <MdSearch />
          </button>
        </form>
      </section>
    </>
  );
};

export default Search;
