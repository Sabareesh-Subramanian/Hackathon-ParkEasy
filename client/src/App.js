import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Spots } from "./Components/Spots";
import { LandingPage } from "./Components/LandingPage";
import "./App.css";
import { useEffect, useState } from "react";
import { IndividualSpot } from "./Components/IndividualSpot";
import { Splashscreen } from "./Components/SplashScreen";
import { Admin } from "./Components/Admin";

localStorage.setItem("hacklogin", "false");
function App() {
  localStorage.setItem("hacklogin", "false");
  const [login, setLogin] = useState();
  useEffect(() => {
    setLogin(localStorage.getItem("hacklogin"));
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Splashscreen />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<LandingPage />}></Route>
        <Route exact path='/spots' element={<Spots />}></Route>
        <Route path='/admin/:id/' element={<Admin />}></Route>
        <Route
          exact
          path='/spots/:id'
          element={<IndividualSpot setLogin={setLogin} />}
          // element={<SpotNew setLogin={setLogin} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
