import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
} from "react";
import Directory from "./Directory";
import Details from "./Details";
import { scaleShell } from "../scripts/ScaleManager";
import {
  CurrentIDContext,
  DirectoryActiveIndexContext,
  DirectoryOffsetContext,
  DirectoryPageContext,
  LoadingStatesContext,
  ResetDetailsScrollContext,
  ShellOpenedContext,
  TotalPokemonContext,
} from "./Dex";
import { AppLoadedContext, SearchModalContext } from "./App";
import dexShellClosed from "../../public/images/dex/dex-closed.png";
import dexShellOpened from "../../public/images/dex/dex-opened.png";
import dexPowerButton from "../../public/images/dex/dex-power-button.png";
import dexDpadParent from "../../public/images/dex/dex-dpad.png";
import dexDpadUp from "../../public/images/dex/dex-dpad-up.png";
import dexDpadLeft from "../../public/images/dex/dex-dpad-left.png";
import dexDpadRight from "../../public/images/dex/dex-dpad-right.png";
import dexDpadDown from "../../public/images/dex/dex-dpad-down.png";
import dexSearchBtn from "../../public/images/dex/dex-search-btn.png";
import dexLeftScroll from "../../public/images/dex/dex-left-scroll.png";
import dexRightScroll from "../../public/images/dex/dex-right-scroll.png";
import dexScrollDown from "../../public/images/dex/dex-scroll-down.png";
import dexScrollUp from "../../public/images/dex/dex-scroll-up.png";
import axios from "axios";

export const PokemonCountContext = createContext(null);

export default function Shell() {
  const [shellOpened, setShellOpened] = useContext(ShellOpenedContext);
  const [appLoaded, setAppLoaded] = useContext(AppLoadedContext);
  const [directoryPage, setDirectoryPage] = useContext(DirectoryPageContext);
  const [directoryActiveIndex, setDirectoryActiveIndex] = useContext(
    DirectoryActiveIndexContext
  );
  const [directoryOffset, setDirectoryOffset] = useContext(
    DirectoryOffsetContext
  );
  const [currentID, setCurrentID] = useContext(CurrentIDContext);
  const [loadingStates, setLoadingStates] = useContext(LoadingStatesContext);
  const [searchOpened, setSearchOpened] = useContext(SearchModalContext);
  const [totalPokemon, setTotalPokemon] = useContext(TotalPokemonContext);
  const [resetDetailsScroll, setResetDetailsScroll] = useContext(
    ResetDetailsScrollContext
  );

  const detailsRef = useRef(null);

  const imagesToPreload = [
    dexShellClosed,
    dexShellOpened,
    dexPowerButton,
    dexDpadParent,
    dexDpadUp,
    dexDpadLeft,
    dexDpadRight,
    dexDpadDown,
    dexSearchBtn,
    dexLeftScroll,
    dexRightScroll,
    dexScrollDown,
    dexScrollUp,
  ];

  const handleShellState = () => {
    shellOpened ? setShellOpened(false) : setShellOpened(true);
  };

  useEffect(() => {
    preloadImages();
    setTimeout(() => {
      scaleShell();
      setAppLoaded(true);
    }, 1000);
    fetchTotalPokemonCount();
  }, []);

  useEffect(() => {
    const idIndex = currentID - 1;
    const page = Math.floor(idIndex / 8); // explicit declaration of new page value to account for search functionality
    const dirOffset = page * 8;
    // console.log("dirOffset", dirOffset, "idIndex", idIndex);
    setDirectoryOffset(dirOffset);

    if (idIndex == dirOffset) {
      setDirectoryActiveIndex(0);
    } else {
      setDirectoryActiveIndex(idIndex - dirOffset);
    }

    // setDirectoryActiveIndex(currentID - 1 - dirOffset);
    // console.log("currentID", currentID);
  }, [currentID]);

  useEffect(() => {
    // console.log("directoryOffset", directoryOffset);
    setDirectoryPage(Math.floor(currentID / 8) + 1);
  }, [directoryOffset]);

  useEffect(() => {
    // console.log("directoryPage", directoryPage);
  }, [directoryPage]);

  useEffect(() => {
    if (resetDetailsScroll) {
      resetScroll();
    }
    setResetDetailsScroll(false);
  }, [resetDetailsScroll]);

  const fetchTotalPokemonCount = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species`
    );
    setTotalPokemon(response.data.count);
  };

  const preloadImages = () => {
    for (const image of imagesToPreload) {
      const imageElement = new Image();
      imageElement.src = image;
    }
  };

  const handleDpadInteraction = (direction) => {
    const totalPages = Math.ceil(totalPokemon / 8);

    if (loadingStates[0] == false && loadingStates[1] == false) {
      if (direction == "up") {
        if (currentID > 1) {
          setCurrentID(currentID - 1);
          // setCurrentID((currentID) => currentID - 1);
          // setDirectoryActiveIndex(
          //   (directoryActiveIndex) => directoryActiveIndex - 1
          // );
          resetScroll();
        }
      } else if (direction == "down") {
        // if (currentID > 0 && currentID < totalPokemon) {
        //   if (currentID <= totalPokemon) {
        //     setCurrentID(currentID + 1);
        //     // setCurrentID((currentID) => currentID + 1);
        //     // setDirectoryActiveIndex(
        //     //   (directoryActiveIndex) => directoryActiveIndex + 1
        //     // );
        //   }
        //   resetScroll();
        // }
        if (currentID < totalPokemon) {
          setCurrentID(currentID + 1);
        }
        resetScroll();
      } else if (direction == "left") {
        if (directoryPage > 1) {
          setCurrentID(currentID - 8);
          // setDirectoryPage((directoryPage) => directoryPage - 1);
          // setDirectoryActiveIndex(0);
        }
      } else if (direction == "right") {
        if (directoryPage <= totalPages) {
          setCurrentID(currentID + 8);
          // setDirectoryPage((directoryPage) => directoryPage + 1);
          // setDirectoryActiveIndex(0);
        }
      }
    }
  };

  const handleScrollButtonsInteraction = (direction) => {
    if (detailsRef.current) {
      if (direction == "up") {
        detailsRef.current.scrollTop -= 100;
      } else if (direction == "down") {
        detailsRef.current.scrollTop += 100;
      }
    }
  };

  const resetScroll = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="shell">
      <div
        className={`shell-container ${
          shellOpened ? "shell-opened" : "shell-closed"
        }`}
      >
        <img
          src={shellOpened ? dexShellOpened : dexShellClosed}
          alt=""
          className="shell-img"
        />
        <div className="shell-components">
          <div
            style={{ backgroundImage: `url(${dexPowerButton})` }}
            className="shell-power-btn shell-interactable"
            onClick={handleShellState}
          ></div>
          <div
            style={{ backgroundImage: `url(${dexDpadParent})` }}
            className={`shell-dpad-parent shell-interactable ${
              shellOpened ? "" : "hidden"
            }`}
          >
            <div className="shell-dpad-top-row">
              <div
                style={{ backgroundImage: `url(${dexDpadUp})` }}
                className="shell-dpad-up dpad-btn"
                onClick={() => handleDpadInteraction("up")}
              ></div>
            </div>
            <div className="shell-dpad-middle-row">
              <div
                style={{ backgroundImage: `url(${dexDpadLeft})` }}
                className="shell-dpad-left dpad-btn"
                onClick={() => handleDpadInteraction("left")}
              ></div>
              <div
                style={{ backgroundImage: `url(${dexDpadRight})` }}
                className="shell-dpad-right dpad-btn"
                onClick={() => handleDpadInteraction("right")}
              ></div>
            </div>
            <div className="shell-dpad-bottom-row">
              <div
                style={{ backgroundImage: `url(${dexDpadDown})` }}
                className="shell-dpad-down dpad-btn"
                onClick={() => handleDpadInteraction("down")}
              ></div>
            </div>
          </div>
          <div
            onClick={() => setSearchOpened(true)}
            style={{ backgroundImage: `url(${dexSearchBtn})` }}
            className={`shell-search-btn shell-interactable ${
              shellOpened ? "" : "hidden"
            }`}
          ></div>
          <div
            className={`shell-scroll-parents shell-interactable ${
              shellOpened ? "" : "hidden"
            }`}
          >
            <div
              style={{ backgroundImage: `url(${dexLeftScroll})` }}
              className="shell-scroll-parent"
            >
              <div
                onClick={() => handleScrollButtonsInteraction("up")}
                style={{ backgroundImage: `url(${dexScrollUp})` }}
                className="shell-scroll-arrow shell-scroll-up"
              ></div>
            </div>
            <div
              style={{ backgroundImage: `url(${dexRightScroll})` }}
              className="shell-scroll-parent"
            >
              <div
                onClick={() => handleScrollButtonsInteraction("down")}
                style={{ backgroundImage: `url(${dexScrollDown})` }}
                className="shell-scroll-arrow shell-scroll-down"
              ></div>
            </div>
          </div>
          <div
            className={`shell-screen shell-left-screen shell-interactable ${
              shellOpened ? "" : "hidden"
            }`}
          >
            <Directory />
          </div>
          <div
            className={`shell-screen shell-right-screen shell-interactable ${
              shellOpened ? "" : "hidden"
            }`}
          >
            <PokemonCountContext.Provider
              value={[totalPokemon, setTotalPokemon]}
            >
              <Details innerRef={detailsRef} />
            </PokemonCountContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
