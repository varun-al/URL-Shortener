import React, { useState } from "react";
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
      // Example of a mock API call. Replace with your real API endpoint.
      const response = await fetch("https://api.example.com/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: url }),
      });

      const data = await response.json();
      setShortenedUrl(data.shortUrl); // Assuming the API returns a "shortUrl" field.
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
        <h1>URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleInputChange}
        />
        <button onClick={handleShortenUrl}>Shorten URL</button>

        {shortenedUrl && (
          <>
            <p>Shortened URL: {shortenedUrl}</p>
            <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
