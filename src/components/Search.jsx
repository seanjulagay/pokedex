import React, { useContext, useEffect, useState } from "react";
import { SearchModalContext } from "./App";
import {
  CurrentIDContext,
  DirectoryActiveIndexContext,
  DirectoryOffsetContext,
  ResetDetailsScrollContext,
  TotalPokemonContext,
} from "./Dex";
import axios, { all } from "axios";

export default function Search() {
  const [searchOpened, setSearchOpened] = useContext(SearchModalContext);
  const [currentID, setCurrentID] = useContext(CurrentIDContext);
  const [totalPokemon, setTotalPokemon] = useContext(TotalPokemonContext);
  const [resetDetailsScroll, setResetDetailsScroll] = useContext(
    ResetDetailsScrollContext
  );
  const [searchText, setSearchText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [allPokemon, setAllPokemon] = useState(null);

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    console.log(allPokemon);
  }, [allPokemon]);

  useEffect(() => {
    searchOpened
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [searchOpened]);

  const fetchAllPokemon = async () => {
    const pokemonRes = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );

    const temp = {};

    for (let i = 0; i < pokemonRes.data.count; i++) {
      temp[i + 1] = pokemonRes.data.results[i].name;
    }
    setAllPokemon(temp);
  };

  const handleSearchButton = (event) => {
    event.preventDefault(); // prevent page refresh

    const formattedSearchText = searchText.toLowerCase();

    const parsedText = parseInt(searchText);

    if (Number.isNaN(parsedText)) {
      if (Object.values(allPokemon).includes(formattedSearchText)) {
        const key = Object.keys(allPokemon).find(
          (key) => allPokemon[key] === formattedSearchText
        );
        setCurrentID(key);
        setErrorMsg("");
        setSearchOpened(false);
        setSearchText("");
      } else {
        setErrorMsg("Error! Pokemon not found.");
      }
    } else if (Number.isInteger(parsedText)) {
      if (parsedText > 0 && parsedText <= totalPokemon) {
        setCurrentID(parsedText);
        setErrorMsg("");
        setSearchOpened(false);
        setSearchText("");
      } else {
        setErrorMsg(
          `Error! Please enter a value between 1 and ${totalPokemon}.`
        );
      }
    }
    setResetDetailsScroll(true);
  };

  const handleSearchBarChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={`search ${searchOpened ? "" : "hidden"}`}>
      <div className="search-container">
        <div className="search-modal">
          <button
            onClick={() => setSearchOpened(false)}
            className="search-modal-close-button"
          >
            x
          </button>
          <span className="search-modal-instructions">
            Enter Pokemon name or ID:
          </span>
          <form
            action=""
            onSubmit={handleSearchButton}
            className="search-modal-form"
          >
            <input
              type="text"
              value={searchText}
              onChange={handleSearchBarChange}
              placeholder="Name/ID..."
              className="search-modal-bar"
            />
            <button type="submit" className="search-modal-submit-button">
              Search
            </button>
          </form>
          <span className={`search-modal-message ${errorMsg ? "" : "hidden"}`}>
            {errorMsg}
          </span>
        </div>
      </div>
    </div>
  );
}
