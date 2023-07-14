import React from 'react';
import Header from '../components/Header';

const NotFound = () => {
  return (
    <div className='home-main'>
      <Header />
      <div className='home-main__container'>
        <h1>Ups..!</h1>
        <h2>Página no encontrada</h2>
      </div>
    </div>
  );
};

export default NotFound;
