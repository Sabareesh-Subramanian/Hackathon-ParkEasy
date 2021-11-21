import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map from "./Map";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

export const LandingPage = ({ setLogin }) => {
  const [location, setLocation] = useState("");
  const details = JSON.parse(localStorage.getItem("GoogleDetails"));
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLocation(position.coords.latitude + "," + position.coords.longitude);
    localStorage.setItem(
      "startpoints",
      JSON.stringify({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      })
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <div className="d-flex m-2 justify-content-between">
        <div className="d-flex">
          <MenuIcon />
          <p className="ms-3">Welcome, {details.givenName}</p>
        </div>
        <Link to="/">
          <LogoutIcon />
        </Link>
      </div>
      <div style={{ height: "200px", width: "360px" }}>
        <Map
        //   lat={location.trim().split(",")[0]}
        //   long={location.trim().split(",")[0]}
        />
      </div>
      {/* <br /> */}
      <p className="lead mt-5">
        Type your destination point and find out all parking spots available for
        booking at the moment
      </p>
      <div>
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
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
