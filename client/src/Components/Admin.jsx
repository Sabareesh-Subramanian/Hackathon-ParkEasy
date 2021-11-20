// import Navbar from "./Navbar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
export const Admin = () => {
  return (
    <>
      <div className="d-flex justify-content-between mb-5">
        <button className="btn">
          <MenuIcon />
        </button>
        <Link to="/">
          <button className="btn">
            <LogoutIcon />
          </button>
        </Link>
      </div>
      {/* <Navbar /> */}
      <p>
        Total Parking Spots: <b>20</b>
      </p>
      <p>
        Spots already booked: <b>10</b>
      </p>
      <p>
        Spots remaining free: <b>10</b>
      </p>
      <button className="btn btn-outline-dark mt-5">Add a new spot</button>
      {/* <button className="btn btn-outline-dark">Reserve a booked spot</button> */}
    </>
  );
};
