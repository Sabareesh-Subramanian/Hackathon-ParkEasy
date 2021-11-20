import { Link } from "react-router-dom";
export const Splashscreen = () => {
  return (
    <>
      <div className="bg-light pt-5" style={{ minHeight: "100vh" }}>
        <img
          className="col-3 mt-5"
          //   src="https://i.pinimg.com/originals/4a/30/77/4a30772e96d7352a26414cd60de33655.gif"
          src="https://cdn.dribbble.com/users/1287580/screenshots/5410442/dribbble_2.gif"
          alt="Logo"
        />
        <p className="mt-5 text-dark display-1">Park Easy</p>
        <div className="d-flex justify-content-evenly">
          <Link to="/admin/1">
            <button className="btn btn-dark mt-5 mb-5">Admin</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-dark mt-5 mb-5">User</button>
          </Link>
        </div>
      </div>
    </>
  );
};
