// import Navbar from "./Navbar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
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

export const Admin = () => {

  const [modal, setModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState({});

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const ModifySlots = async (type, value) => {
    const postObj = {
      id: selectedSpot._id,
      [type]: selectedSpot[type] + value,
    };

    const res = await axios.post(
      "http://localhost:8000/admin/slot_update",
      postObj
    );


    setSelectedSpot(res.data.data.updated);
  };

  const getDetails = async () => {
    const res = await axios.get(
      "http://localhost:8000/admin/parking_data/6198825165cf28bb8d471de6"
    );

    setSelectedSpot(res.data.data.parking_data);
  };

  let server_url = "http://localhost:8000/";
  let socket = io(server_url);
  console.log(selectedSpot._id);
  socket.on(selectedSpot._id, (updated) => {
    handleOpenModal();
    setSelectedSpot({ ...updated });
  });

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>

      <div className='d-flex justify-content-between mb-5'>
        <div className="d-flex">
          <MenuIcon />
          <p className="ms-3">Welcome, Admin</p>
        </div>
        <Link to='/'>
          <button className='btn'>
            <LogoutIcon />
          </button>

        </Link>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Parking Spot Name:</td>
            <td>{selectedSpot.name}</td>
          </tr>
          <tr>
            <td>Car spots available :</td>
            <td>
              <div
                className='mx-3'
                style={{ cursor: "pointer" }}
                disabled={selectedSpot.car_slots_available === 0}
                onClick={() => {
                  ModifySlots("car_slots_available", -1);
                }}
              >
                -
              </div>
            </td>
            <td>
              <b>{selectedSpot.car_slots_available}</b>
            </td>
            <td>
              <div
                className='mx-3'
                style={{ cursor: "pointer" }}
                onClick={() => {
                  ModifySlots("car_slots_available", 1);
                }}
              >
                +
              </div>
            </td>
          </tr>
          <tr>
            <td>Bike spots available :</td>
            <td>
              <div
                className='mx-3'
                style={{ cursor: "pointer" }}
                disabled={selectedSpot.bike_slots_available === 0}
                onClick={() => {
                  ModifySlots("bike_slots_available", -1);
                }}
              >
                -
              </div>
            </td>
            <td>
              <b>{selectedSpot.bike_slots_available}</b>
            </td>
            <td>
              <div
                className='mx-3'
                style={{ cursor: "pointer" }}
                onClick={() => {
                  ModifySlots("bike_slots_available", 1);
                }}
              >
                +
              </div>
            </td>
          </tr>
          {selectedSpot.disabled_slot ? (
            <tr>
              <td>Disabled Parking spots available :</td>
              <td>
                <div
                  className='mx-3'
                  style={{ cursor: "pointer" }}
                  disabled={selectedSpot.disabled_slot_available === 0}
                  onClick={() => {
                    ModifySlots("disabled_slot_available", -1);
                  }}
                >
                  -
                </div>
              </td>
              <td>
                <b>{selectedSpot.disabled_slot_available || 0}</b>
              </td>
              <td>
                <div
                  className='mx-3'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    ModifySlots("disabled_slot_available", 1);
                  }}
                >
                  +
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div>
        <Modal
          open={modal}
          onClose={handleCloseModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              A booking was made
            </Typography>
            <button
              className='btn btn-outline-dark mt-3'
              onClick={handleCloseModal}
            >
              Ok
            </button>{" "}
          </Box>
        </Modal>
      </div>
    </>
  );
};
