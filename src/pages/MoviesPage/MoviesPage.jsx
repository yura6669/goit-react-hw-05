import SearchField from '../../components/SearchField/SearchField';
import { useState, useEffect, useRef } from 'react';
import { getApiKey, searchFilms } from '../../core/api';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const isMounted = useRef(false);
    
    useEffect(() => { 
        if (!isMounted.current) { 
            isMounted.current = true;
            const queryFromParams = searchParams.get('query') ?? '';
           if (queryFromParams !== '') {
                onSearch(queryFromParams);
            }
        }
    }, []);

    useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);
    setError('');

        const url = searchFilms(query, page);
        const options = {
            headers: {
                Authorization: 'Bearer ' + getApiKey(),
            },
        };
    axios.get(url, options)
      .then(response => {
        const { results, total_pages } = response.data;
        if (results.length === 0) {
          setError('No results found. Please try again.');
        }
          setMovies(prevMovies => [...prevMovies, ...results]);
            setTotalPages(total_pages);
      })
      .catch(() => {
        setError('Error fetching data. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
    }, [query, page]);
    
    const onSearch = (query) => { 
        setQuery(query);
    setSearchParams({ query });
    setPage(1);
    setMovies([]);
    setTotalPages(0);
    setError('');
  }

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  }
    const isShowError = error !== '';
    const isShowLoadMoreBtn = movies.length > 0 && !isLoading && page < totalPages;

  return (
      <>
          <SearchField onSearch={onSearch} />
          {movies.length > 0 && <MovieList movies={movies} />}
          {isShowLoadMoreBtn && <LoadMoreBtn onLoadMore={onLoadMore} />}
          {isLoading && <Loader />}
          {isShowError && <ErrorMessage message={error} />}
    </>
  )
}

export default MoviesPage