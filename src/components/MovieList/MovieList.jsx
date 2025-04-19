import React from 'react'
import MovieItem from '../MovieItem/MovieItem';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import css from './MovieList.module.css';

const MovieList = ({ movies}) => {
  return (
      <>
          <ul className={css.list}>
              {movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <MovieItem movie={movie} />
                        </li>
                    )
            })}  
          </ul>
      </>
  )
}

export default MovieList