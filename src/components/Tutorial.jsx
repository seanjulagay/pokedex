import React, { useContext, useState, useEffect } from "react";
import { TutorialModalContext } from "./App";
import { createClient } from "contentful";

export default function Tutorial() {
  const [tutorialOpened, setTutorialOpened] = useContext(TutorialModalContext);
  const [tutorialText, setTutorialText] = useState(
    "The quick brown fox jumped over the lazy dog."
  );
  const [tutorialImage, setTutorialImage] = useState(null);
  const [tutorialPage, setTutorialPage] = useState(0);
  const [contentfulEntries, setContentfulEntries] = useState(null);
  const [contentfulHeaders, setContentfulHeaders] = useState(null);
  const [contentfulDescs, setContentfulDescs] = useState(null);
  const [contentfulImages, setContentfulImages] = useState(null);
  const [openedBefore, setOpenedBefore] = useState(false);

  // for vite projects, use import.meta.env.VITE_KEY
  const client = createClient({
    space: import.meta.env.VITE_API_SPACE,
    accessToken: import.meta.env.VITE_API_KEY,
  });

  useEffect(() => {
    const visitedBeforeLocal = localStorage.getItem("visitedBefore");

    if (visitedBeforeLocal === null) {
      setTutorialOpened(true);
      localStorage.setItem("visitedBefore", JSON.stringify(true));
    } else {
      setTutorialOpened(false);
    }

    // fetch data from contentful
    try {
      const displayEntries = async () => {
        await client
          .getEntries({
            content_type: "pokedexTutorial",
            order: "fields.tutorialOrder",
          })
          .then((entries) => {
            setContentfulEntries(entries.items);
          });
      };
      displayEntries();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (contentfulEntries) {
      const tempHeaders = [];
      const tempDescs = [];
      const tempImages = [];
      for (let i = 0; i < contentfulEntries.length; i++) {
        tempHeaders.push(contentfulEntries[i].fields.tutorialHeader);
        tempDescs.push(contentfulEntries[i].fields.tutorialContent);
        const image =
          contentfulEntries[i].fields.tutorialHelpImg.fields.file.url;
        const imageElement = new Image();
        imageElement.src = image;
        tempImages.push(image);
      }
      setContentfulHeaders(tempHeaders);
      setContentfulDescs(tempDescs);
      setContentfulImages(tempImages);
    }
  }, [contentfulEntries]);

  const tutorialPageHandler = (direction) => {
    if (direction == "left") {
      if (tutorialPage > 0) {
        setTutorialPage(tutorialPage - 1);
      }
    } else if (direction == "right") {
      if (tutorialPage < contentfulEntries.length - 1) {
        setTutorialPage(tutorialPage + 1);
      }
    }
  };

  return (
    <div className={`tutorial ${tutorialOpened ? "" : "hidden"}`}>
      <div className="tutorial-container">
        <div className="tutorial-modal">
          <div className="tutorial-modal-container">
            <div className="tutorial-modal-top-container">
              <span className="tutorial-modal-page-number">
                {contentfulEntries
                  ? `${tutorialPage + 1}/${contentfulEntries.length}`
                  : ""}
              </span>
              <button
                onClick={() => setTutorialOpened(false)}
                className="tutorial-modal-close-button"
              >
                x
              </button>
            </div>
            <div className="tutorial-modal-body">
              <div className="tutorial-modal-arrow-container">
                <button
                  onClick={() => tutorialPageHandler("left")}
                  className="tutorial-modal-arrow-button tutorial-modal-left-arrow"
                >
                  {"<"}
                </button>
              </div>
              <div className="tutorial-modal-content-container">
                <div
                  style={
                    contentfulImages
                      ? {
                          backgroundImage: `url(${contentfulImages[tutorialPage]})`,
                        }
                      : {}
                  }
                  className="tutorial-modal-image"
                ></div>
                <div className="tutorial-modal-text-container">
                  <h1 className="tutorial-modal-text-header">
                    {contentfulHeaders ? contentfulHeaders[tutorialPage] : ""}
                  </h1>
                  <span className="tutorial-modal-text-body">
                    {contentfulDescs ? contentfulDescs[tutorialPage] : ""}
                  </span>
                </div>
              </div>
              <div className="tutorial-modal-arrow-container">
                <button
                  onClick={() => tutorialPageHandler("right")}
                  className="tutorial-modal-arrow-button tutorial-modal-right-arrow"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
