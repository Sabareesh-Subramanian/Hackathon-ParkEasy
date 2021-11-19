import star from "../icons/star.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Spots = () => {
  const newSpot = {
    id: 1,
    name: "Coffee Day Parking",
    landmark: "Near Forum mall",
    price: "20",
    rating: "4.5",
  };
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    setSpots([...spots, newSpot]);
  }, []);
  return (
    <>
      <p className="text-start">
        You're lucky! We've found 10 parking spots close to your destination.
      </p>
      <div className="d-flex justify-content-end">
        <p className="btn">Sort By</p>
        <p className="btn">Filter By</p>
      </div>
      <div style={{ overflow: "scroll" }}>
        {[1, 2, 3, 4, 5].map(() => {
          return (
            <div className="border border-2 m-2 shadow p-2">
              <div className="d-flex justify-content-between ">
                <div className="text-start">
                  <p>Name:{newSpot.name}</p>
                  <p>Landmark:{newSpot.landmark}</p>
                </div>
                <div className="text-end">
                  <p>Price:₹{newSpot.price}/hour</p>
                  <p>
                    Rating:{newSpot.rating} <img src={star} alt="rating" />
                  </p>
                </div>
              </div>
              <div className="text-end">
                <Link to={`/spots/${newSpot.id}`}>
                  <p>More</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
