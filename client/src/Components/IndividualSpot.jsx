import star from "../icons/star.svg";

export const IndividualSpot = () => {
  const newSpot = {
    id: 1,
    name: "Coffee Day Parking",
    landmark: "Near Forum mall",
    price: "20",
    rating: "4.5",
  };
  return (
    <>
      <div className="border border-2 p-2">
        <div>
          <p>Home</p>
          <p>Logout</p>
        </div>
        <p>Details of the Selected Location</p>
        <img
          className="img-fluid"
          src="https://miro.medium.com/max/2000/1*eIRxvhYoWZ1dIDZD8dS1fA.png"
          alt=""
        />
        <p>Name:{newSpot.name}</p>
        <p>Landmark:{newSpot.landmark}</p>
        <p>Total Car Slots Available:10</p>
        <p>Total Bike Slots Available:15</p>
        <p>Price:₹{newSpot.price}/hour</p>
        <p>
          Rating:{newSpot.rating} <img src={star} alt="rating" />
        </p>
        <button className="btn btn-outline-secondary">Book Now</button>
      </div>
    </>
  );
};
