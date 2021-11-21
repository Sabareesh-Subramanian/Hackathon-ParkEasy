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
  // console.log("selectedSpot:", selectedSpot);

  const ModifySlots = async (type, value) => {
    const postObj = {
      id: selectedSpot._id,
      [type]: selectedSpot[type] + value,
    };
    // console.log("postObj:", postObj);
    const res = await axios.post(
      "http://localhost:8000/admin/slot_update",
      postObj
    );
    console.log("res:", res);
    setSelectedSpot(res.data.data.updated);
  };

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
      getDetails();
      console.log(data);
      //   // setSelectedSpot(data);
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
      <table>
        <tbody>
          <tr>
            <td>Car spots available :</td>
            <td>
              <div
                className="mx-3"
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
                className="mx-3"
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
                className="mx-3"
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
                className="mx-3"
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
                  className="mx-3"
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
                  className="mx-3"
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
      {/* <Navbar /> */}

      {/* <div className="d-flex">
        <p>Bike spots available :</p>
        <div
          className="mx-3"
          style={{ cursor: "pointer" }}
          disabled={selectedSpot.bike_slots_available === 0}
          onClick={() => {
            ModifySlots("bike_slots_available", -1);
          }}
        >
          -
        </div>

        <b>{selectedSpot.bike_slots_available}</b>
        <div
          className="mx-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            ModifySlots("bike_slots_available", 1);
          }}
        >
          +
        </div>
      </div> */}
      {/* {selectedSpot.disabled_slot ? (
        <div className="d-flex justify-content-center">
          <p>Disabled Parking spots available :</p>
          <div
            className="mx-3"
            style={{ cursor: "pointer" }}
            disabled={selectedSpot.disabled_slot_available === 0}
            onClick={() => {
              ModifySlots("disabled_slot_available", -1);
            }}
          >
            -
          </div>

          <b>{selectedSpot.disabled_slot_available || 0}</b>
          <div
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              ModifySlots("disabled_slot_available", 1);
            }}
          >
            +
          </div>
        </div>
      ) : null} */}

      {/* <button className="btn btn-outline-dark mt-5">Add a free spot</button>
      <button className="btn btn-outline-dark mt-5">
        Remove a booked spot
      </button> */}
    </>
  );
};
