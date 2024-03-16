import React, { useState, useEffect } from "react";
import axios from "axios";
import './movie.css';
const Movie = ({ onCreateMovie }) => {
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieLanguage, setNewMovieLanguage] = useState("");
  const [newMovieGenre, setNewMovieGenre] = useState("");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures that useEffect runs only once on component mount


  const handleCreateMovie = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/movies", {
        title: newMovieTitle,
        language: newMovieLanguage,
        genre: newMovieGenre,
      });
      onCreateMovie(response.data); // assuming the response contains the created movie object
      setNewMovieTitle("");
      setNewMovieLanguage("");
      setNewMovieGenre("");
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="movie-container">
    <h2>Movies</h2>
    <ul className="movie-list">
      {movies.length > 0 && Array.isArray(movies) ? (
        movies.map(movie => (
          <li key={movie.id} className="movie-item">
            {movie.title} - {movie.language} - {movie.genre}
          </li>
        ))
      ) : (
        <li className="movie-item">No movies available</li>
      )}
    </ul>
    <div className="movie-form">
      <h3>Add New Movie</h3>
      <input
        type="text"
        placeholder="Title"
        value={newMovieTitle}
        onChange={(e) => setNewMovieTitle(e.target.value)}
        className="movie-input"
      />
      <input
        type="text"
        placeholder="Language"
        value={newMovieLanguage}
        onChange={(e) => setNewMovieLanguage(e.target.value)}
        className="movie-input"
      />
      <input
        type="text"
        placeholder="Genre"
        value={newMovieGenre}
        onChange={(e) => setNewMovieGenre(e.target.value)}
        className="movie-input"
      />
      <button onClick={handleCreateMovie} className="movie-button">Add Movie</button>
    </div>
  </div>
  
  );
};

export default Movie;
