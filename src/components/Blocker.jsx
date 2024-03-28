import React from "react";

export default function Blocker() {
  return (
    <div className="blocker">
      <div className="blocker-container">
        <h1 className="blocker-text">
          Hi! This app was developed with landscape orientation in mind.
          <br />
          <br />
          If you're on mobile, please turn your device on its side. <br />
          <br />
          If you're on PC, please resize your window to have a longer width than
          height.
        </h1>
      </div>
    </div>
  );
}
