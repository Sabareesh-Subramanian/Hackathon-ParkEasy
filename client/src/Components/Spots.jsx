import MenuIcon from "@mui/icons-material/Menu";
import star from "../icons/star.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const Spots = () => {
  const newSpot = {
    id: 1,
    name: "Coffee Day Parking",
    landmark: "Near Forum mall",
    price: "20",
    rating: "4.5",
  };
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    setSpots([...spots, newSpot]);
  }, []);
  return (
    <>
      <div className="d-flex mt-2 justify-content-between">
        <div className="d-flex">
          <MenuIcon />
          <p className="ms-3">Welcome, Sabareesh</p>
        </div>
        <Link to="/">
          <LogoutIcon />
        </Link>
      </div>
      <p className="text-start">
        You're lucky! We've found 10 parking spots close to your destination.
      </p>
      <div
        className="d-flex justify-content-between"
        style={{ alignItems: "center" }}
      >
        <FormControl className="col-3">
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={age}
            label="Age"
            //   onChange={handleChange}
          >
            <MenuItem value="RatingHightoLow">Rating : High to Low</MenuItem>
            <MenuItem value="RatingLowtoHigh">Rating : Low to High</MenuItem>
            <MenuItem value="PriceLowtoHigh">Price : Low to High</MenuItem>
          </Select>
        </FormControl>
        <div class="form-check">
          <label class="form-check-label" for="flexCheckDefault">
            Parking for Disabled?
          </label>
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </div>
      </div>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
          return (
            <div className="border border-2 m-2 shadow p-2">
              <div className="d-flex justify-content-between ">
                <div className="text-start">
                  <p>Name:{newSpot.name}</p>
                  <p>Landmark:{newSpot.landmark}</p>
                </div>
                <div className="text-end">
                  <p>Price:₹{newSpot.price}/hour</p>
                  <p>
                    Rating:{newSpot.rating} <img src={star} alt="rating" />
                  </p>
                </div>
              </div>
              <div className="text-end">
                <Link to={`/spots/${newSpot.id}`}>
                  <p>More</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
