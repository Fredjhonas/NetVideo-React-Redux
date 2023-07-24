import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setFavorite, deleteFavorite } from "../redux/Movie/movie.actions";


import "../assets/styles/components/CarouselItem.scss";
import "../assets/styles/components/Categories.scss";
//import playIcon from '../assets/static/play-icon.png';
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";


interface MovieItemProps {
  id: number;
  year: string;
  image: string;
  votes: number;
  calification: number;
  documentID?: string;
  title: string;
  isList?: boolean;
}

const MovieItem = ({ id, year, image, votes, calification, title, isList, documentID }: MovieItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);

  const handleSetFavorite = () => {
    dispatch(setFavorite({
      id,
      year,
      image,
      votes,
      calification,
      title,
    }) as any)
  };

  const handleDeleteFavorite = (documentID: string) => {
    dispatch(deleteFavorite(documentID) as any)
  };

  const goToMovie = () => {
    navigate(`/movie/${id}`)
  }


  return (
    <div className="carousel-custom-item" key={id} onClick={goToMovie}>
      <img className="carousel-item__img" src={image} alt={image} />
      <div className="carousel-item__details">
        <div>
          {currentUser ? (
            <div>
              {isList ? (
                <img
                  className="carousel-item__details--img"
                  src={removeIcon}
                  alt="Remove Icon"
                  onClick={() => handleDeleteFavorite(documentID as string)}
                />
              ) : (
                <img
                  className="carousel-item__details--img"
                  src={plusIcon}
                  alt="Plus Icon"
                  onClick={handleSetFavorite}
                />
              )}
            </div>
          ) : (
            <Link to="/login">
              <img
                className="carousel-item__details--img"
                src={plusIcon}
                alt="Plus Icon"
              />
            </Link>
          )}
        </div>

        <p className="carousel-item__details--title">{title}</p>

        <p className="carousel-item__details--subtitle">{` Votos: ${votes}`}</p>
        <p className="carousel-item__details--subtitle">
          {`Calificación: ${calification}`}{" "}
        </p>
        <p className="carousel-item__details--subtitle">
          {`Lanzamiento: ${year}`}{" "}
        </p>
      </div>
    </div>
  );
};

export default MovieItem
