// frontend/src/pages/Movies.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img1 from './images/testing.png';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:3001/movies");
      setMovies(res.data);
      setFilteredMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/movies/" + id);
      fetchMovies();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = () => {
    let filtered;
    if (filterOption === "title") {
      filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterOption === "rating") {
      filtered = movies.filter(movie =>
        movie.rating === parseInt(filterValue)
      );
    } else {
      filtered = movies;
    }
    setFilteredMovies(filtered);
  };

  const handleReset = () => {
    setFilterOption("");
    setFilterValue("");
    setFilteredMovies(movies);
  };

  return (
    <div>
      <h1>My Movie Review Website</h1>
      <div className="movies">
        {filteredMovies.map((movie) => (
          <div className="movie" key={movie.id}>
            <img src={movie.cover || img1} alt="cover" />
            <h2>{movie.title}</h2>
            <p>{movie.desc}</p>
            <span>Rating: {movie.rating}/10</span>
            <div className="movie-buttons">
              <button className='delete' onClick={() => handleDelete(movie.id)}>Delete</button>
              <button className='update'><Link to={`/update/${movie.id}`}>Update</Link></button>
            </div>
          </div>
        ))}
      </div>

      <div className="newMovie-container">
        <button className="newMovie">
          <Link to="/add">Add new movie</Link>
        </button>
      </div>

      <div className="filter-container">
        <h3>Filter Movies</h3>
        <div className="filter-form">
          <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
            <option value="">Select Filter</option>
            <option value="title">By Title</option>
            <option value="rating">By Rating</option>
          </select>

          <input
            type={filterOption === "rating" ? "number" : "text"}
            placeholder={`Enter ${filterOption || "value"}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            min="1"
            max="10"
          />

          <button className="formButton" onClick={handleFilter}>Apply Filter</button>
          <button className="formButton" style={{ backgroundColor: "#ccc" }} onClick={handleReset}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Movies;