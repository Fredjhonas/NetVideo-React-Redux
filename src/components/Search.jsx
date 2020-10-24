/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import { searchFetchApi } from '../actions/index';

import '../assets/styles/components/Search.scss';

const Search = (isHome) => {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const fetchApi = (search) => dispatch(searchFetchApi(search));

  const err = useSelector((state) => state.data.err);

  const handleChange = (e) => {

    setSearch(e.target.value);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(search);

  };

  return (
    <>
      {err ? console.log(err) : null}
      <section className='main'>
        <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
        <form className='search' onSubmit={handleSubmit}>
          <input
            type='text'
            className='search_input'
            name='search'
            placeholder='Buscar...'
            onChange={handleChange}
            value={search}
          />
          <button type='submit' className='search_btn'><MdSearch /></button>
        </form>
      </section>
    </>
  );
};

export default Search;
