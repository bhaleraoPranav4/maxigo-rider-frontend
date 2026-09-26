import { useEffect, useState } from "react";

import RiderRegistration from "./RiderRegistration";
import RiderLogin from "./RiderLogin";
import RiderDashboard from "./RiderDashboard";

import {
  clearRiderAuth,
  isRiderLoggedIn,
} from "./api";


function App() {

  const [page, setPage] =
    useState("login");

  const [registered, setRegistered] =
    useState(false);


  // =========================================================
  // CHECK LOGIN
  // =========================================================

  useEffect(() => {

    const hasToken =
      isRiderLoggedIn();


    if (hasToken) {

      setRegistered(true);

      setPage("dashboard");

    } else {

      setRegistered(false);

      setPage("login");
    }

  }, []);


  // =========================================================
  // LOGIN SUCCESS
  // =========================================================

  const handleLoginSuccess = (
    response
  ) => {

    console.log(
      "Rider logged in:",
      response
    );

    setRegistered(true);

    setPage("dashboard");
  };


  // =========================================================
  // OPEN REGISTER
  // =========================================================

  const handleOpenRegister = () => {

    setPage("register");
  };


  // =========================================================
  // REGISTRATION SUCCESS
  // =========================================================

  const handleRegistrationSuccess =
    () => {

      /*
       * Registration backend returns JWT.
       *
       * But rider should NOT directly
       * enter dashboard after registration.
       *
       * Remove registration auth data
       * and send rider to Login page.
       */

      clearRiderAuth();


      localStorage.removeItem(
        "maxigoRiderRegistered"
      );


      setRegistered(false);

      setPage("login");


      alert(
        "Registration successful. Please login using your mobile number and PIN."
      );
    };


  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {

    clearRiderAuth();


    localStorage.removeItem(
      "maxigoRiderRegistered"
    );

    localStorage.removeItem(
      "maxigoRiderProfile"
    );

    localStorage.removeItem(
      "maxigoRider"
    );

    localStorage.removeItem(
      "maxigoRiderSelfie"
    );


    setRegistered(false);

    setPage("login");
  };


  // =========================================================
  // DASHBOARD
  // =========================================================

  if (
    registered &&
    page === "dashboard"
  ) {

    return (
      <RiderDashboard
        onLogout={
          handleLogout
        }
      />
    );
  }


  // =========================================================
  // REGISTER
  // =========================================================

  if (
    page === "register"
  ) {

    return (
      <RiderRegistration
        onRegistrationSuccess={
          handleRegistrationSuccess
        }
      />
    );
  }


  // =========================================================
  // LOGIN
  // =========================================================

  return (
    <RiderLogin
      onLoginSuccess={
        handleLoginSuccess
      }
      onRegister={
        handleOpenRegister
      }
    />
  );
}


export default App;