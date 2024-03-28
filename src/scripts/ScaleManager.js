export function scaleShell() {
  const scale = () => {
    // Get dex image's width and height as reference for all child scalings
    const dexImgWidth = window.getComputedStyle(
      document.querySelector(".shell-img")
    ).width;
    const dexImgHeight = window.getComputedStyle(
      document.querySelector(".shell-img")
    ).height;

    // Prep shell components parent (div where all children are localized)
    const shellComponentsParent = document.querySelector(".shell-components");

    shellComponentsParent.style.height = dexImgHeight;
    shellComponentsParent.style.width = dexImgWidth;

    // Scale power button
    const powerButton = document.querySelector(".shell-power-btn");

    powerButton.style.top = parseFloat(dexImgWidth) * 0.015 + "px";
    powerButton.style.left = parseFloat(dexImgWidth) * 0.015 + "px";
    powerButton.style.height = parseFloat(dexImgWidth) * 0.072 + "px";
    powerButton.style.width = parseFloat(dexImgWidth) * 0.072 + "px";

    // Scale d-pad parent
    const dpadParent = document.querySelector(".shell-dpad-parent");

    dpadParent.style.height = parseFloat(dexImgWidth) * 0.1375 + "px";
    dpadParent.style.width = parseFloat(dexImgWidth) * 0.1325 + "px";
    dpadParent.style.top = parseFloat(dexImgWidth) * 0.5035 + "px";
    dpadParent.style.left = parseFloat(dexImgWidth) * 0.2805 + "px";

    // Scale manual search button
    const searchBtn = document.querySelector(".shell-search-btn");

    searchBtn.style.height = parseFloat(dexImgWidth) * 0.05 + "px";
    searchBtn.style.width = parseFloat(dexImgWidth) * 0.05 + "px";
    searchBtn.style.top = parseFloat(dexImgWidth) * 0.51 + "px";
    searchBtn.style.left = parseFloat(dexImgWidth) * 0.032 + "px";

    // Scale left and right scroll button parents
    const scrollButtonsParent = document.querySelector(".shell-scroll-parents");
    const leftScrollParent = document.querySelector(
      ".shell-left-scroll-parent"
    );
    const rightScrollParent = document.querySelector(
      ".shell-right-scroll-parent"
    );

    scrollButtonsParent.style.height = parseFloat(dexImgWidth) * 0.05 + "px";
    scrollButtonsParent.style.width = parseFloat(dexImgWidth) * 0.135 + "px";
    scrollButtonsParent.style.top = parseFloat(dexImgWidth) * 0.575 + "px";
    scrollButtonsParent.style.left = parseFloat(dexImgWidth) * 0.584 + "px";
  };

  // Call and listener statements
  scale();

  window.addEventListener("resize", scale);

  return () => {
    window.removeEventListener("resize", scale);
  };
}
