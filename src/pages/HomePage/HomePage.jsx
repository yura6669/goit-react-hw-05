import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { getTrendingTodayFilms, getApiKey } from '../../core/api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
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

        axios.get(getTrendingTodayFilms(), options).then((response) => {
            setMovies(response.data.results);
        }).catch(() => {
            setError('Error fetching data. Please try again later.');
        }).finally(() => {
            setIsLoading(false);
        });
        }
    }, []);

    const isShowError = error !== '';

  return (
    <>
          <h2 className={css.title}>Trending today</h2>
           <MovieList movies={movies} />
        {isLoading && <Loader />}
        {isShowError && <ErrorMessage message={error} />}
    </>
  )
}

export default HomePage