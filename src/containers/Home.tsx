import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites } from '../redux/Movie/movie.actions';
import { useFetchMovies } from '../hooks/useFetchMovies';

// components
import Search from '../components/Search';
import Header from '../components/Header';
import MovieItem from '../components/MovieItem';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Loader from '../components/Loader';

// assets
import noPoster from '../assets/static/noposter.jpg';
import '../assets/styles/App.scss';
import { Favorite } from '../interfaces/favorite';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Home = () => {
  const [search, setSearch] = useState("");
  const { currentUser } = useSelector(mapState);
  const { data, isLoading, refetch } = useFetchMovies(search);
  const mylist = useSelector((state: any) => state.movie.mylist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchFavorites() as any);
    }
  }, [currentUser]);

  const searchProps = { isHome: true, search, setSearch, refetch };

  return (
    <div className="home-main">
      <Header />
      <Search {...searchProps} />
      {mylist?.length > 0 && (
        <Categories title="Mi lista">
          <Carousel>
            {mylist.map((item: Favorite) => <MovieItem key={item.id} isList {...item} />)}
          </Carousel>
        </Categories>
      )}
      <br />
      <br />
      {isLoading ? (<Loader />) :
        (
          search?.length > 0 ?
            <Categories title="Resultados">
              {data?.length === 0 && <h4 className="p-4">No hay resultados</h4>}
              <Carousel>
                {data?.slice(0, 10).map((item) => {
                  const { id, title, poster_path } = item;
                  const image = poster_path === null ? noPoster : `https://image.tmdb.org/t/p/w500${poster_path}`;
                  const calification = item.vote_average;
                  const votes = item.vote_count;
                  const year = item.release_date;

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
                })}
              </Carousel>
            </Categories> : null
        )
      }
    </div>
  );
}

export default Home;
