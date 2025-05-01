import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const [movie, setMovie] = useState({
    title: "",
    desc: "",
    rating: 1,
  });
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/movies/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieData();
  }, [movieId]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "rating") {
      value = Math.max(1, Math.min(10, parseInt(value, 10) || 1));
    }
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", movie.title);
      formData.append("desc", movie.desc);
      formData.append("rating", movie.rating);
      if (file) formData.append("cover", file); // Only if user uploads

      await axios.put(`http://localhost:3001/movies/${movieId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='form' autoComplete="off">
      <h1>Update the Movie</h1>
      <input type="text" placeholder='Title' name="title" value={movie.title} onChange={handleChange} autoComplete="off" />
      <input type="text" placeholder='Description' name="desc" value={movie.desc} onChange={handleChange} autoComplete="off" />
      <input type="number" placeholder='Rating' name="rating" value={movie.rating} onChange={handleChange} min="1" max="10" step="1" />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
