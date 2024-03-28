import React from "react";
import Blocker from "./Blocker";
import Dex from "./Dex";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/index.scss";

export default function App() {
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
