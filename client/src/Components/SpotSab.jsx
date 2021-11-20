import MenuIcon from "@mui/icons-material/Menu";
import star from "../icons/star.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export const SpotNew = () => {
  const newSpot = {
    id: 1,
    name: "Coffee Day Parking",
    landmark: "Near Forum mall",
    price: "20",
    rating: "4.5",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="border border-0 p-2">
        <div className="d-flex mt-2 justify-content-between">
          <div className="d-flex">
            <MenuIcon />
            <p className="ms-3">Welcome, Sabareesh</p>
          </div>
          <Link to="/">
            <LogoutIcon />
          </Link>
        </div>
        <p>Details of the Selected Location</p>
        <img
          className="img-fluid"
          src="https://miro.medium.com/max/2000/1*eIRxvhYoWZ1dIDZD8dS1fA.png"
          alt=""
        />
        <div className="d-flex justify-content-center text-start mt-3">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{newSpot.name}</td>
              </tr>
              <tr>
                <td>Landmark</td>
                <td>{newSpot.landmark}</td>
              </tr>
              <tr>
                <td>Car Slots Available</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Bike Slots Available</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Parking Cost</td>
                <td>{newSpot.price}</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>
                  <span>
                    {newSpot.rating}
                    <img src={star} alt="rating" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-evenly mt-5">
          <button
            // onClick={() => {
            //   alert(
            //     "Parking slot has been booked. Please pay the initial fare now."
            //   );
            // }}
            onClick={handleOpen}
            className="btn btn-outline-dark"
          >
            Book Now
          </button>

          <button className="btn btn-outline-dark">Navigate to Spot</button>
        </div>
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
              Booking Success!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Woohoo! You've successfully booked yourself a parking spot. Enjoy
              your shopping now! :)
            </Typography>
            <button className="btn btn-outline-dark mt-3">
              Navigate to Spot
            </button>
          </Box>
        </Modal>
      </div>
    </>
  );
};
