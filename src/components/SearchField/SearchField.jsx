import toast, { Toaster } from 'react-hot-toast';
import { BiMoviePlay } from "react-icons/bi";
import css from './SearchField.module.css';


const SearchField = ({ onSearch }) => {
    const handleSubmit = (event) => { 
    event.preventDefault();
    const query = event.target.elements.query.value.trim();
    if (query === '') {
      toast.error('Please enter a search text');
      return;
    }
    onSearch(query);
    event.target.reset();
    }
    
  return (
      <>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.inputContainer}>
            <input
              type="text"
              autoComplete="off"
              name="query"
                autoFocus
            placeholder="Search movies"
            className={css.input}
                />
            <button type="submit" className={css.button}>
              <BiMoviePlay className={css.icon} />
                </button>
                </div>
          </form>
          <Toaster position='top-right' toastOptions={{
        style: {
          background: 'red',
          color: 'white',
        },
      }}/>
      </>
  )
}

export default SearchField