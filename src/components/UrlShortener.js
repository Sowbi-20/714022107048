import React, { useState } from "react";
import { Log } from "../logging/logging-middleware"; // import middleware

function UrlShortener() {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url) {
      Log("UrlShortener", "error", "validation", "Empty URL submitted");
      alert("Please enter a valid URL");
      return;
    }
    Log("UrlShortener", "info", "shortener", `Submitted URL: ${url}`);
    // TODO: URL shortening logic
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Shorten</button>
    </div>
  );
}

export default UrlShortener;
