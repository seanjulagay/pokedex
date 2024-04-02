import React, { createContext, useEffect, useState } from "react";
import Shell from "./Shell";

export const ShellOpenedContext = createContext(null);
export const DirectoryPageContext = createContext(null);
export const DirectoryOffsetContext = createContext(null);
export const DirectoryActiveIndexContext = createContext(null);
export const CurrentIDContext = createContext(null);
export const LoadingStatesContext = createContext(null);

export default function Dex() {
  const [shellOpened, setShellOpened] = useState(false);
  const [directoryPage, setDirectoryPage] = useState(1);
  const [directoryOffset, setDirectoryOffset] = useState(0);
  const [directoryActiveIndex, setDirectoryActiveIndex] = useState(0);
  const [currentID, setCurrentID] = useState(1);
  const [loadingStates, setLoadingStates] = useState([false, false]); // first bool: directory, second bool: details

  useEffect(() => {
    // directory offset: for api argument values and ID reset on directory page change
    setDirectoryOffset((directoryPage - 1) * 8);
  }, [directoryPage]);

  useEffect(() => {
    // id: reset to directoryOffste + 1 so active index on directory is first option on every page change
    setCurrentID(directoryOffset + 1);
  }, [directoryOffset]);

  useEffect(() => {
    console.log("currentID", currentID);
  }, [currentID]);

  useEffect(() => {
    console.log("loadingStates", loadingStates);
  }, [loadingStates]);

  return (
    <div className="dex">
      <div className="dex-container">
        <ShellOpenedContext.Provider value={[shellOpened, setShellOpened]}>
          <DirectoryPageContext.Provider
            value={[directoryPage, setDirectoryPage]}
          >
            <DirectoryOffsetContext.Provider
              value={[directoryOffset, setDirectoryOffset]}
            >
              <CurrentIDContext.Provider value={[currentID, setCurrentID]}>
                <DirectoryActiveIndexContext.Provider
                  value={[directoryActiveIndex, setDirectoryActiveIndex]}
                >
                  <LoadingStatesContext.Provider
                    value={[loadingStates, setLoadingStates]}
                  >
                    <Shell />
                  </LoadingStatesContext.Provider>
                </DirectoryActiveIndexContext.Provider>
              </CurrentIDContext.Provider>
            </DirectoryOffsetContext.Provider>
          </DirectoryPageContext.Provider>
        </ShellOpenedContext.Provider>
      </div>
    </div>
  );
}
