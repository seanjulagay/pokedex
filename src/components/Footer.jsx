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
            <a
              href="https://seanjulagay.github.io/portfolio/"
              className="footer-link"
              target="_blank"
            >
              Portfolio
            </a>
            {" | "}
            <a
              href="https://github.com/seanjulagay"
              className="footer-link"
              target="_blank"
            >
              Github
            </a>
            {" | "}
            <a
              href="https://www.linkedin.com/in/seanjulagay"
              className="footer-link"
              target="_blank"
            >
              LinkedIn
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
