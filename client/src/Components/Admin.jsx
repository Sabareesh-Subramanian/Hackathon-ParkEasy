// import Navbar from "./Navbar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export const Admin = () => {
  const [selectedSpot, setSelectedSpot] = useState({});
  const getDetails = async () => {
    const res = await axios.get(
      "http://localhost:8000/admin/parking_data/6198825165cf28bb8d471de6"
    );
    console.log("res:", res.data.data.parking_data);
    setSelectedSpot(res.data.data.parking_data);
  };
  const socket = useRef();

  const { id } = useParams();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", id);
    socket.current.on("slotbooked", (data) => {
      console.log(data);
    });
    getDetails();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between mb-5">
        <button className="btn">
          <MenuIcon />
        </button>
        <Link to="/">
          <button className="btn">
            <LogoutIcon />
          </button>
        </Link>
      </div>
      {/* <Navbar /> */}
      <div></div>
      <p>
        Car spots available : <b>{selectedSpot.car_slots_available}</b>
      </p>
      <p>
        Bike spots available : <b>{selectedSpot.bike_slots_available}</b>
      </p>
      {selectedSpot.disabled_slot ? (
        <p>
          Disabled Parking spots available :{" "}
          <b>{selectedSpot.disabled_slots_available || 0}</b>
        </p>
      ) : null}
      <button className="btn btn-outline-dark mt-5">Add a free spot</button>
      <button className="btn btn-outline-dark mt-5">
        Remove a booked spot
      </button>
    </>
  );
};
