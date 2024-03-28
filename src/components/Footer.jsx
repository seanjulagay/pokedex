import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-text">
          <span className="footer-creds outside-text">
            Sean Julag-ay (c) 2024
          </span>
          <span className="footer-links outside-text">
            <a href="" className="footer-link">
              Portfolio
            </a>
            {" | "}
            <a href="" className="footer-link">
              Github
            </a>
            {" | "}
            <a href="" className="footer-link">
              LinkedIn
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
