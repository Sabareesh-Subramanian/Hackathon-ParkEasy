import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Spots } from "./Components/Spots";
import { LandingPage } from "./Components/LandingPage";
import "./App.css";
import { useEffect, useState } from "react";
import { IndividualSpot } from "./Components/IndividualSpot";
import { BookingPage } from "./Components/BookingPage";

function App() {
	localStorage.setItem("hacklogin", "false");
	const [login, setLogin] = useState();
	useEffect(() => {
		setLogin(localStorage.getItem("hacklogin"));
	}, []);
	console.log("isLoggedIn:", login);
	return (
		<div className="App">
			<Routes>
				<Route
					exact
					path="/"
					element={
						login === "true" ? (
							<LandingPage setLogin={setLogin} />
						) : (
							<Login setLogin={setLogin} />
						)
					}
				></Route>
				<Route exact path="/spots" element={<Spots />}></Route>
				<Route
					exact
					path="/spots/:id"
					element={<IndividualSpot setLogin={setLogin} />}
				></Route>
				<Route
					exact
					path="/spots/:id/book"
					element={<BookingPage setLogin={setLogin} />}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
