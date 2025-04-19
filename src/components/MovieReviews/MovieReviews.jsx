import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getFilmReviews, getApiKey } from "../../core/api";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const isMounted = useRef(false);
  const { movieId } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      setIsLoading(true);
      setError("");
      const options = {
        headers: {
          Authorization: "Bearer " + getApiKey(),
        },
      };
      axios
        .get(getFilmReviews(movieId, page), options)
        .then((response) => {
          const { results, total_pages } = response.data;
          setReviews((prevReviews) => [...prevReviews, ...results]);
          setTotalPages(total_pages);
        })
        .catch(() => {
          setError("Error fetching data. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    }, [page]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  }
    const isShowError = error !== '';
    const isShowLoadMoreBtn = reviews.length > 0 && !isLoading && page < totalPages;
  return (
    <>
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map((review) => {
            const { id, author, content, created_at } = review;
            const date = new Date(created_at);
            const formattedDate = date.toLocaleDateString();
            return (
              <li key={id} className={css.item}>
                <div className={css.itemInfo}>
                  <h3 className={css.itemInfoName}>{author}</h3>
                  <p className={css.itemInfoDate}>{formattedDate}</p>
                </div>
                <p className={css.itemComment}>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : <p className={css.noComments}>No Reviews</p>}
      {isShowLoadMoreBtn && <LoadMoreBtn onLoadMore={onLoadMore} />}
      {isLoading && <Loader />}
      {isShowError && <ErrorMessage message={error} />}
    </>
  )
}

export default MovieReviews