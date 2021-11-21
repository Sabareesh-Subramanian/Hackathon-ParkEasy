import MenuIcon from "@mui/icons-material/Menu";
import star from "../icons/star.svg";
import Map from ".././sub-components/Map";
import back from "../icons/back.svg";
import disabled from "../icons/disabled.svg";
import motorcycle from "../icons/motorcycle.svg";
import directions from "../icons/directions.svg";
import booknow from "../icons/book-snow.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BookingPage } from "./BookingPage";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const IndividualSpot = () => {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(false);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const details = JSON.parse(localStorage.getItem("GoogleDetails"));
  const handleBooking = async () => {
    try {
      let res = await axios.post(" http://localhost:8000/parking/book", {
        parking_id: selectedSpot._id,
        slot: "car", // to be changed once we add radio buttons
        mobile: 8098806664,
        user: details.name, // to be changed once we get Google details
      });
      console.log("res:", res);
    } catch (error) {
      console.log("error:", error);
      if (error) {
        setError(true);
      }
    }
  };
  const [selectedSpot, setSelectedSpot] = useState({});
  const { id } = useParams();
  const getDetails = async () => {
    let res = await axios.get(`http://localhost:8000/admin/parking_data/${id}`);
    // console.log("res:", res.data.data.parking_data);
    setSelectedSpot(res.data.data.parking_data);
  };
  useEffect(() => {
    getDetails();
  }, []);
  // 	<form action="http://maps.google.com/maps" method="get" target="_blank">
  //     <label for="saddr">Enter your location</label>
  //     <input type="text" name="saddr" />
  //     <input
  //       type="hidden"
  //       name="daddr"
  //       value="350 5th Ave New York, NY 10018 (Empire State Building)"
  //     />
  //     <input type="submit" value="Get directions" />
  //   </form>;

  function myNavFunc(lat, log) {
    // If it's an iPhone..
    if (
      navigator.platform.indexOf("iPhone") != -1 ||
      navigator.platform.indexOf("iPod") != -1 ||
      navigator.platform.indexOf("iPad") != -1
    )
      window.open(
        `maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${log}`
      );
    else
      window.open(
        `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${log}`
      );
  }

  return Object.keys(selectedSpot).length === 0 ? (
    "Loading ..."
  ) : (
    <>
      <div className="border border-0 p-2 textAlignLeft">
        {/* <div>
           <p>Home</p>
					<p>Logout</p> 
          <img width="30" alt="" src={back} />
        </div> */}
        <div className="d-flex mt-2 justify-content-between">
          <div className="d-flex">
            <MenuIcon />
            <p className="ms-3">Welcome, {details.givenName}</p>
          </div>
          <Link to="/">
            <LogoutIcon />
          </Link>
        </div>
        <p>Details of the Selected Location</p>

        {/* <img
          className="img-fluid"
          src="https://miro.medium.com/max/2000/1*eIRxvhYoWZ1dIDZD8dS1fA.png"
          alt=""
        /> */}
        <div className="flex jsc-sa">
          <div>
            <div style={{ fontSize: 22 }}>
              <b>{selectedSpot.name}</b>
            </div>

            <div>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="svgfeatures">
            <img sty height="50" alt="" src={motorcycle} />
            {selectedSpot.disabled_slot ? (
              <img height="40" alt="" src={disabled} />
            ) : null}
          </div>
        </div>

        <p>Total Car Slots Available:{selectedSpot.car_slots_available}</p>
        <p>Total Bike Slots Available:{selectedSpot.bike_slots_available}</p>
        <p>Price for Car:₹{selectedSpot.price_slabs.car_slab[0]}/hour</p>
        <p>Price for Bike:₹{selectedSpot.price_slabs.bike_slab[0]}/hour</p>
        <p>
          Disabled Friendly Parking :{" "}
          {selectedSpot.disabled_slot
            ? `Yes, ${selectedSpot.disabled_slot_available} slots available`
            : "No"}
        </p>
        {/* <p>
					Rating:{newSpot.rating} <img src={star} alt="rating" />
				</p> */}
        {/* <div className="flex" style={{ height: "70px" }}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              myNavFunc(
                selectedSpot.loc.coordinates[0],
                selectedSpot.loc.coordinates[1]
              )
            }
          >
            <img
              style={{ display: "block", margin: "0 auto" }}
              height="45"
              alt="icon"
              src={directions}
            />
            <div style={{ color: "#1A72E9" }}>DIRECTIONS</div>
          </div>
          <div
            onClick={handleBooking}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          >
            <img
              style={{ display: "block", margin: "0 auto" }}
              height="45"
              alt="icon"
              src={booknow}
            />
            <div
              style={{
                color: "#1A72E9",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              BOOK NOW
            </div>
          </div>
        </div> */}
        <div className="d-flex justify-content-center my-3">
          <button onClick={handleOpen} className="btn btn-outline-dark">
            Book Now
          </button>
        </div>
        <div
          style={{
            maxWidth: "350px",
            maxHeight: "200px",
          }}
        >
          <Map />
        </div>
        {/* <div id="map"></div> */}
      </div>
      {/* Success Modal  */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {error
                ? "Uh Oh! There's a failure!"
                : payment
                ? "Booking Success!"
                : "Confirm Payment"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {error
                ? "Looks like others have over passed you. Please try a different parking spot."
                : payment
                ? "Woohoo! You've successfully booked yourself a parking spot. Enjoy your shopping now! :)"
                : "Please pay the price for the first one hour and book yourself a parking spot."}
            </Typography>
            {error ? (
              <Link to="/spots">
                <button className="btn btn-outline-dark mt-3">
                  Search for a different spot
                </button>{" "}
              </Link>
            ) : payment ? (
              <button
                onClick={() =>
                  myNavFunc(
                    selectedSpot.loc.coordinates[0],
                    selectedSpot.loc.coordinates[1]
                  )
                }
                className="btn btn-outline-dark mt-3"
              >
                Navigate to Spot
              </button>
            ) : (
              <button
                onClick={() => {
                  setPayment(true);
                  handleBooking();
                }}
                className="btn btn-outline-dark mt-3"
              >
                Pay Now
              </button>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};
