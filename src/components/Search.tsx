import React, { useEffect } from "react";
import { MdSearch } from "react-icons/md";
import "../assets/styles/components/Search.scss";

interface SearchProps {
  isHome?: boolean;
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchDebounce: React.Dispatch<React.SetStateAction<string>>;
  refetch?: any;
}

const Search = ({ isHome, search, setSearch, refetch, setSearchDebounce }: SearchProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchDebounce(search as string);
    }, 1500);

    return () => clearTimeout(timeout);
  }), [search]

  return (
    <section className="main">
      <h2 className="main__title mb-4">¿Qué quieres ver hoy?</h2>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search_input"
          name="search"
          placeholder="Buscar películas..."
          onChange={handleChange}
          value={search}
        />
        <button type="submit" className="search_btn">
          <MdSearch />
        </button>
      </form>
    </section>
  );
};

export default Search;
