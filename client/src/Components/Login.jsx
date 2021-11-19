import google from "../icons/google.svg";
import facebook from "../icons/facebook.svg";
import twitter from "../icons/twitter.svg";

export const Login = ({ setLogin }) => {
  return (
    <>
      <div className="d-flex justify-content-evenly mt-5">
        <img
          className="col-3"
          src="https://i.pinimg.com/originals/4a/30/77/4a30772e96d7352a26414cd60de33655.gif"
          alt="Logo"
        />
        <p className="display-5">Park Easy</p>
      </div>
      <p className="lead mt-5">
        A one stop solution for all your vehicle parking needs.
      </p>
      <div className="d-flex justify-content-evenly mt-5">
        <button className="btn btn-outline-secondary">Sign Up</button>
        <button
          onClick={() => {
            setLogin("true");
          }}
          className="btn btn-outline-secondary"
        >
          Login
        </button>
      </div>
      <div className="d-flex justify-content-evenly mt-5">
        <img className="col-1" src={google} alt="Google" />
        <img className="col-1" src={facebook} alt="Facebook" />
        <img className="col-1" src={twitter} alt="Twitter" />
      </div>
      <button className="btn btn-link mt-5 mb-5">Know More</button>
    </>
  );
};
