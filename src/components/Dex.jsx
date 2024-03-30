import React, { createContext, useEffect, useState } from "react";
import Shell from "./Shell";

export const ShellOpenedContext = createContext(null);
export const DirectoryPageContext = createContext(null);
export const DirectoryOffsetContext = createContext(null);
export const CurrentIDContext = createContext(null);

export default function Dex() {
  const [shellOpened, setShellOpened] = useState(false);
  const [directoryPage, setDirectoryPage] = useState(0);
  const [directoryOffset, setDirectoryOffset] = useState(0);
  const [currentID, setCurrentID] = useState(0);

  useEffect(() => {
    setDirectoryOffset(directoryPage * 8);
  }, [directoryPage]);

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
                <Shell />
              </CurrentIDContext.Provider>
            </DirectoryOffsetContext.Provider>
          </DirectoryPageContext.Provider>
        </ShellOpenedContext.Provider>
      </div>
    </div>
  );
}
