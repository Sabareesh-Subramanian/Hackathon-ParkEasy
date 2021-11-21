import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";

const mapStyles = {
	width: "360px",
	height: "400px",
};

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stores: [
				{ latitude: 28.83943, longitude: 78.760064 },
				{ latitude: 28.838099, longitude: 78.760773 },
			],
		};
	}
	diplaycurrentLoc = (lat, long) => {
		return (
			<Marker
				key={0}
				id={0}
				position={{
					lat: lat,
					lng: long,
				}}
				onClick={() => console.log("You clicked me!")}
			/>
		);
	};
	displayMarkers = () => {
		return this.state.stores.map((store, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: store.latitude,
						lng: store.longitude,
					}}
					onClick={() => console.log("You clicked me!")}
				/>
			);
		});
	};

	// useEffect(() => {
	// 	const socket = useRef();

	// const user = localStorage.getItem("GoogleDetails");
	// const { id } = useParams();
	// useEffect(() => {
	// 	socket.current = io("ws://localhost:8900");
	// 	socket.current.on("successBooked", (data) => {
	// 		console.log(data);
	// 	});
	// }, []);

	// })

	// componentDidMount() {
	// 	mapSearch(this.props.google);
	// }

	// 	useEffect(() => {
	// 		socket.current = io("ws://localhost:8900");
	// 		socket.current.on("successBooked", (data) => {
	// 			console.log(data);
	// 		});
	// 	}, []);

	// }

	render() {
		return (
			<>
				{/* <div id="map"></div> */}
				<Map
					google={this.props.google}
					zoom={15}
					style={mapStyles}
					initialCenter={{
						lat: this.props.location[0],
						lng: this.props.location[1],
					}}
					center={{
						lat: this.props.location[0],
						lng: this.props.location[1],
					}}
				>
					{this.displayMarkers()}
					{this.diplaycurrentLoc(
						this.props.location[0],
						this.props.location[1]
					)}
				</Map>
			</>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyBFdqGDpgmKCT2R8zHxlZtDpVZ0i5Tmk1w",
})(MapContainer);
