import React, { useEffect, createContext, useState } from "react";
import Loading from "./Loading";
import Blocker from "./Blocker";
import Dex from "./Dex";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/index.scss";

export const AppLoadedContext = createContext(null);

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    console.log("Updated appLoaded:", appLoaded);
  }, [appLoaded]);

  return (
    <div className="app">
      <div className="app-container">
        <AppLoadedContext.Provider value={[appLoaded, setAppLoaded]}>
          <Loading />
          <Blocker />
          <div className="app-content">
            <Header />
            <Dex />
            <Footer />
          </div>
        </AppLoadedContext.Provider>
      </div>
    </div>
  );
}
