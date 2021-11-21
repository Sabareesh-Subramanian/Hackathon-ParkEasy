import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId =
  "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

export function GLogin() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
  };

  const onSuccess = (res) => {
    localStorage.setItem("GoogleDetails", JSON.stringify(res.profileObj));
    navigateHome();
  };

  const onFailure = (res) => {
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Signin with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ boxShadow: "3px 5px 10px #e6e6e6" }}
        // isSignedIn={true}
      />
    </div>
  );
}
