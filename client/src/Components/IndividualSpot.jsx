import Map from ".././sub-components/Map";
import disabled from "../icons/disabled.svg";
import motorcycle from "../icons/motorcycle.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

  const details = JSON.parse(localStorage.getItem("GoogleDetails"));
  const [booking_details, setBookingDetails] = useState(["car", details.name]);
  const [input, setInput] = useState("");

  const [selectedSpot, setSelectedSpot] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const { id } = useParams();

  const getDetails = async () => {
    let res = await axios.get(`http://localhost:8000/admin/parking_data/${id}`);
    setSelectedSpot(res.data.data.parking_data);
  };

  const handleBooking = async () => {
    let [slot, name] = booking_details;
    try {
      await axios.post(" http://localhost:8000/parking/book", {
        parking_id: selectedSpot._id,
        slot: slot,
        mobile: 8098806664,
        user: name,
        vehicleNumber: vehicleNumber,
      });
      handleClose();
      getDetails();
    } catch (error) {
      setError(true);
    }
  };

  const handleOpen = (slot, name) => {
    setOpen(true);
    setBookingDetails([slot, name]);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setError(false);
    setPayment(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getDetails();
  }, []);

  function myNavFunc(lat, log) {
    handleCloseModal();
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
        <div>
          <TextField
            className="mt-3"
            id="outlined-basic"
            value={vehicleNumber}
            label="Vehicle Number"
            variant="standard"
            onChange={(e) => {
              setVehicleNumber(e.target.value);
            }}
          />{" "}
          <br /> <br />
          <Button
            style={{ backgroundColor: "#00b386", color: "white" }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Book now
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleOpen("car", details.name)}>
              Book for car
            </MenuItem>
            <MenuItem onClick={() => handleOpen("bike", details.name)}>
              Book for bike
            </MenuItem>
            {selectedSpot.disabled_slot ? (
              <MenuItem onClick={() => handleOpen("disabled", details.name)}>
                Book disabled friendly
              </MenuItem>
            ) : null}
          </Menu>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleCloseModal}
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

            {/* {error ? null : payment ? null : (
              <input
                type='text'
                style={{ padding: "0 10px" }}
                value={input}
                placeholder='Enter Registration number'
                onChange={(e) => e.target.value}
              />
            )} */}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {error
                ? "Looks like others have over passed you. Please try a different parking spot."
                : payment
                ? "Woohoo! You've successfully booked yourself a parking spot. Enjoy your shopping now! :)"
                : "Please pay the price for the first one hour and book yourself a parking spot."}
            </Typography>
            {/* {!error && !payment ? (
              
            ) : null} */}
            <br />
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
