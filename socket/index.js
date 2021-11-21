const io = require("socket.io")(8900, {
	cors: {
		origin: "http://localhost:3000",
	},
});

let users = [];
let livelocation = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
	console.log("users:", users);
};
const updateUser = (userId, lat, log) => {
	livelocation.push([, userId, lat, log]);
};

const getUserLocation = (userId) => {
	const userLoc = livelocation.filter((user) => user[0] === userId);
	return { lat: userLoc[0], long: userLoc[1] };
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	console.log("userId:", userId);
	return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	//when ceonnect
	console.log("a user connected.");

	//take userId and socketId from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	});

	// location on socket
	socket.on("updateLocation", ({ userId, lat, log }) => {
		updateUser(userId, lat, log);
		io.emit("", users);
	});
	socket.on("returnLocation", (userId) => {
		const [lat, log] = getUserLocation(userId);
		const user = getUser(userId);
		console.log("user:", user);
		if (user) {
			io.to(user.socketId).emit("location", { lat, log });
		}
	});

	//send and get message
	socket.on("bookslot", ({ bookerId, parkingId, type }) => {
		const user = getUser(parkingId);
		console.log("user:", user);
		if (user) {
			io.to(user.socketId).emit("slotbooked", {
				bookerId,
				type,
			});
		}
		// io.emit("successBooked", "success");
	});

	// when disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected!");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});
