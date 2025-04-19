import { IoReturnUpBack } from "react-icons/io5";
import css from './BackButton.module.css';

const BackButton = ({onBack}) => {
  return (
      <>
          <button type="button" onClick={() => onBack()} className={css.button}>
              <IoReturnUpBack className={css.icon} />
                <span>Back</span>
        </button>
      </>
  )
}

export default BackButton