import { GLogin } from "./GoogleLogin";
import styles from "./Login.module.css";

export const Login = ({ setLogin }) => {
  return (
    <div className={styles.container}>
      <div className='d-flex justify-content-center mt-5 '>
        <img
          className='col-3 me-3'
          // src='https://i.pinimg.com/originals/4a/30/77/4a30772e96d7352a26414cd60de33655.gif'
          src='https://cdn.dribbble.com/users/1287580/screenshots/5410442/dribbble_2.gif'
          alt='Logo'
        />
        <p className='display-5'>Park Easy</p>
      </div>
      <p className='lead mt-5'>
        A one stop solution for all your vehicle parking needs.
      </p>
      <div className='d-flex justify-content-evenly mt-5'>
        <GLogin />
      </div>
    </div>
  );
};
