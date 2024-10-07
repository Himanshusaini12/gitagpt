import React, { useState, useEffect } from "react";
import song from "./song.mp3";
import song1 from "./song1.mp3";
import song2 from "./song2.mp3";
import "./gita.css";

function GitaQuery() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [visitorIP, setVisitorIP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [queryCount, setQueryCount] = useState("");
  const [audio, setAudio] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => setVisitorIP(data.ip))
      .catch((error) => console.log(error));

    const savedQueryCount = localStorage.getItem("queryCount");
    if (savedQueryCount) {
      setQueryCount(parseInt(savedQueryCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("queryCount", queryCount);
  }, [queryCount]);

  useEffect(() => {
    if (isWriting && response) {
      const words = response.split(' ');
      let currentIndex = 0;

      const writeWord = () => {
        if (currentIndex < words.length) {
          setDisplayedResponse(prev => prev + (prev ? ' ' : '') + words[currentIndex]);
          currentIndex++;
          setTimeout(writeWord, Math.random() * 200 + 100); // Random delay between words
        } else {
          setIsWriting(false);
        }
      };

      writeWord();
    }
  }, [isWriting, response]);

  const playRandomSong = () => {
    const songs = [song, song1, song2];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const newAudio = new Audio(randomSong);
    newAudio.volume = 0.1;
    setAudio(newAudio);
    newAudio.play();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse("");
    setDisplayedResponse("");
    setIsLoading(true);

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    playRandomSong();

    try {
      const url = `http://207.148.124.39:4000/ask-gita?query=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      const formattedResponse = data.response.replace(/GitaGpt\.org/g, "Gita AI");
      setResponse(formattedResponse);
      setIsWriting(true);
      setQueryCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error fetching response:', error);
    }

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
          <div className="typewriter">
            <div className="slide">
              <i></i>
            </div>
            <div className="paper"></div>
            <div className="keyboard"></div>
          </div>
        </div>
      ) : (
        <div>
          {displayedResponse && (
            <div>
              <h2>Solution:</h2>
              <p className="quill-text">{displayedResponse}</p>
              {isWriting && <span className="quill">🪶</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GitaQuery;