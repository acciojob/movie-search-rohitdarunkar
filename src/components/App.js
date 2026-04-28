import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!query.trim()) {
      setError("Invalid movie name. Please try again.");
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=99eb9fd1&s=${query}`
      );

      const data = await response.json();

      if (data.Response === "False") {
        setError("Invalid movie name. Please try again.");
        setMovies([]);
      } else {
        setMovies(data.Search);
        setError("");
      }
    } catch (err) {
      setError("Invalid movie name. Please try again.");
      setMovies([]);
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}

      <h1>Movie Search</h1>

      <input
        type="text"
        placeholder="Enter movie name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>

      {error && <p className="error">{error}</p>}

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : ""}
              alt={movie.Title}
              width="150"
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;