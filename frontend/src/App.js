import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleShortenUrl = async () => {
    if (url) {
      try {
        const response = await axios.post(
          "https://smolurl.com/api/links",
          {
            url: url, // This is the URL you want to shorten
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setShortenedUrl(response.data.data.short_url);
      } catch (error) {
        console.error("Error shortening URL:", error);
      }
    }
  };

  const handleCopyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      alert("Shortened URL copied to clipboard!");
    }
  };

  return (
    <>
      <div className="mainBody">
        <div className="cboard" style={{ width: "600px" }}>
          <div className="card-body">
            <h2 className="ctitle">URL Shortener</h2>

            <div className="input-group" style={{ width: "18rm" }}>
              <input
                type="text"
                id="url-input"
                placeholder="Enter URL"
                value={url}
                onChange={handleInputChange}
              />
              <button onClick={handleShortenUrl} id="shorten-btn">Shorten URL</button>
            </div>

            <div className="output-group" style={{ width: "18rm" }}>
              {shortenedUrl && (
                <>
                    <a
                      className="shortened-url"
                      href={shortenedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortenedUrl}
                    </a>
                  {/* <button onClick={handleCopyToClipboard}>
                    Copy to Clipboard
                  </button> */}
                </>
              )}

            </div>
          </div>
          
          <div className="txt">
          <p> Made By <a href="https://github.com/varun-al" className="txt-l">Varun A L</a> </p>
          <p>Used <a href="https://smolurl.com/" className="txt-l">SmolUrl</a> API by German Gamboa</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
