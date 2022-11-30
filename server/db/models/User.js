const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  birthday: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  SpotifyUID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  Bio: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});
module.exports = User;
