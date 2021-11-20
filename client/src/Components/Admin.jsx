import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

export const Admin = () => {
	const socket = useRef();

	const { id } = useParams();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.emit("addUser", id);
		socket.current.on("slotbooked", (data) => {
			console.log(data);
		});
	}, []);

	return <div></div>;
};
