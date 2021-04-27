import React from "react";
import { useSelector } from "react-redux";
import noPoster from "../assets/static/noposter.jpg";
import Search from "../components/Search";
import Header from "../components/Header";
import MovieItem from "../components/MovieItem";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Loader from "../components/Loader";

import "../assets/styles/App.scss";

const Home = () => {
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const mylist = useSelector((state) => state.data.mylist);

  let ResultData;
  if (!data && !loading) {
    ResultData = <Loader />;
  } else if (loading) {
    ResultData = <Loader />;
  } else {
    ResultData = data.map((item) => {
      let image;
      if (item.poster_path === null) {
        image = noPoster;
      } else {
        image = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      }
      const { id } = item;
      const calification = item.vote_average;
      const votes = item.vote_count;
      const year = item.release_date;
      const { title } = item;

      return (
        <MovieItem
          key={id}
          image={image}
          id={id}
          calification={calification}
          votes={votes}
          year={year}
          title={title}
        />
      );
    });
  }
  return (
    <div className="home-main">
      <Header />
      <Search isHome />
      {mylist.length > 0 && (
        <Categories title="Mi lista">
          <Carousel>
            {mylist.map((item) => (
              <MovieItem key={item.id} id={item.id} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}

      {ResultData.length > 0 && (
        <Categories title="Resultados">
          <Carousel>{ResultData}</Carousel>
        </Categories>
      )}
    </div>
  );
};

export default Home;
