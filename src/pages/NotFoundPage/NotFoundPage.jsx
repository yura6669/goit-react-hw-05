import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import css from "./NotFoundPage.module.css"

const NotFoundPage = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(3);
    useEffect(() => { 
        const timer =  setTimeout(() => {
            navigate("/", {replace: true});
        }, 3000);
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
         }, 1000);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [navigate]);
    const second = timer< 2 ? "second" : "seconds";
  return (
      <div className={css.container}>
          <p className={css.message}>Oops... This page not found!<br />Auto return after <span>{timer} { second}</span></p>
    </div>
  )
}

export default NotFoundPage