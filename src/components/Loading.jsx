import React, { useContext, useState } from "react";
import spinningPokeball from "../../public/images/spinning-pokeball.gif";
import { AppLoadedContext } from "./App";

export default function Loading() {
  const [appLoaded, setAppLoaded] = useContext(AppLoadedContext);

  return (
    <div className={`loading ${appLoaded ? "hidden" : ""}`}>
      <img src={spinningPokeball} alt="" className="loading-img" />
      <span className="loading-text">Loading app, please wait...</span>
    </div>
  );
}
