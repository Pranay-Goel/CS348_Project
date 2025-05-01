// backend/index.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import upload from "./middleware/upload.js";
import { sequelize, Movie } from "./models/Movie.js";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL2 connection for prepared statements
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "109Mojonera",
  database: "test"
});

// ORM connection test
sequelize.authenticate()
  .then(() => console.log("✅ Sequelize connected"))
  .catch(err => console.error("❌ Sequelize connection error:", err));

// GET all movies with base64 cover
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.findAll();
    const withImages = movies.map(movie => ({
      ...movie.toJSON(),
      cover: movie.cover ? `data:image/png;base64,${movie.cover.toString('base64')}` : null
    }));
    res.json(withImages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single movie by ID
app.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const q = "SELECT * FROM movies WHERE id = ?";
  db.query(q, [movieId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

// DELETE movie by ID
app.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const q = "DELETE FROM movies WHERE id = ?";
  db.query(q, [movieId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Movie has been deleted");
  });
});

// POST movie with image upload (ORM)
app.post("/movies", upload.single("cover"), async (req, res) => {
  try {
    const { title, desc, rating } = req.body;
    const cover = req.file?.buffer || null;
    const movie = await Movie.create({ title, desc, rating, cover });
    res.json({ message: "Movie created", movie });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT movie with image upload (ORM)
app.put("/movies/:id", upload.single("cover"), async (req, res) => {
    try {
      const { title, desc, rating } = req.body;
  
      // Only update 'cover' if a new file is uploaded
      const updateFields = { title, desc, rating };
      if (req.file) {
        updateFields.cover = req.file.buffer;
      }
  
      const updated = await Movie.update(updateFields, {
        where: { id: req.params.id },
      });
  
      res.json({ message: "Movie updated", updated });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

app.listen(3001, () => {
  console.log("✅ Backend running on port 3001");
});
