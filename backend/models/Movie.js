// backend/models/Movie.js
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('test', 'root', '109Mojonera', {
  host: 'localhost',
  dialect: 'mysql',
});

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cover: {
    type: DataTypes.BLOB('long'), 
    allowNull: true,
  },
}, {
  tableName: 'movies',
  timestamps: false,
});

export { sequelize, Movie };