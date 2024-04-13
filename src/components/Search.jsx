import React, { useContext, useEffect, useState } from "react";
import { SearchModalContext } from "./App";
import {
  CurrentIDContext,
  DirectoryActiveIndexContext,
  DirectoryOffsetContext,
  TotalPokemonContext,
} from "./Dex";

export default function Search() {
  const [searchOpened, setSearchOpened] = useContext(SearchModalContext);
  const [currentID, setCurrentID] = useContext(CurrentIDContext);
  const [totalPokemon, setTotalPokemon] = useContext(TotalPokemonContext);
  const [searchText, setSearchText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    searchOpened
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [searchOpened]);

  const handleSearchButton = (event) => {
    event.preventDefault();
    const parsedText = parseInt(searchText);

    if (Number.isNaN(parsedText)) {
      setErrorMsg("Error! Value is not an integer.");
    } else if (Number.isInteger(parsedText)) {
      if (parsedText > 0 && parsedText <= totalPokemon) {
        setCurrentID(parsedText);
        setErrorMsg("");
        setSearchOpened(false);
      } else {
        setErrorMsg(`Error! Enter a value between 1 and ${totalPokemon}`);
      }
    }
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
            Enter specific Pokemon ID
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
              placeholder="ID..."
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
