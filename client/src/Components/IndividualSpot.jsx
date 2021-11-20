import MenuIcon from "@mui/icons-material/Menu";
import star from "../icons/star.svg";
import Map from ".././sub-components/Map";
import back from "../icons/back.svg";
import disabled from "../icons/disabled.svg";
import motorcycle from "../icons/motorcycle.svg";
import directions from "../icons/directions.svg";
import booknow from "../icons/book-snow.svg";

export const IndividualSpot = () => {
	function myNavFunc(lat, log) {
		// If it's an iPhone..
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
	const newSpot = {
		id: 1,
		name: "Coffee Day Parking",
		landmark: "Near Forum mall",
		price: "20",
		rating: "4.5",
	};

	return (
		<>
			<div className="border border-2 p-2 textAlignLeft">
				<div>
					{/* <p>Home</p>
					<p>Logout</p> */}
					<img width="30" alt="" src={back} />
				</div>
				<p>Details of the Selected Location</p>

				{/* <img
          className="img-fluid"
          src="https://miro.medium.com/max/2000/1*eIRxvhYoWZ1dIDZD8dS1fA.png"
          alt=""
        /> */}
				<div className="flex jsc-sa">
					<div>
						<div style={{ fontSize: 22 }}>
							<b>{newSpot.name}</b>
						</div>
						<div>Landmark:{newSpot.landmark}</div>
						<div>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star"></span>
							<span className="fa fa-star"></span>
						</div>
					</div>
					<div className="svgfeatures">
						<img sty height="50" alt="" src={motorcycle} />
						<img height="40" alt="" src={disabled} />
					</div>
				</div>

				<p>Total Car Slots Available:10</p>
				<p>Total Bike Slots Available:15</p>
				<p>Price:₹{newSpot.price}/hour</p>
				{/* <p>
					Rating:{newSpot.rating} <img src={star} alt="rating" />
				</p> */}
				<div className="flex" style={{ height: "70px" }}>
					<div
						style={{ cursor: "pointer" }}
						onClick={() => myNavFunc(28.838099, 78.760773)}
					>
						<img
							style={{ display: "block", margin: "0 auto" }}
							height="45"
							alt="icon"
							src={directions}
						/>
						<div style={{ color: "#1A72E9" }}>DIRECTIONS</div>
					</div>
					<div style={{ cursor: "pointer", marginLeft: "10px" }}>
						<img
							style={{ display: "block", margin: "0 auto" }}
							height="45"
							alt="icon"
							src={booknow}
						/>
						<div
							style={{
								color: "#1A72E9",
								fontSize: "14px",
								fontWeight: 500,
							}}
						>
							BOOK NOW
						</div>
					</div>
				</div>
				<div
					style={{
						maxWidth: "350px",
						maxHeight: "400px",
					}}
				>
					<Map />
				</div>
				{/* <div id="map"></div> */}
				{/* <button className="btn btn-outline-secondary">Book Now</button> */}
			</div>
		</>
	);
};
