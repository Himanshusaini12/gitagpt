import React, { useState, useEffect } from "react";
import song from "./song.mp3";
import song1 from "./song1.mp3";
import song2 from "./song2.mp3";
import "./gita.css";

function GitaQuery() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [visitorIP, setVisitorIP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [queryCount, setQueryCount] = useState("");
  const [audio, setAudio] = useState(null); // State for audio

  useEffect(() => {
    // Retrieve visitor's IP address
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => setVisitorIP(data.ip))
      .catch((error) => console.log(error));

    // Get query count from local storage or cookie
    const savedQueryCount = localStorage.getItem("queryCount");
    if (savedQueryCount) {
      setQueryCount(parseInt(savedQueryCount));
    }
  }, []);

  useEffect(() => {
    // Save query count to local storage or cookie whenever it changes
    localStorage.setItem("queryCount", queryCount);
  }, [queryCount]);

  const playRandomSong = () => {
    const songs = [song, song1, song2];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const newAudio = new Audio(randomSong);
    newAudio.volume = 0.1; // Set the desired volume level (0.5 is 50% volume)
    setAudio(newAudio); // Update the audio state with the new audio
    newAudio.play(); // Play the new song
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse("");
    setIsLoading(true);

    if (audio) {
      audio.pause(); // Pause the previous song
      audio.currentTime = 0; // Reset the audio to the beginning
    }

    playRandomSong();

    const url = `https://butterystormypcboard.himasaini6.repl.co/gita?q=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);
    const data = await response.json();
    setResponse(data.response.replace(/GitaGpt\.org/g, "Gita AI"));
    console.log(data.response);

    const ipurl = "https://butterystormypcboard.himasaini6.repl.co/ip";
    const ipdata = { ip: visitorIP };

    fetch(ipurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ipdata),
    });

    // Update query count
    setQueryCount((prevCount) => prevCount + 1);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>રાધે રાધે 💙</h1>
      <div className="query-count">{`${queryCount.toLocaleString()} Updesh generated so far`}</div>
      <form className="con" onSubmit={handleSubmit}>
        <label className="label">
          Ask Krishna 🦚:
          <input
            className="count-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>
      {isLoading ? (
        <div className="type">
          <div class="typewriter">
            <div class="slide">
              <i></i>
            </div>
            <div class="paper"></div>
            <div class="keyboard"></div>
          </div>
        </div>
      ) : (
        <div>
          {response && (
            <div>
              <h2>Solution:</h2>
              <p className="count-input">{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GitaQuery;
