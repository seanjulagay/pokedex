import React, { useEffect, createContext, useState } from "react";
import Loading from "./Loading";
import Blocker from "./Blocker";
import Tutorial from "./Tutorial";
import Dex from "./Dex";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import "../styles/index.scss";

export const AppLoadedContext = createContext(null);
export const TutorialModalContext = createContext(null);
export const SearchModalContext = createContext(null);

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [tutorialOpened, setTutorialOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);

  return (
    <div className={`app ${tutorialOpened ? "modal-opened" : ""}`}>
      <div className="app-container">
        <AppLoadedContext.Provider value={[appLoaded, setAppLoaded]}>
          <SearchModalContext.Provider value={[searchOpened, setSearchOpened]}>
            <Loading />
            <Blocker />
            {/* <Search /> */}
            <TutorialModalContext.Provider
              value={[tutorialOpened, setTutorialOpened]}
            >
              <Tutorial />
              <div className="app-content">
                <Header />
                <Dex />
                <Footer />
              </div>
            </TutorialModalContext.Provider>
          </SearchModalContext.Provider>
        </AppLoadedContext.Provider>
      </div>
    </div>
  );
}
