import { getImageUrl } from "../../core/helpers";
import css from './MovieDetail.module.css';

const MovieDetail = ({ movie }) => {
    const { title, overview, release_date, genres, vote_average, poster_path } = movie;
    const year = release_date.split('-')[0];
    const score = Math.round(vote_average * 10);
  return (
      <div className={css.container}>
          <img src={getImageUrl(poster_path)} alt={title} className={css.poster} />
          <div className={css.info}>
              <h1 className={css.title}>{title} ({year})</h1>
              <p className={css.score}>User score: <span>{score}%</span></p>
              <h2 className={css.subtitle}>Overview</h2>
              <p className={css.overview}>{overview}</p>
              <h2 className={css.subtitle}>Genres</h2>
              <ul className={css.genres}>
                  {genres.map((genre) => {
                        return (
                            <li key={genre.id}>
                                {genre.name}
                            </li>
                        )
                  })}
                </ul>
            </div>
    </div>
  )
}

export default MovieDetail