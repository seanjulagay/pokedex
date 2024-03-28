import React from "react";
import dexShellClosed from "../../public/images/dex/dex-closed.png";
import dexShellOpened from "../../public/images/dex/dex-opened.png";

export default function Shell() {
  return (
    <div className="shell">
      <div className="shell-container">
        <img
          src={dexShellOpened}
          alt=""
          className="shell-img shell-img-closed"
        />
      </div>
    </div>
  );
}
