import { NavLink } from "react-router-dom"
import clsx from "clsx"
import css from "./Header.module.css"

const activeLink = ({ isActive }) => { 
    return clsx(css.link, {
        [css.active]: isActive,
    });
}


const Header = () => {
  return (
      <header className={css.header}>
          <p className={css.title}>Movie<span>Go</span></p>
            <nav className={css.nav}>
                <NavLink to="/" className={activeLink}>Home</NavLink>
                <NavLink to="/movies" className={activeLink}>Movies</NavLink>
            </nav>
    </header>
  )
}

export default Header