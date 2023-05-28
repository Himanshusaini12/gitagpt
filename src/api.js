import React, { useState, useEffect } from "react";
import song from "./song.mp3";
import "./gita.css";

function GitaQuery() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [visitorIP, setVisitorIP] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const audio = new Audio(song);

  useEffect(() => {
    // Retrieve visitor's IP address
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => setVisitorIP(data.ip))
      .catch((error) => console.log(error));
    
    
    
    setTimeout(() => {
      const ipurl = "https://butterystormypcboard.himasaini6.repl.co/ip";
      const ipdata = { ip: visitorIP };
      fetch(ipurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ipdata),
      });
    }, 10000);
    
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse("");
    setIsLoading(true); // Set loading state to true

    audio.play();
    const url = `https://butterystormypcboard.himasaini6.repl.co/gita?q=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);
    const data = await response.json();
    setResponse(data.response.replace(/GitaGpt\.org/g, "Gita AI"));
    console.log(data.response);

    // Send the user's IP address to the backend
    const ipurl = "https://butterystormypcboard.himasaini6.repl.co/ip";
    const ipdata = { ip: visitorIP };

    fetch(ipurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ipdata),
    });
    // Handle the response if needed
    // ...

    setIsLoading(false); // Set loading state to false after receiving the response
  };

  return (
    <div>
      <h1>રાધે રાધે 💙</h1>
      <form className="con" onSubmit={handleSubmit}>
        <label className="label">
          Ask Krishna 🦚:
          <input
            className="count-input "
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>
      {response && (
        <div>
          <h2>Solution:</h2>
          <p className="count-input ">{response}</p>
        </div>
      )}
    </div>
  );
}

export default GitaQuery;
