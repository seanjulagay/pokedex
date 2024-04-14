import React from "react";
import rotateIcon from "../../public/images/rotate-icon.png";

export default function Blocker() {
  return (
    <div className="blocker">
      <div className="blocker-container">
        <h1 className="blocker-text">
          Hi! Your device is too small to properly view this app in portrait
          mode.
          <br />
          <br />
          Please rotate your device to a landscape orientation.
          <br />
          <img src={rotateIcon} alt="" className="rotate-icon" />
          <br />
          <br />
          If it won't rotate, please select "open in [external] browser" in the
          settings.
          <br />
          <br />
          Or open your dedicated browser and enter
          <br />
          <a
            href="https://seans-pokedex.netlify.app/"
            target="_blank"
            className="link-text"
          >
            seans-pokedex.netlify.com
          </a>
          {/* <br />
          If you're on PC, please resize your window to have a longer width than
          height. */}
        </h1>
      </div>
    </div>
  );
}
