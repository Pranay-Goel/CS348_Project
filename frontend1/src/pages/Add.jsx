// frontend/src/pages/Add.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [movie, setMovie] = useState({
    title: "",
    desc: "",
    rating: 1,
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
      if (file) formData.append("cover", file);

      await axios.post("http://localhost:3001/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='form' autoComplete="off">
      <h1>Add new movie</h1>
      <input type="text" placeholder='Title' name="title" onChange={handleChange} autoComplete="off" />
      <input type="text" placeholder='Remarks' name="desc" onChange={handleChange} autoComplete="off" />
      <input type="number" placeholder='Rating' name="rating" onChange={handleChange} min="1" max="10" step="1" />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
