import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

export const Splashscreen = () => {
  const [type, setType] = useState();
  function checkBrowser() {
    // Get the user-agent string
    let userAgentString = navigator.userAgent;
    // console.log("userAgentString:", userAgentString);

    // Detect Chrome
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;
    // console.log("chromeAgent:", chromeAgent);
    if (chromeAgent) {
      setType("Chrome");
    }

    // Detect Firefox
    let firefoxAgent = userAgentString.indexOf("Firefox") > -1;
    // console.log("firefoxAgent:", firefoxAgent);
    if (firefoxAgent) {
      setType("Firefox");
    }

    // Detect Safari
    let safariAgent = userAgentString.indexOf("Safari") > -1;

    // Discard Safari since it also matches Chrome
    if (chromeAgent && safariAgent) safariAgent = false;

    // Detect Opera
    let operaAgent = userAgentString.indexOf("OP") > -1;

    // Discard Chrome since it also matches Opera
    if (chromeAgent && operaAgent) chromeAgent = false;
  }
  useEffect(() => {
    checkBrowser();
  }, []);
  return (
    <div className="pt-5">
      {/* <div className=" pt-5" style={{ minHeight: "100vh" }}>
        <img
          className="col-3 mt-5"
          //   src="https://i.pinimg.com/originals/4a/30/77/4a30772e96d7352a26414cd60de33655.gif"
          src="https://cdn.dribbble.com/users/1287580/screenshots/5410442/dribbble_2.gif"
          alt="Logo"
        />
        <p className="mt-5 text-dark display-1">Park Easy</p>
        <div className="d-flex justify-content-evenly">
          {type === "Firefox" ? (
            <Link to="/admin/1">
              <button className="btn btn-dark mt-5 mb-5">Admin</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn btn-dark mt-5 mb-5">User</button>
            </Link>
          )}
        </div>
      </div> */}
      <div
        style={{ margin: "auto" }}
        className="bg-dark shadow p-3 my-5 col-4 text-light"
      >
        <p className="h4">Park Easy</p>
      </div>

      {type === "Firefox" ? (
        <>
          <div className="text-start mt-2 offset-1">
            <div className="h4">Start Partnering with Us</div>
            <span className="fw-light mb-2">
              Enter your phone number (required)
            </span>
            <Input className="col-10 my-3" defaultValue=" +91 " />
            {/* <button className="btn btn-dark py-3 col-10">User Login</button> */}
          </div>
          <Link style={{ textDecoration: "none" }} to="/admin/1">
            <Button
              className="col-10 bg-dark shadow mt-4 mb-3"
              color="secondary"
              variant="contained"
            >
              Admin Login
            </Button>
          </Link>
        </>
      ) : (
        <>
          <div className="text-start mt-2 offset-1">
            <div className="h4">Start Parking with Us</div>
            <span className="fw-light mb-2">
              Enter your phone number (required)
            </span>
            <Input className="col-10 my-3" defaultValue=" +91 " />
            {/* <button className="btn btn-dark py-3 col-10">User Login</button> */}
          </div>
          <Link style={{ textDecoration: "none" }} to="/login">
            <Button
              className="col-10 bg-dark shadow mt-4 mb-3"
              color="secondary"
              variant="contained"
            >
              User Login
            </Button>
          </Link>
          <br />
          <Link to="/login" style={{ textDecoration: "none" }}>
            Or connect using a social account
          </Link>
        </>
      )}

      <br />
    </div>
  );
};
