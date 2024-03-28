import React, { useEffect } from "react";
import Blocker from "./Blocker";
import Dex from "./Dex";
import Header from "./Header";
import Footer from "./Footer";
import { scaleShell } from "../scripts/ScaleManager";
import "../styles/index.scss";

export default function App() {
  useEffect(() => {
    // have to wait before running scaleComponents since there is delay in DOM manipulation
    setTimeout(() => {
      scaleShell();
    }, 100);
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <Blocker />
        <div className="app-content">
          <Header />
          <Dex />
          <Footer />
        </div>
      </div>
    </div>
  );
}
