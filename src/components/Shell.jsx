import React, { useEffect } from "react";
import { scaleShell } from "../scripts/ScaleManager";
import dexShellClosed from "../../public/images/dex/dex-closed.png";
import dexShellOpened from "../../public/images/dex/dex-opened.png";
import dexPowerButton from "../../public/images/dex/dex-power-button.png";
import dexDpadParent from "../../public/images/dex/dex-dpad.png";
import dexDpadUp from "../../public/images/dex/dex-dpad-up.png";
import dexDpadLeft from "../../public/images/dex/dex-dpad-left.png";
import dexDpadRight from "../../public/images/dex/dex-dpad-right.png";
import dexDpadDown from "../../public/images/dex/dex-dpad-down.png";
import dexSearchBtn from "../../public/images/dex/dex-search-btn.png";
import dexLeftScroll from "../../public/images/dex/dex-left-scroll.png";
import dexRightScroll from "../../public/images/dex/dex-right-scroll.png";
import dexScrollDown from "../../public/images/dex/dex-scroll-down.png";
import dexScrollUp from "../../public/images/dex/dex-scroll-up.png";

export default function Shell() {
  useEffect(() => {
    setTimeout(() => {
      scaleShell();
    }, 100);
  }, []);

  return (
    <div className="shell">
      <div className="shell-container">
        <img
          src={dexShellOpened}
          alt=""
          className="shell-img shell-img-closed"
        />
        <div className="shell-components">
          <div
            style={{ backgroundImage: `url(${dexPowerButton})` }}
            className="shell-power-btn shell-interactable"
          ></div>
          <div
            style={{ backgroundImage: `url(${dexDpadParent})` }}
            className="shell-dpad-parent shell-interactable"
          >
            <div className="shell-dpad-top-row">
              <div
                style={{ backgroundImage: `url(${dexDpadUp})` }}
                className="shell-dpad-up  dpad-btn"
              ></div>
            </div>
            <div className="shell-dpad-middle-row">
              <div
                style={{ backgroundImage: `url(${dexDpadLeft})` }}
                className="shell-dpad-left dpad-btn"
              ></div>
              <div
                style={{ backgroundImage: `url(${dexDpadRight})` }}
                className="shell-dpad-right dpad-btn"
              ></div>
            </div>
            <div className="shell-dpad-bottom-row">
              <div
                style={{ backgroundImage: `url(${dexDpadDown})` }}
                className="shell-dpad-down dpad-btn"
              ></div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${dexSearchBtn})` }}
            className="shell-search-btn shell-interactable"
          ></div>
          <div className="shell-scroll-parents shell-interactable">
            <div
              style={{ backgroundImage: `url(${dexLeftScroll})` }}
              className="shell-scroll-parent"
            >
              <div
                style={{ backgroundImage: `url(${dexScrollUp})` }}
                className="shell-scroll-arrow shell-scroll-up"
              ></div>
            </div>
            <div
              style={{ backgroundImage: `url(${dexRightScroll})` }}
              className="shell-scroll-parent"
            >
              <div
                style={{ backgroundImage: `url(${dexScrollDown})` }}
                className="shell-scroll-arrow shell-scroll-down"
              ></div>
            </div>
          </div>
          <div className="shell-screen shell-left-screen shell-interactable"></div>
          <div className="shell-screen shell-right-screen shell-interactable"></div>
        </div>
      </div>
    </div>
  );
}
