import React, { createContext, useContext, useEffect, useState } from "react";
import Shell from "./Shell";
import Search from "./Search";
import { AppLoadedContext } from "./App";
import pokedexOpenSound from "../../public/sounds/pokedex-open-sound.mp3";
import pokedexCloseSound from "../../public/sounds/pokedex-close-sound.mp3";
import directorySelectSound from "../../public/sounds/directory-select-sound.mp3";
import detailsScrollSound from "../../public/sounds/details-scroll-sound.mp3";

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
  const [appLoaded, setAppLoaded] = useContext(AppLoadedContext);
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

  let pokedexOpenAudio = new Audio(pokedexOpenSound);
  let pokedexCloseAudio = new Audio(pokedexCloseSound);
  let directorySelectAudio = new Audio(directorySelectSound);
  let detailsScrollAudio = new Audio(detailsScrollSound);

  useEffect(() => {
    setLoadingStates([directoryLoadingState, detailsLoadingState]);
  }, [directoryLoadingState, detailsLoadingState]);

  useEffect(() => {
    if (shellOpened == true) {
      directorySelectAudio.play();
    }
  }, [currentID]);

  useEffect(() => {
    if (appLoaded) {
      if (shellOpened == false) {
        pokedexOpenAudio.play();
      } else {
        pokedexCloseAudio.play();
      }
    }
  }, [shellOpened]);

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
                            <Shell detailsScrollAudio={detailsScrollAudio} />
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
