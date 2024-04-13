import React, { useContext, useState } from "react";
import { TutorialModalContext } from "./App";

export default function Header() {
  const [tutorialOpened, setTutorialOpened] = useContext(TutorialModalContext);

  return (
    <div className="header">
      <div className="header-container">
        <a
          onClick={() => setTutorialOpened(true)}
          className="header-text outside-text"
        >
          How to Use Pokedex
        </a>
      </div>
    </div>
  );
}
