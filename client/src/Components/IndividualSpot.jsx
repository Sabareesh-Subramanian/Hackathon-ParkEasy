import Map from ".././sub-components/Map";
import back from "../icons/back.svg";
import disabled from "../icons/disabled.svg";
import motorcycle from "../icons/motorcycle.svg";
import directions from "../icons/directions.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const IndividualSpot = () => {
  const details = JSON.parse(localStorage.getItem("GoogleDetails"));
  const [selectedSpot, setSelectedSpot] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const { id } = useParams();

  const getDetails = async () => {
    let res = await axios.get(`http://localhost:8000/admin/parking_data/${id}`);
    setSelectedSpot(res.data.data.parking_data);
  };

  const handleBooking = async (slot, name) => {
    try {
      let res = await axios.post(" http://localhost:8000/parking/book", {
        parking_id: selectedSpot._id,
        slot: slot,
        mobile: 8098806664,
        user: name,
      });
      handleClose();
      getDetails();
    } catch (error) {
      console.log(error);
    }
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
      <div className='border border-2 p-2 textAlignLeft'>
        <div>
          <img width='30' alt='' src={back} />
        </div>
        <p>Details of the Selected Location</p>
        <div className='flex jsc-sa'>
          <div>
            <div style={{ fontSize: 22 }}>
              <b>{selectedSpot.name}</b>
            </div>

            <div>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star'></span>
              <span className='fa fa-star'></span>
            </div>
          </div>
          <div className='svgfeatures'>
            <img sty height='50' alt='' src={motorcycle} />
            <img height='40' alt='' src={disabled} />
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
        <div className='flex' style={{ height: "70px" }}>
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
              height='45'
              alt='icon'
              src={directions}
            />
            <div style={{ color: "#1A72E9" }}>DIRECTIONS</div>
          </div>
          <div>
            <Button
              style={{ backgroundColor: "#00b386", color: "white" }}
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              Book now
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleBooking("car", details.name)}>
                Book for car
              </MenuItem>
              <MenuItem onClick={() => handleBooking("bike", details.name)}>
                Book for bike
              </MenuItem>
              {selectedSpot.disabled_slot ? (
                <MenuItem
                  onClick={() => handleBooking("disabled", details.name)}
                >
                  Book disaabled friendly
                </MenuItem>
              ) : null}
            </Menu>
          </div>
        </div>
        {/* <div
          style={{
            maxWidth: "350px",
            maxHeight: "400px",
          }}
        >
          <Map />
        </div> */}
      </div>
    </>
  );
};
