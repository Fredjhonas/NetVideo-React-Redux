import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchMovieDetail } from '../hooks/useFetchMovieDetail'
import Loader from '../components/Loader'


const MovieDetail = () => {
  const { movieId } = useParams()
  const id = movieId ? +movieId : undefined
  const { data, isLoading, isError, isPaused } = useFetchMovieDetail(id)
  const [loadingVideo, setLoadingVideo] = useState(true)

  const detail = data?.detail
  const videos = data?.video || [];

  const videoUrl = videos.length > 0 ? `https://www.youtube.com/embed/${videos[0]?.key}` : null;
  const image = detail?.poster_path === null ? null : `https://image.tmdb.org/t/p/w500${detail?.poster_path}`;
  const calification = detail?.vote_average || 0;
  const votes = detail?.vote_count || 0;
  const year = detail?.release_date || 0;


  return (
    <div className='home-main d-flex justify-content-center'>
      {isLoading && <Loader />}

      {isError || isPaused && <h1>Ocurrió un error inesperado...</h1>}

      {data && (
        <div className='p-4 m-4 text-center col col-md-6 card bg-info-subtle'>
          {image !== null && videoUrl === null && <img src={image} alt={detail?.title} />}

          {loadingVideo && videoUrl !== null && <Loader />}
          {videoUrl !== null && (
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              title={detail?.title}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setLoadingVideo(false)}
            />
          )}

          <div className='card-body'>
            <h1 className='card-title'>{detail?.title}</h1>
            <div className='d-flex justify-content-between pt-4 pb-4 p-md-4'>
              <p className="">{` Votos: ${votes}`}</p>
              <p className="">
                {`Calificación: ${calification}`}{" "}
              </p>
              <p className="">
                {`Lanzamiento: ${year}`}{" "}
              </p>
            </div>
            <p className='text-start'>{detail?.overview}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetail