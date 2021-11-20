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

export const IndividualSpot = () => {
  const details = JSON.parse(localStorage.getItem("GoogleDetails"));
  const handleBooking = async () => {
    let res = await axios.post(" http://localhost:8000/parking/book", {
      parking_id: selectedSpot._id,
      slot: "car", // to be changed once we add radio buttons
      mobile: 8098806664,
      user: details.name, // to be changed once we get Google details
    });
    console.log("res:", res);
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
      <div className="border border-2 p-2 textAlignLeft">
        <div>
          {/* <p>Home</p>
					<p>Logout</p> */}
          <img width="30" alt="" src={back} />
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
            <img height="40" alt="" src={disabled} />
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
        <div className="flex" style={{ height: "70px" }}>
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
        </div>
        <div
          style={{
            maxWidth: "350px",
            maxHeight: "400px",
          }}
        >
          <Map />
        </div>
        {/* <div id="map"></div> */}
        {/* <button className="btn btn-outline-secondary">Book Now</button> */}
      </div>
    </>
  );
};
