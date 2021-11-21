import axios from "axios";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

export const BookingPage = () => {
  const socket = useRef();


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("successBooked", (data) => {
      console.log(data);
    });
  }, []);

  const handleSubmit = (e) => {
    const parking_id = "6198825165cf28bb8d471ddb";
    const type = "car";
    const bookerId = "1234";
    const mobile = 1234;

    try {
      axios
        .post("http://localhost:8000/parking/book", {
          parking_id: "6198825165cf28bb8d471ddb",
          slot: "car",
          mobile,
          user: "abc",
        })
        .then(() => alert("booked slot"))
        .then(() => {
          socket.current.emit("bookslot", {
            bookerId,
            parkingId: parking_id,
            type,
          });
        });
    } catch (err) {
      console.error(err.message);
    }
  };

	const user = localStorage.getItem("GoogleDetails");
	const { id } = useParams();
	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("successBooked", (data) => {
			console.log(data);
		});
	}, []);

	const handleSubmit = (e) => {
		const parking_id = id;
		const type = "car";
		const bookerId = user && user.name;
		const mobile = Math.random("7000000000", "9000000000");

		try {
			axios
				.post("http://localhost:8000/parking/book", {
					parking_id: parking_id,
					slot: "car",
					mobile,
					user: "abc",
				})
				.then(() => alert("booked slot"))
				.then(() => {
					socket.current.emit("bookslot", {
						bookerId,
						parkingId: parking_id,
						type,
					});
				});
		} catch (err) {
			console.error(err.message);
		}
	};


  return (
    <>
      <div
        // {/* <button */}
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Pay
        {/* </button> */}
      </div>
    </>
  );
};
