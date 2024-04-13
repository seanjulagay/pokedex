import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  CurrentIDContext,
  DetailsLoadingStateContext,
  DirectoryOffsetContext,
  LoadingStatesContext,
} from "./Dex";
import { PokemonCountContext } from "./Shell";
import spinningPokeball from "../../public/images/spinning-pokeball.gif";

export default function Details({ innerRef }) {
  const [directoryOffset, setDirectoryOffset] = useContext(
    DirectoryOffsetContext
  );
  const [currentID, setCurrentID] = useContext(CurrentIDContext);
  const [loadingStates, setLoadingStates] = useContext(LoadingStatesContext);
  const [detailsLoadingState, setDetailsLoadingState] = useContext(
    DetailsLoadingStateContext
  );
  const [totalPokemon, setTotalPokemon] = useContext(PokemonCountContext);
  const [mainData, setMainData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [pokemonSprite, setPokemonSprite] = useState(null);

  useEffect(() => {
    preloadPageSprites();
  }, []);

  useEffect(() => {
    setPokemonSprite(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentID}.png`
    );
    fetchPokemonDetails();
  }, [currentID]);

  useEffect(() => {
    preloadPageSprites();
  }, [directoryOffset]);

  const preloadPageSprites = () => {
    for (let i = directoryOffset; i < directoryOffset + 8; i++) {
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentID}.png`;
    }

    // load previous set of sprites
    if (directoryOffset > 0) {
      // console.log("loading previous sprites...");
      for (let i = directoryOffset - 8; i < directoryOffset; i++) {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
      }
    }

    // console.log("directoryOffset", directoryOffset);
    // load next set of sprites
    if (directoryOffset < totalPokemon) {
      // console.log("loading next sprites...");
      for (let i = directoryOffset + 8; i < directoryOffset + 16; i++) {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
      }
    }
  };

  const fetchPokemonDetails = async () => {
    setDetailsLoadingState(true);

    const [mainDataRes, speciesDataRes] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${currentID}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${currentID}`),
    ]);

    setMainData(mainDataRes.data);
    setSpeciesData(speciesDataRes.data);

    setDetailsLoadingState(false);
  };

  const getPokemonDesc = () => {
    const flavorTexts = [];

    speciesData.flavor_text_entries.forEach((element) => {
      if (element.language.name == "en") {
        flavorTexts.push(cleanupText(element.flavor_text));
      }
    });

    return flavorTexts.slice(0, 2).join(" ");
  };

  const formatID = (id) => {
    if (id < 10) {
      return "#000" + id;
    } else if (id >= 10 && id < 100) {
      return "#00" + id;
    } else if (id >= 100 && id < 1000) {
      return "#0" + id;
    } else if (id >= 1000 && id < 10000) {
      return "#" + id;
    } else {
      return "formatError";
    }
  };

  const capitalizeFirst = (text) => {
    return text.slice(0, 1).toUpperCase() + text.slice(1);
  };

  const cleanupText = (text) => {
    return text
      .replace(/\f/g, "\n")
      .replace(/\u00ad\n/g, "")
      .replace(/\u00ad/g, "")
      .replace(/ -\n/g, " - ")
      .replace(/-\n/g, "-")
      .replace(/\n/g, " ");
  };

  return (
    <div className="details" ref={innerRef}>
      <div
        className={`details-loading ${
          loadingStates[1] == true ? "" : "hidden"
        }`}
      >
        <img src={spinningPokeball} alt="" className="details-loading-image" />
        <span className="details-loading-text">Loading...</span>
      </div>

      <div
        className={`details-container ${
          loadingStates[0] == true || loadingStates[1] == true ? "hidden" : ""
        }`}
      >
        <div className="details-sprite-container">
          <img src={pokemonSprite} alt="" className="details-sprite" />
        </div>
        <span className="details-header">
          {mainData ? capitalizeFirst(mainData.name) : ""} -{" "}
          {formatID(currentID)}
        </span>
        <div className="details-subheader details-split-subheader">
          <span>
            <strong>Height: </strong>
            {mainData ? mainData.height / 10 : ""}m
          </span>
          <span>
            <strong>Weight: </strong>
            {mainData ? mainData.weight / 10 : ""}kg
          </span>
        </div>
        <span className="details-subheader details-single-subheader">
          <strong>Type(s): </strong>
          {mainData
            ? mainData.types
                .map((arr) => capitalizeFirst(arr.type.name))
                .join(", ")
            : ""}
        </span>
        <span className="details-content">
          {speciesData ? getPokemonDesc() : ""}
        </span>
        <span className="details-splitter">-</span>
        <span className="details-header">Base Stats</span>
        <div className="details-subheader details-split-subheader">
          <span>
            <strong>HP: </strong>
            {mainData ? mainData.stats[0].base_stat : ""}
          </span>
          <span>
            <strong>Atk: </strong>
            {mainData ? mainData.stats[1].base_stat : ""}
          </span>
        </div>
        <div className="details-subheader details-split-subheader">
          <span>
            <strong>Def: </strong>
            {mainData ? mainData.stats[2].base_stat : ""}
          </span>
          <span>
            <strong>Spd: </strong>
            {mainData ? mainData.stats[5].base_stat : ""}
          </span>
        </div>
        <div className="details-subheader details-split-subheader">
          <span>
            <strong>Special Atk: </strong>
            {mainData ? mainData.stats[3].base_stat : ""}
          </span>
          <span>
            <strong>Special Def: </strong>
            {mainData ? mainData.stats[4].base_stat : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
