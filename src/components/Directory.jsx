import React, { useContext, useEffect, useState } from "react";
import {
  CurrentIDContext,
  DirectoryActiveIndexContext,
  DirectoryOffsetContext,
  DirectoryPageContext,
  LoadingStatesContext,
  ShellOpenedContext,
} from "./Dex";
import spinningPokeball from "../../public/images/spinning-pokeball.gif";
import axios from "axios";

export default function Directory() {
  const [shellOpened, setShellOpened] = useContext(ShellOpenedContext);
  const [directoryOffset, setDirectoryOffset] = useContext(
    DirectoryOffsetContext
  );
  const [directoryPage, setDirectoryPage] = useContext(DirectoryPageContext);
  const [directoryActiveIndex, setDirectoryActiveIndex] = useContext(
    DirectoryActiveIndexContext
  );
  const [currentID, setCurrentID] = useContext(CurrentIDContext);
  const [loadingStates, setLoadingStates] = useContext(LoadingStatesContext);
  const [currentPagePokemon, setCurrentPagePokemon] = useState(null);

  useEffect(() => {
    fetchDirectoryPokemon();
  }, [directoryOffset]);

  const formatDirectoryItem = (id, name) => {
    var nameCaps = name[0].toUpperCase() + name.slice(1);
    if (id < 10) {
      return "#000" + id + " " + nameCaps;
    } else if (id >= 10 && id < 100) {
      return "#00" + id + " " + nameCaps;
    } else if (id >= 100 && id < 1000) {
      return "#0" + id + " " + nameCaps;
    } else if (id >= 1000 && id < 10000) {
      return "#" + id + " " + nameCaps;
    } else {
      return "formatError";
    }
  };

  const directoryContent = () => {
    if (currentPagePokemon) {
      return currentPagePokemon.map((pokemon, index) => (
        <div
          key={index}
          className={`directory-content-block ${
            directoryActiveIndex === index ? "directory-active-index" : ""
          }`}
        >
          {formatDirectoryItem(pokemon.url.split("/")[6], pokemon.name)}
        </div>
      ));
    }
  };

  const fetchDirectoryPokemon = async () => {
    setLoadingStates([true, loadingStates[1]]);
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${directoryOffset}&limit=8`
    );

    console.log(res.data.results);
    setCurrentPagePokemon(res.data.results);
    setLoadingStates([false, loadingStates[1]]);
  };

  return (
    <div className={`directory ${shellOpened ? "" : "hidden"}`}>
      <div className="directory-container">
        <div className="directory-header">Select Pokemon</div>
        <div
          className={`directory-content-container ${
            loadingStates[0] == true ? "hidden" : ""
          }`}
        >
          {directoryContent()}
        </div>
        <div
          className={`directory-loading ${
            loadingStates[0] == false ? "hidden" : ""
          }`}
        >
          <img
            src={spinningPokeball}
            alt=""
            className="directory-loading-image"
          />
          <span className="directory-loading-text">Loading...</span>
        </div>
      </div>
    </div>
  );
}
