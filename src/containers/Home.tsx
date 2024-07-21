import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { Favorite } from '../interfaces/favorite';
import { fetchFavorites } from '../redux/Movie/movie.actions';

// components
import MovieItem from '../components/MovieItem';
import Search from '../components/Search';
// import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Loader from '../components/Loader';

// assets
import noPoster from '../assets/static/noposter.jpg';
import '../assets/styles/App.scss';
import "../assets/styles/components/Carousel.scss";
import { useMobile } from '../hooks/useMobile';


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const { currentUser } = useSelector(mapState);
  const { data, isFetching, refetch, isPaused } = useFetchMovies(searchDebounce);
  const mylist = useSelector((state: any) => state.movie.mylist);
  const dispatch = useDispatch();
  const { isMobile, isTablet } = useMobile();
  const slidesPerView = isMobile ? 1 : isTablet ? 3 : 5;

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchFavorites() as any);
    }
  }, [currentUser]);

  const searchProps = { isHome: true, search, setSearch, refetch, setSearchDebounce };

  useEffect(() => {
    if (searchDebounce.length > 0) {
      refetch();
    }
  }, [searchDebounce]);

  return (
    <div className="home-main">
      <Search {...searchProps} />
      {isPaused ? (
        <div className='home-main__container'>
          <h1>Ups..!</h1>
          <h2>Inconvenientes con la conexión...</h2>
        </div>
      ) : (
        <div>
            {mylist?.length > 0 && (
            <div style={{ marginBottom:  40 }}>
            <Categories title="Mi lista">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={false}
                spaceBetween={40}
                pagination={{ clickable: true }}
                slidesPerView={slidesPerView}
                className = "carousel__container"
              >
                {mylist.map((item: Favorite) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <MovieItem isList {...item} />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </Categories>
            </div>  
            )}
            
          {isFetching ? (<Loader />) :
            (
              searchDebounce?.length > 0 ?
                <Categories title="Resultados de la busqueda">
                  {data?.length === 0 && <h4 className="p-4 text-center">No hay resultados</h4>}
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={false}
                    spaceBetween={40}
                    pagination={{ clickable: true }}
                    slidesPerView={slidesPerView}
                    className="carousel__container"
                  >
                    {data?.slice(0, 10).map((item) => {
                      const { id, title, poster_path } = item;
                      const image = poster_path === null ? noPoster : `https://image.tmdb.org/t/p/w500${poster_path}`;
                      const calification = item.vote_average;
                      const votes = item.vote_count;
                      const year = item.release_date;

                      return (
                        <SwiperSlide key={id}>
                          <MovieItem
                            image={image}
                            id={id}
                            calification={calification}
                            votes={votes}
                            year={year}
                            title={title}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Categories> : null
            )
          }
        </div>
      )}
    </div>
  );
}

export default Home;
