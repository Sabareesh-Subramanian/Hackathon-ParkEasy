import React from "react";
import { io } from "socket.io-client";
import axios from "axios";

let initial_data = {
  _id: "6198825165cf28bb8d471de6",
  name: "TN07 Garage",
  loc: {
    type: "Point",
    coordinates: [13.045954, 80.239999],
  },
  car_slots_available: 9,
  bike_slots_available: 10,
  disabled_slot: true,
  disabled_slot_available: 4,
  price_slabs: {
    car_slab: [45, 40, 35],
    bike_slab: [25, 20, 18],
    disabled_slab: [40, 35, 30],
  },
  user_rating: 4.6,
};

const AdminSocketTest = () => {
  let [data, setData] = React.useState(initial_data);
  let server_url = "http://localhost:8000/";
  let socket = io(server_url);

  const mount_data = async () => {
    let response = await axios.get(
      "http://localhost:8000/admin/parking_data/6198825165cf28bb8d471de6"
    );
    let fetched_data = response.data.data.parking_data;

    // console.log(fetched_data);
    setData(fetched_data);
  };

  React.useEffect(() => {
    mount_data();
  }, []);

  socket.on(data._id, (updated) => {
    console.log(updated);
    setData({ ...updated });
  });

  let { car_slots_available, bike_slots_available, disabled_slot } = data;
  return <div>{`Car slots : ${car_slots_available}`}</div>;
};

export { AdminSocketTest };
