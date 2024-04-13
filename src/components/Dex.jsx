import React, { createContext, useEffect, useState } from "react";
import Shell from "./Shell";
import Search from "./Search";

export const ShellOpenedContext = createContext(null);
export const DirectoryPageContext = createContext(null);
export const DirectoryOffsetContext = createContext(null);
export const DirectoryActiveIndexContext = createContext(null);
export const CurrentIDContext = createContext(null);
export const TotalPokemonContext = createContext(null);
export const LoadingStatesContext = createContext(null);
export const DirectoryLoadingStateContext = createContext(null);
export const DetailsLoadingStateContext = createContext(null);
export const ResetDetailsScrollContext = createContext(null);

export default function Dex() {
  const [shellOpened, setShellOpened] = useState(false);
  const [directoryPage, setDirectoryPage] = useState(1);
  const [directoryOffset, setDirectoryOffset] = useState(0);
  const [directoryActiveIndex, setDirectoryActiveIndex] = useState(0);
  const [currentID, setCurrentID] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(1000);
  const [loadingStates, setLoadingStates] = useState([false, false]); // first bool: directory, second bool: details
  const [directoryLoadingState, setDirectoryLoadingState] = useState(false);
  const [detailsLoadingState, setDetailsLoadingState] = useState(false);
  const [resetDetailsScroll, setResetDetailsScroll] = useState(false);

  useEffect(() => {
    setLoadingStates([directoryLoadingState, detailsLoadingState]);
  }, [directoryLoadingState, detailsLoadingState]);

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
                    <DirectoryLoadingStateContext.Provider
                      value={[directoryLoadingState, setDirectoryLoadingState]}
                    >
                      <DetailsLoadingStateContext.Provider
                        value={[detailsLoadingState, setDetailsLoadingState]}
                      >
                        <TotalPokemonContext.Provider
                          value={[totalPokemon, setTotalPokemon]}
                        >
                          <ResetDetailsScrollContext.Provider
                            value={[resetDetailsScroll, setResetDetailsScroll]}
                          >
                            <Search />
                            <Shell />
                          </ResetDetailsScrollContext.Provider>
                        </TotalPokemonContext.Provider>
                      </DetailsLoadingStateContext.Provider>
                    </DirectoryLoadingStateContext.Provider>
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
