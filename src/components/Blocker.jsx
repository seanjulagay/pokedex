import React from "react";

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
          {/* <br />
          If you're on PC, please resize your window to have a longer width than
          height. */}
        </h1>
      </div>
    </div>
  );
}
