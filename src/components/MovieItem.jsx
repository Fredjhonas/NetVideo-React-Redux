import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFavorite, deleteFavorite } from "../redux/Movie/movie.actions";

import "../assets/styles/components/CarouselItem.scss";
import "../assets/styles/components/Categories.scss";
//import playIcon from '../assets/static/play-icon.png';
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";

const MovieItem = (props) => {
  const { id, year, image, votes, calification, documentID, title, isList } =
    props;

  const handleSetFavorite = () => {
    props.setFavorite({
      id,
      year,
      image,
      votes,
      calification,
      title,
    });
  };

  const handleDeleteFavorite = (documentID) => {
    props.deleteFavorite(documentID);
  };
  const { currentUser } = props;
  //console.log("Usuario", currentUser);

  return (
    <div className="carousel-item" key={id}>
      <img className="carousel-item__img" src={image} alt={image} />
      <div className="carousel-item__details">
        <div>
          {currentUser ? (
            <>
              {isList ? (
                <img
                  className="carousel-item__details--img"
                  src={removeIcon}
                  alt="Remove Icon"
                  onClick={() => handleDeleteFavorite(documentID)}
                />
              ) : (
                <img
                  className="carousel-item__details--img"
                  src={plusIcon}
                  alt="Plus Icon"
                  onClick={handleSetFavorite}
                />
              )}
            </>
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

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite,
};
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
