import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setFavorite, deleteFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = (props) => {
  const { user, id, cover, title, year, contentRating, duration, isList } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleSetFavorite = () => {
    props.setFavorite({
      id,
      cover,
      title,
      year,
      contentRating,
      duration,
    });
  };

  const handleDeleteFavorite = (itemId) => {
    props.deleteFavorite(itemId);
  };
  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          {hasUser ? (
            <Link to={`/player/${id}`}>
              <img className='carousel-item__details--img' src={playIcon} alt='Play Icon' />
            </Link>
          ) : (
            <Link to='/login'>
              <img className='carousel-item__details--img' src={playIcon} alt='Play Icon' />
            </Link>
          )}

          {hasUser ? (
            <>
              {isList ? (
                <img
                  className='carousel-item__details--img'
                  src={removeIcon}
                  alt='Remove Icon'
                  onClick={() => handleDeleteFavorite(id)}
                />
              ) : (
                <img
                  className='carousel-item__details--img'
                  src={plusIcon}
                  alt='Plus Icon'
                  onClick={handleSetFavorite}
                />
              )}
            </>
          ) : (
            <Link to='/login'>
              <img
                className='carousel-item__details--img'
                src={plusIcon}
                alt='Plus Icon'
              />
            </Link>
          )}
        </div>

        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>{`${year} ${contentRating} ${duration} `}</p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
