import React, { useContext, useEffect, useState } from "react";
import {
  CurrentIDContext,
  DirectoryOffsetContext,
  ShellOpenedContext,
} from "./Dex";
import axios from "axios";

export default function Directory() {
  const [shellOpened, setShellOpened] = useContext(ShellOpenedContext);
  const [directoryOffset, setDirectoryOffset] = useContext(
    DirectoryOffsetContext
  );
  const [currentID, setCurrentID] = useContext(CurrentIDContext);
  const [currentPagePokemon, setCurrentPagePokemon] = useState(null);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);

  useEffect(() => {
    fetchDirectoryPokemon();
  }, []);

  useEffect(() => {
    
  }, [currentID]);

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
            selectedPokemonIndex === index ? "directory-active-index" : ""
          }`}
        >
          {formatDirectoryItem(pokemon.id, pokemon.name)}
        </div>
      ));
    }
  };

  const fetchDirectoryPokemon = async () => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${directoryOffset}&limit=8`
    );

    setCurrentPagePokemon(res.data.results);
  };

  return (
    <div className={`directory ${shellOpened ? "" : "hidden"}`}>
      <div className="directory-container">
        <div className="directory-header">Select Pokemon</div>
        <div className="directory-content-container">{directoryContent()}</div>
      </div>
    </div>
  );
}
