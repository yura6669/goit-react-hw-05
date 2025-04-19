import React from 'react'
import { useParams, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Suspense } from "react";
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import BackButton from '../../components/BackButton/BackButton';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getFilmDetails, getApiKey } from '../../core/api';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
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
            axios.get(getFilmDetails(movieId), options).then((response) => {
                setMovie(response.data);
            }).catch(() => {
                setError('Error fetching data. Please try again later.');
            }).finally(() => {
                setIsLoading(false);
            });
        }
    });
    const isShowError = error !== '';
    const activeLink = ({ isActive }) => { 
    return clsx(css.additionalItem, {
        [css.active]: isActive,
    });
    }
    
    const location = useLocation();

    const navigate = useNavigate();
    
    const onBack = () => { 
        const backLinkHref = location.state?.from ?? '/movies';
        navigate(backLinkHref);
    }
  return (
      <>
          <BackButton onBack={onBack} />  
          {movie && <MovieDetail movie={movie} />}
          {isLoading && <Loader />}
          {isShowError && <ErrorMessage message={error} />}
          <div className={css.additionaContainer}>
              <h3 className={css.additionalTitle}>Additional information</h3>   
          <ul className={css.additionalList}>
              <li>
                    <NavLink to="cast" state={location.state} className={activeLink}>Cast</NavLink>
              </li>
              <li>
                    <NavLink to="reviews" state={location.state} className={activeLink}>Reviews</NavLink>
              </li>
            </ul>
          </div>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
      </>
  )
}

export default MovieDetailsPage