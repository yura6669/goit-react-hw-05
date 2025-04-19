import React from 'react'
import { getImageUrl } from '../../core/helpers';
import css from './MovieItem.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TbInfoSquareFilled } from "react-icons/tb";

const MovieItem = ({ movie }) => {
    const { id, title, poster_path } = movie;
    const navigate = useNavigate();
    const location = useLocation();
  return (
      <div className={css.container}>
          <p className={css.title}>{title}</p>
          <img src={getImageUrl(poster_path)} alt={title} className={css.img} />
          <button type="button" className={css.button} onClick={() => navigate(`/movies/${id}`, {
              state: {
                    from: location,
              }
          })}>
              <div className={css.buttonContainer}>
                  More info
                  <TbInfoSquareFilled className={css.buttonIcon} />
              </div>
          </button>
    </div>
  )
}

export default MovieItem