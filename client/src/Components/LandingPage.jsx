import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MapContainer from "./Map";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import Inputbox from "./Inputbox";

// import PlacesAutocomplete, {
// 	geocodeByAddress,
// 	getLatLng,
// } from "react-places-autocomplete";

export const LandingPage = ({ setLogin }) => {
	const [location, setLocation] = useState([]);
	// const [address, setAddress] = useState("");
	// const [coordinates, setCoordinates] = useState({
	// 	lat: null,
	// 	lng: null,
	// });
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(showPosition);
		} else {
			setLocation("Geolocation is not supported by this browser.");
		}
	}

	function showPosition(position) {
		console.log("position:", position);
		setLocation(() => [
			position.coords.latitude,
			position.coords.longitude,
		]);
	}
	// const handleSelect = async (value) => {
	// 	const results = await geocodeByAddress(value);
	// 	console.log("results:", results);
	// 	const latLng = await getLatLng(results[0]);
	// 	setAddress(value);
	// 	setCoordinates(latLng);
	// 	setLocation([latLng.lat, latLng.lng]);
	// };

	useEffect(() => {
		getLocation();
	}, []);
	// useEffect(() => {
	// 	window.location.reload();
	// },[location])

	return (
		<>
			<div className="d-flex m-2 justify-content-between">
				<div className="d-flex">
					<MenuIcon />
					<p className="ms-3">Welcome, Sabareesh</p>
				</div>
				<Link to="/">
					<LogoutIcon />
				</Link>
			</div>
			<Inputbox />
			{/* <PlacesAutocomplete
				value={address}
				onChange={setAddress}
				onSelect={handleSelect}
			>
				{({
					getInputProps,
					suggestions,
					getSuggestionItemProps,
					loading,
				}) => (
					<div>
						<input
							{...getInputProps({ placeholder: "Type address" })}
						/>
						<div>
							{loading ? <div>...loading</div> : null}

							{suggestions.map((suggestion) => {
								const style = {
									backgroundColor: suggestion.active
										? "#41b6e6"
										: "#fff",
								};

								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											style,
										})}
									>
										{suggestion.description}
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete> */}
			<div style={{ height: "200px", width: "360px" }}>
				<MapContainer location={location} />
			</div>
			<p className="lead mt-5">
				Type your destination point and find out all parking spots
				available for booking at the moment
			</p>
			<div>
				<input
					type="text"
					value={location}
					onChange={(e) => {
						setLocation(e.target.value);
					}}
					className="form-control mt-5 text-center"
					placeholder="Enter your destination"
				/>
			</div>
			<Link to="/spots">
				<button className="btn btn-outline-secondary mt-5 mb-5">
					Search Now
				</button>
			</Link>
		</>
	);
};
