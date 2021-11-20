import axios from "axios";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export const BookingPage = () => {
	const socket = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("successBooked", (data) => {
			console.log(data);
		});
	}, []);

	const handleSubmit = (e) => {
		const parkingId = "6198825165cf28bb8d471ddb";
		const type = "car";
		const bookerId = "1234";

		try {
			// axios
			// 	.post("/book", {
			// 		parkingId: "6198825165cf28bb8d471ddb",
			// 		type: "bike",
			// 	})
			// 	.then(() => alert("booked slot"))
			// .then(
			socket.current.emit("bookslot", {
				bookerId,
				parkingId,
				type,
			});
			// );
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div>
				<button
					onClick={(e) => {
						handleSubmit(e);
					}}
				>
					Pay
				</button>
			</div>
		</>
	);
};
