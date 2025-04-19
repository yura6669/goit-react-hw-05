import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getApiKey, getFilmCredits } from "../../core/api";
import { getImageUrl } from "../../core/helpers";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from './MovieCast.module.css';


const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const isMounted = useRef(false);
    useEffect(() => { 
        if (!isMounted.current) { 
            isMounted.current = true;
            setIsLoading(true);
            setError('');
            const options = {
                headers: {
                    Authorization: 'Bearer ' + getApiKey(),
                },
            };
            axios.get(getFilmCredits(movieId), options).then((response) => {
                setCast(response.data.cast);
            }).catch(() => {
                setError('Error fetching data. Please try again later.');
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [movieId])
    const isShowError = error !== '';
  return (
      <>
          {cast.length > 0 && (
              <ul className={css.list}>
              {cast.map((castItem) => {
                    return (
                        <li key={castItem.id} className={css.item}>
                            <img src={getImageUrl(castItem.profile_path)} alt={castItem.name} className={css.img} />
                            <p className={css.character}>{castItem.character}</p>
                            <p className={css.actor}>({castItem.name})</p>
                        </li>
                    )
              })}
              </ul>
          )}
          {isLoading && <Loader />}
            {isShowError && <ErrorMessage message={error} />}
      </>
  )
}

export default MovieCast