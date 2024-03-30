export function scaleShell() {
  const scaleElements = () => {
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

    scrollButtonsParent.style.height = parseFloat(dexImgWidth) * 0.05 + "px";
    scrollButtonsParent.style.width = parseFloat(dexImgWidth) * 0.16 + "px";
    scrollButtonsParent.style.top = parseFloat(dexImgWidth) * 0.575 + "px";
    scrollButtonsParent.style.left = parseFloat(dexImgWidth) * 0.584 + "px";

    // Scale left (directory) screen
    const directoryScreen = document.querySelector(".shell-left-screen");

    directoryScreen.style.height = parseFloat(dexImgHeight) * 0.295 + "px";
    directoryScreen.style.width = parseFloat(dexImgWidth) * 0.3425 + "px";
    directoryScreen.style.top = parseFloat(dexImgHeight) * 0.2857 + "px";
    directoryScreen.style.left = parseFloat(dexImgWidth) * 0.059 + "px";

    // Scale right (details) screen
    const detailsScreen = document.querySelector(".shell-right-screen");

    detailsScreen.style.height = parseFloat(dexImgHeight) * 0.56 + "px";
    detailsScreen.style.width = parseFloat(dexImgWidth) * 0.3675 + "px";
    detailsScreen.style.top = parseFloat(dexImgHeight) * 0.25 + "px";
    detailsScreen.style.left = parseFloat(dexImgWidth) * 0.585 + "px";
  };

  const scaleText = () => {
    const dexImgWidth = window.getComputedStyle(
      document.querySelector(".shell-img")
    ).width;

    const directoryHeader = document.querySelector(".directory-header");
    const directoryContentBlock = document.querySelectorAll(
      ".directory-content-block"
    );
    const detailsHeader = document.querySelectorAll(".details-header");
    const detailsSubheader2 = document.querySelectorAll(".details-subheader2");
    const detailsContent = document.querySelectorAll(".details-content");

    directoryHeader.style.fontSize = parseFloat(dexImgWidth) * 0.02 + "px";
    directoryContentBlock.forEach((element) => {
      element.style.fontSize = parseFloat(dexImgWidth) * 0.016 + "px";
    });

    detailsHeader.forEach((element) => {
      element.style.fontSize = parseFloat(dexImgWidth) * 0.02 + "px";
    });
    detailsSubheader2.forEach((element) => {
      element.style.fontSize = parseFloat(dexImgWidth) * 0.018 + "px";
    });
    detailsContent.forEach((element) => {
      element.style.fontSize = parseFloat(dexImgWidth) * 0.016 + "px";
    });
  };

  // Call and listener statements
  scaleElements();
  // scaleText();

  window.addEventListener("resize", scaleElements);

  return () => {
    window.removeEventListener("resize", scaleElements);
  };
}
