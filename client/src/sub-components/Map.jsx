import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";

const mapStyles = {
	width: "350px",
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

	render() {
		return (
			<Map
				google={this.props.google}
				zoom={15}
				style={mapStyles}
				initialCenter={{ lat: 28.83943, lng: 78.760064 }}
			>
				{this.displayMarkers()}
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyBFdqGDpgmKCT2R8zHxlZtDpVZ0i5Tmk1w",
})(MapContainer);

// [28.83943, 78.760064],
// [28.838099, 78.760773],
