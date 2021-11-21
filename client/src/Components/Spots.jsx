import MenuIcon from "@mui/icons-material/Menu";
import star from "../icons/star.svg";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export const Spots = () => {
  const details = JSON.parse(localStorage.getItem("GoogleDetails"));
  const [spots, setSpots] = useState([]);

  const { lat, long } = JSON.parse(localStorage.getItem("startpoints"));

  useEffect(() => {
    getSpots();
  }, []);

  const getSpots = async () => {
    console.log(lat, long);
    let res = await axios.post("http://localhost:8000/parking/find_places", {
      lat: lat,
      long: long,
    });
    setSpots(res.data.data.parkings);
  };

  const getDisabledSpots = async () => {
    let res = await axios.post("http://localhost:8000/parking/find_places", {
      lat: lat,
      long: long,
      disabled_slot: true,
    });

    setSpots(res.data.data.parkings);
  };

  return spots.length === 0 ? (
    "Loading"
  ) : (
    <>
      <div className='d-flex mt-2 justify-content-between'>
        <div className='d-flex'>
          <MenuIcon />

          <p className='ms-3'>Welcome, {details.givenName}</p>
        </div>
        <Link to='/'>
          <LogoutIcon />
        </Link>
      </div>
      <p className='text-start'>
        You're lucky! We've found {spots.length} parking spots close to your
        destination.
      </p>
      <div
        className='d-flex justify-content-between'
        style={{ alignItems: "center" }}
      >
        <FormControl className='col-3'>
          <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            onChange={(e) => {
              console.log("Select", e.target);
            }}
            label='Age'
          >
            <MenuItem value='RatingHightoLow'>Rating : High to Low</MenuItem>
            <MenuItem value='RatingLowtoHigh'>Rating : Low to High</MenuItem>
            <MenuItem value='PriceLowtoHigh'>Price : Low to High</MenuItem>
          </Select>
        </FormControl>
        <div class='form-check'>
          <label class='form-check-label' for='flexCheckDefault'>
            Parking for Disabled?
          </label>
          <input
            onChange={(e) => {
              // console.log("Test", e.target.checked);
              if (e.target.checked) {
                getDisabledSpots();
              } else {
                getSpots();
              }
            }}
            class='form-check-input'
            type='checkbox'
            value=''
            id='flexCheckDefault'
          />
        </div>
      </div>
      <div>
        {spots.map((newSpot) => {
          return (
            <div key={newSpot.id} className='border border-2 m-2 shadow p-2'>
              <div className='d-flex justify-content-between '>
                <div className='text-start'>
                  <p>Name : {newSpot.name}</p>
                  <p>
                    Disabled Friendly Parking :{" "}
                    {newSpot.disabled_slot ? "Yes" : "No"}
                  </p>
                  <p></p>
                </div>
                <div className='text-end'>
                  <p>Price:₹{newSpot.price_slabs.car_slab[0]}/hour</p>
                  <p>
                    Rating:{newSpot.user_rating} <img src={star} alt='rating' />
                  </p>
                </div>
              </div>
              <div className='text-end'>
                <Link to={`/spots/${newSpot._id}`}>
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
