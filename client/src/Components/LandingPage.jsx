import { Link } from "react-router-dom";

export const LandingPage = ({ setLogin }) => {
  return (
    <>
      <div className="d-flex m-2 justify-content-between">
        <p>Welcome, Sabareesh</p>
        <p
          onClick={() => {
            setLogin("false");
          }}
        >
          Logout
        </p>
      </div>
      <p className="lead mt-5">
        Type your destination point and find out all parking spots available for
        booking at the moment
      </p>
      <div>
        <input
          type="text"
          className="form-control mt-5 text-center"
          placeholder="Enter your destination"
        />
      </div>
      <Link to="/spots">
        <button className="btn btn-outline-secondary mt-5 mb-5">
          Search Now
        </button>
      </Link>
    </>
  );
};
