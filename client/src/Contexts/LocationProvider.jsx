import { createContext, useEffect } from "react";
import { useState } from "react";

export const LocationContext = createContext({});

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState();
  console.log("location in context:", location);
  function getLocation() {
    console.log("Test");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLocation(position.coords.latitude + "," + position.coords.longitude);
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        getLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
